import _ from 'lodash';
import { z } from 'zod';

import OpenAI from 'openai';
import getLogger from '~/core/logger';
import configuration from '~/configuration';

import { blogNodes, freeBlogNodes } from '~/lib/ai/nodes/blog-nodes';
import { contactNodes, freeContactNodes } from '~/lib/ai/nodes/contact-nodes';
import { ctaNodes, freeCtaNodes } from '~/lib/ai/nodes/cta-nodes';
import { faqNodes, freeFaqNodes } from '~/lib/ai/nodes/faq-nodes';
import { featureNodes, freeFeatureNodes } from '~/lib/ai/nodes/feature-nodes';
import { footerNodes, freeFooterNodes } from '~/lib/ai/nodes/footer-nodes';
import { galleryNodes, freeGalleryNodes } from '~/lib/ai/nodes/gallery-nodes';
import { headingNodes, freeHeadingNodes } from '~/lib/ai/nodes/heading-nodes';
import { heroNodes, freeHeroNodes } from '~/lib/ai/nodes/hero-nodes';
import { logosNodes, freeLogosNodes } from '~/lib/ai/nodes/logos-nodes';
import { navbarNodes, freeNavbarNodes } from '~/lib/ai/nodes/navbar-nodes';
import { pricingNodes, freePricingNodes } from '~/lib/ai/nodes/pricing-nodes';
import { teamNodes, freeTeamNodes } from '~/lib/ai/nodes/team-nodes';
import {
  testimonialNodes,
  freeTestimonialNodes,
} from '~/lib/ai/nodes/testimonial-nodes';

function getOpenAIClient() {
  const logger = getLogger();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (!openai) {
    logger.error(
      `Failed to initialize OpenAI client. Make sure that OPENAI_API_KEY is set.`,
    );

    throw new Error('Failed to initialize OpenAI client');
  }

  return openai;
}

export class SitesLlmService {
  private readonly client = getOpenAIClient();
  private readonly logger = getLogger();
  private readonly debug = !configuration.production;

  private getModelName() {
    const llm = process.env.LLM_MODEL_NAME;

    return llm || 'gpt-3.5-turbo-1106';
  }

  private getBaseParams() {
    return {
      model: this.getModelName(),
      response_format: {
        type: 'json_object' as const,
      },
      temperature: 0.8,
    };
  }

  private getTokenCountFromResponse(response: OpenAI.ChatCompletion) {
    return response.usage?.total_tokens ?? 0;
  }

  // GENERATE SITE STRUCTURE
  async generateSiteStructure(params: { description: string }) {
    this.logger.info(params, `Generating site structure...`);

    const componentList = [
      {
        type: 'Blog',
        description: 'Displays a list of blog posts',
      },
      {
        type: 'Contact',
        description: 'A contact component',
      },
      {
        type: 'CTA',
        description: 'A call to action component',
      },
      {
        type: 'FAQ',
        description: 'A frequently asked questions component',
      },
      {
        type: 'Feature',
        description:
          'A feature component that displays a list of features or benefits',
      },
      {
        type: 'Footer',
        description:
          'A footer component that should be at the bottom of the page. Always use this for standard websites.',
      },
      {
        type: 'Gallery',
        description: 'A gallery component that displays a list of images',
      },
      {
        type: 'Heading',
        description:
          'A lesser and smaller version of the Hero component. The Hero component should take precedence over this component as the first component on the page.',
      },
      {
        type: 'Hero',
        description: 'Should not come before the Navbar component.',
      },
      {
        type: 'Logo',
        description: 'Displays a list of logos',
      },
      {
        type: 'Navbar',
        description:
          'A navbar component that should come first on the page. Always use this for standard websites.',
      },
      {
        type: 'Pricing',
        description: 'A pricing component',
      },
      {
        type: 'Team',
        description: 'A team component',
      },
      {
        type: 'Testimonial',
        description: 'A testimonial component',
      },
    ];

    const stringifyComponents = JSON.stringify(componentList);

    const response = await this.client.chat.completions.create({
      ...this.getBaseParams(),
      messages: [
        {
          role: 'user',
          content: `As a website page builder, you are tasked with creating a site structure for a site described as "${params.description}". Return a JSON object using the schema such as: "{"structure": [{ "component": string, "content": string }]}". The "component" is a string from the list of components: "${stringifyComponents}". Please include only components that are listed in the component list. Please don't change the URLs. The "content" is a string of text that describes the copy of the component. Create at least 5 components in the structure JSON object.`,
        },
      ],
    });

    if (this.debug) {
      this.logger.info(
        `Response from generateSiteStructure`,
        JSON.stringify(response, null, 2),
      );
    }

    const data = response.choices[0].message.content ?? '';
    const tokens = this.getTokenCountFromResponse(response);

    const json = z
      .object({
        structure: z.array(
          z.object({
            component: z
              .string()
              .min(1)
              .refine((value) => {
                const formatted: string = _(value).trim().toLowerCase();

                const isIncluded: boolean =
                  componentList.filter((item) => {
                    const formattedItem: string = _(item.type)
                      .trim()
                      .toLowerCase();
                    return formattedItem === formatted;
                  }).length > 0;

                if (!isIncluded) {
                  this.logger.warn(
                    `Component "${formatted}" is not included in the list of components`,
                  );
                }

                return isIncluded;
              }),
            content: z.string().min(1).max(250),
          }),
        ),
      })
      .safeParse(JSON.parse(data));

    if (!json.success) {
      throw new Error(
        `Failed to parse response: ${JSON.stringify(json.error)}`,
      );
    }

    this.logger.info('Site structure generated successfully');

    if (this.debug) {
      this.logger.info('Site Structure', JSON.stringify(json.data, null, 2));
    }

    const content = json.data.structure.map(
      (item: { component: string; content: string }) => {
        const formattedComponent: string = _(item.component)
          .trim()
          .toLowerCase();

        const isIncluded: boolean =
          componentList.filter((item) => {
            const formattedItem: string = _(item.type).trim().toLowerCase();
            return formattedItem === formattedComponent;
          }).length > 0;

        if (!isIncluded) {
          this.logger.warn(
            `Component "${formattedComponent}" was removed due to not being included in the list of components`,
          );
          return null;
        }

        // Uppercase when 'cta' or 'faq'
        if (formattedComponent === 'cta' || formattedComponent === 'faq') {
          return {
            ...item,
            component: _.upperCase(formattedComponent),
          };
        }

        return {
          ...item,
          component: _.capitalize(formattedComponent),
        };
      },
    );

    // Remove nulls
    const cleanedContent: Array<{
      component: string;
      content: string;
    }> = content.filter((item) => item !== null) as {
      component: string;
      content: string;
    }[];

    return {
      structure: cleanedContent,
      tokens,
    };
  }

