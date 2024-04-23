import _ from 'lodash';
import { SerializedNode, SerializedNodes, NodeId } from '@craftjs/core';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/*
 * EXPORT SINGLE COMPONENT
 */
type exportSingleComponentProps = {
  name: string;
  content: string;
  isNextjs: boolean;
};

type SerializedNodeWithId = SerializedNode & { id: string };

/*
 * EXPORT SINGLE COMPONENT
 */
export async function exportSingleComponent({
  name,
  content,
  isNextjs,
}: exportSingleComponentProps) {
  const zip = new JSZip();

  zip.file(`${name}.jsx`, content);

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${name}_${isNextjs ? 'nextjs' : 'react'}.zip`);
}

/**
 * Exports multiple components along with helper files, organizing them into
 * folders as specified by their paths in a ZIP archive.
 * @param {Object[]} files Array of file objects to be included in the ZIP. Each object should have `path`, `name`, and `content`.
 * @param {string} packageName The name for the package, which will be used as the ZIP file name.
 * @param {boolean} isNextjs Indicates if the components are for Next.js (true) or React (false).
 */
export async function exportComponentsWithHelperFiles({
  files,
  packageName,
  isNextjs,
}: {
  files: { path: string; name: string; content: string }[];
  packageName: string;
  isNextjs: boolean;
}) {
  const zip = new JSZip();

  // Iterate over each file object to add it to the zip
  files.forEach(({ path, name, content }) => {
    const filePath = path ? `${path}/${name}` : name; // Creates a path for the file if specified
    zip.file(filePath, content); // Adds the file to the zip
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${packageName}_${isNextjs ? 'nextjs' : 'react'}.zip`);
}

/*
 * EXPORT PAGE
 */
export const exportPage = async (
  isNextjs: boolean,
  nodes: SerializedNodes,
  components: any,
) => {
  const deserializedNodes = deserializeNodes(nodes);
  const zip = new JSZip();

  let importStatements: string[] = [];
  let componentContent: string[] = [];

  deserializedNodes.forEach((node) => {
    const nodeName =
      typeof node.type === 'object' ? node.type.resolvedName : '';

    const isRoot = node.id === 'ROOT';

    if (isRoot) {
      return;
    }

    handleNodeByType(
      nodeName,
      isNextjs,
      node,
      components,
      importStatements,
      componentContent,
      zip,
    );
  });

  zip.file(
    isNextjs ? 'page.jsx' : 'index.jsx',
    generateIndexFile(importStatements, componentContent),
  );

  return zip.generateAsync({ type: 'blob' }).then((blob) => {
    const date = new Date();
    const timestamp = date.getTime();
    const fileName = `page_${isNextjs ? 'nextjs' : 'react'}_${timestamp}.zip`;

    saveAs(blob, fileName);
  });
};

/*
 * DESERIALIZE NODES
 */
const deserializeNodes = (
  nodes: SerializedNodes,
  id: NodeId = 'ROOT',
  sorted: SerializedNodeWithId[] = [],
): SerializedNodeWithId[] => {
  const node = nodes[id];
  if (!node) {
    throw new Error(`Could not find node ${id}`);
  }

  sorted.push({ id, ...node });

  _.each(node.nodes, (n) => {
    sorted.push(...deserializeNodes(nodes, n));
  });

  return sorted;
};

/*
 * GENERATE INDEX/PAGE FILE
 */
const generateIndexFile = (
  importStatements: string[],
  componentContent: string[],
) => {
  const content = `
    ${importStatements.join('\n')}
    
    export default function Page() {
        return (
        <main>
            ${componentContent.join('\n')}
        </main>
        );
    }
    `;

  return content;
};

/*
 * HANDLE NODE BY TYPE
 */
export const handleNodeByType = (
  nodeName: string,
  isNextjs: boolean,
  node: any,
  components: any,
  importStatements: string[],
  componentContent: string[],
  zip: JSZip,
) => {
  switch (nodeName) {
    case 'Blog1':
    case 'Blog2':
    case 'Blog3':
    case 'Blog4':
    case 'Blog5':
    case 'Blog6':
    case 'Blog7':
    case 'Blog8':
    case 'Blog9':
    case 'Blog10':
    case 'Contact1':
    case 'Contact2':
    case 'Contact3':
    case 'Contact4':
    case 'Contact5':
    case 'Contact6':
    case 'CTA1':
    case 'CTA2':
    case 'CTA3':
    case 'CTA4':
    case 'CTA5':
    case 'FAQ1':
    case 'FAQ2':
    case 'FAQ3':
    case 'FAQ4':
    case 'FAQ5':
    case 'Feature1':
    case 'Feature2':
    case 'Feature3':
    case 'Feature4':
    case 'Feature5':
    case 'Feature6':
    case 'Feature7':
    case 'Feature8':
    case 'Feature9':
    case 'Feature10':
    case 'Feature11':
    case 'Feature12':
    case 'Feature13':
    case 'Feature14':
    case 'Feature15':
    case 'Feature16':
    case 'Feature17':
    case 'Feature18':
    case 'Footer1':
    case 'Footer2':
    case 'Footer3':
    case 'Footer4':
    case 'Footer5':
    case 'Gallery1':
    case 'Gallery2':
    case 'Gallery3':
    case 'Gallery4':
    case 'Gallery5':
    case 'Gallery6':
    case 'Header1':
    case 'Header2':
    case 'Header3':
    case 'Header4':
    case 'Header5':
    case 'Header6':
    case 'Header7':
    case 'Hero1':
    case 'Hero2':
    case 'Hero3':
    case 'Hero4':
    case 'Hero5':
    case 'Hero6':
    case 'Hero7':
    case 'Hero8':
    case 'Hero9':
    case 'Hero10':
    case 'Hero12':
    case 'Hero13':
    case 'Hero14':
    case 'Logo1':
    case 'Logo1':
    case 'Logo2':
    case 'Logo3':
    case 'Logo4':
    case 'Logo5':
    case 'Logo6':
    case 'Navbar1':
    case 'Navbar2':
    case 'Navbar3':
    case 'Pricing1':
    case 'Team1':
    case 'Team2':
    case 'Team3':
    case 'Team4':
    case 'Team5':
    case 'Team6':
    case 'Testimonial1':
    case 'Testimonial2':
    case 'Testimonial3':
    case 'Testimonial4':
    case 'Testimonial5':
    case 'Testimonial6':
      if (components[nodeName]?.craft?.utils?.prepForPageExport) {
        components[nodeName].craft.utils.prepForPageExport(
          isNextjs,
          node,
          importStatements,
          componentContent,
          zip,
        );
      }
      break;
    default:
      console.log('Default Case');
      break;
  }
};