  // GENERATE SITE SCHEMA
  async generateSiteSchema(params: {
    description: string;
    color: string;
    structure: Array<{
      component: string;
      content: string;
    }>;
    activeSubscription: boolean;
  }) {
    try {
      this.logger.info(params, `Generating site schema in LLM...`);

      type Node = {
        type: {
          resolvedName: string;
        };
        isCanvas: boolean;
        props: any;
        displayName: string;
        custom: {};
        parent: string;
        hidden: boolean;
        nodes: any[];
        linkedNodes: {};
      };

      const selectNode = (nodes: Array<Node>) => {
        const randomIndex = Math.floor(Math.random() * nodes.length);
        return nodes[randomIndex];
      };

      const mappedStructure = params.structure.map((item) => {
        const componentName = item.component;

        let selectedNode: Node;

        const hasSub = params.activeSubscription;

        switch (componentName) {
          case 'Blog':
            selectedNode = selectNode(hasSub ? blogNodes : freeBlogNodes);
            break;
          case 'Contact':
            selectedNode = selectNode(hasSub ? contactNodes : freeContactNodes);
            break;
          case 'CTA':
            selectedNode = selectNode(hasSub ? ctaNodes : freeCtaNodes);
            break;
          case 'FAQ':
            selectedNode = selectNode(hasSub ? faqNodes : freeFaqNodes);
            break;
          case 'Feature':
            selectedNode = selectNode(hasSub ? featureNodes : freeFeatureNodes);
            break;
          case 'Footer':
            selectedNode = selectNode(hasSub ? footerNodes : freeFooterNodes);
            break;
          case 'Gallery':
            selectedNode = selectNode(hasSub ? galleryNodes : freeGalleryNodes);
            break;
          case 'Heading':
            selectedNode = selectNode(hasSub ? headingNodes : freeHeadingNodes);
            break;
          case 'Hero':
            selectedNode = selectNode(hasSub ? heroNodes : freeHeroNodes);
            break;
          case 'Logo':
            selectedNode = selectNode(hasSub ? logosNodes : freeLogosNodes);
            break;
          case 'Navbar':
            selectedNode = selectNode(hasSub ? navbarNodes : freeNavbarNodes);
            break;
          case 'Pricing':
            selectedNode = selectNode(hasSub ? pricingNodes : freePricingNodes);
            break;
          case 'Team':
            selectedNode = selectNode(hasSub ? teamNodes : freeTeamNodes);
            break;
          case 'Testimonial':
            selectedNode = selectNode(
              hasSub ? testimonialNodes : freeTestimonialNodes,
            );
            break;
          default:
            selectedNode = selectNode(hasSub ? featureNodes : freeFeatureNodes);
            break;
        }

        const llmNode = {
          type: selectedNode.type.resolvedName,
          copyDescription: item.content,
          props: selectedNode.props,
        };

        return llmNode;
      });

      const llmNodes = JSON.stringify(mappedStructure);

      const response = await this.client.chat.completions.create({
        ...this.getBaseParams(),
        messages: [
          {
            role: 'user',
            content: `As a website page builder, you are tasked with creating a site schema for a site described as "${params.description}". Return a JSON object using the schema such as: "{"schema": [{ "type": string, "props": object }]}". The "type" is a string from the list of nodes. Please don't modify "type" and only modify "props" object. "props" is an object containing the props for the component. Fill the "props" object with copy based on the "copyDescription". Make sure every key inside "props" has copy. Leave nothing as an empty string. Nodes: "${llmNodes}"`,
          },
        ],
      });

      if (this.debug) {
        this.logger.info(
          `Response from generateSiteSchema`,
          JSON.stringify(response, null, 2),
        );
      }

      const data = response.choices[0].message.content ?? '';
      const tokens = this.getTokenCountFromResponse(response);

      const json = z
        .object({
          schema: z.array(
            z.object({
              type: z.string().min(1),
              props: z.record(z.unknown()),
            }),
          ),
        })
        .safeParse(JSON.parse(data));

      if (!json.success) {
        throw new Error(
          `Failed to parse response: ${JSON.stringify(json.error)}`,
        );
      }

      this.logger.info('Site schema generated successfully');

      if (this.debug) {
        this.logger.info('Site Schema', JSON.stringify(json.data, null, 2));
      }

      const findNode = (
        nodeType: string,
        nodes: Array<Node>,
      ): Node | undefined => {
        const foundNode = nodes.find((item) => {
          return _.lowerCase(item.type.resolvedName) === _.lowerCase(nodeType);
        });

        return foundNode;
      };

      const generateRandomString = (length: number) => {
        const result = [];
        const characters =
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength)),
          );
        }
        return result.join('');
      };

      let craftsJsSchema = {
        ROOT: {
          type: 'div',
          isCanvas: true,
          props: {
            height: 'auto',
            id: 'root',
            className: 'w-full h-full',
          },
          displayName: 'div',
          custom: {
            displayName: 'App',
          },
          hidden: false,
          nodes: [],
          linkedNodes: {},
        },
      };

      json.data.schema.map((item) => {
        const nodeType = item.type;
        const nodeTypeWithoutNumbers = nodeType.replace(/[0-9]/g, '');

        let schemaNode: Node | undefined;

        switch (nodeTypeWithoutNumbers) {
          case 'Blog':
            schemaNode = findNode(nodeType, blogNodes);
            break;
          case 'Contact':
            schemaNode = findNode(nodeType, contactNodes);
            break;
          case 'CTA':
            schemaNode = findNode(nodeType, ctaNodes);
            break;
          case 'FAQ':
            schemaNode = findNode(nodeType, faqNodes);
            break;
          case 'Feature':
            schemaNode = findNode(nodeType, featureNodes);
            break;
          case 'Footer':
            schemaNode = findNode(nodeType, footerNodes);
            break;
          case 'Gallery':
            schemaNode = findNode(nodeType, galleryNodes);
            break;
          case 'Heading':
            schemaNode = findNode(nodeType, headingNodes);
            break;
          case 'Hero':
            schemaNode = findNode(nodeType, heroNodes);
            break;
          case 'Logo':
            schemaNode = findNode(nodeType, logosNodes);
            break;
          case 'Navbar':
            schemaNode = findNode(nodeType, navbarNodes);
            break;
          case 'Pricing':
            schemaNode = findNode(nodeType, pricingNodes);
            break;
          case 'Team':
            schemaNode = findNode(nodeType, teamNodes);
            break;
          case 'Testimonial':
            schemaNode = findNode(nodeType, testimonialNodes);
            break;
          default:
            schemaNode = findNode(nodeType, featureNodes);
            break;
        }

        const newProps = {
          ...item.props,
          color: params.color,
        };

        schemaNode = {
          ...(schemaNode as Node),
          props: newProps,
        };

        const newNodeId = generateRandomString(10);

        craftsJsSchema = {
          ...craftsJsSchema,
          [newNodeId]: schemaNode,
        };

        return (craftsJsSchema.ROOT.nodes as string[]).push(newNodeId);
      });

      const craftsJsSchemaString = JSON.stringify(craftsJsSchema);

      this.logger.info('Crafts.js schema generated successfully');

      return {
        pageDescription: params.description,
        siteStructure: params.structure,
        color: params.color,
        siteSchema: craftsJsSchemaString,
        success: true,
        tokens,
      };
    } catch (error) {
      this.logger.error('Failed to generate site schema', error);

      return {
        pageDescription: params.description,
        siteStructure: params.structure,
        color: params.color,
        siteSchema: '',
        success: false,
        tokens: 0,
      };
    }
  }
}
