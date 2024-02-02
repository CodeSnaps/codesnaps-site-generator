'use client';

import _ from 'lodash';
import Heading from '~/core/ui/Heading';
import Trans from '~/core/ui/Trans';

import { useNode } from '@craftjs/core';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/core/ui/Accordion';

import ToolbarMarginCombobox, {
  MarginClassBadges,
} from '~/app/dashboard/[organization]/sites/[id]/components/editor/toolbar/ToolbarMarginCombobox';
import ToolbarPaddingCombobox, {
  PaddingClassBadges,
} from '~/app/dashboard/[organization]/sites/[id]/components/editor/toolbar/ToolbarPaddingCombobox';
import ToolbarColor from '~/app/dashboard/[organization]/sites/[id]/components/editor/toolbar/ToolbarColor';
import ToolbarTextColor from '~/app/dashboard/[organization]/sites/[id]/components/editor/toolbar/ToolbarTextColor';
import ToolbarMaxWidth from '~/app/dashboard/[organization]/sites/[id]/components/editor/toolbar/ToolbarMaxWidth';

function ToolbarSettingsForm({ children }: { children: React.ReactNode }) {
  const { color, textColor, maxWidth, name } = useNode((node) => ({
    color: node.data.props.color,
    textColor: node.data.props.textColor,
    maxWidth: node.data.props.maxWidth,
    name: node.data.custom.displayName || node.data.displayName,
  }));

  return (
    <div className="my-10 flex flex-col gap-4">
      <Heading type={2}>{name}</Heading>

      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-6"
      >
        <AccordionItem value="color">
          <AccordionTrigger>
            <h3 className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
              <Trans i18nKey="sites:toolbarSettingsColorLabel" />
            </h3>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-4">
              <ToolbarColor currentColor={color} />
              <ToolbarTextColor currentColor={textColor} />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="marginPadding">
          <AccordionTrigger>
            <h3 className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
              <Trans i18nKey="sites:toolbarSettingsMarginPaddingLabel" />
            </h3>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-10">
              <div>
                <ToolbarMarginCombobox />
                <div className="mt-4">
                  <MarginClassBadges />
                </div>
              </div>

              <div>
                <ToolbarPaddingCombobox />
                <div className="mt-4">
                  <PaddingClassBadges />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="maxWidth">
          <AccordionTrigger>
            <h3 className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
              <Trans i18nKey="sites:toolbarMaxWidthLabel" />
            </h3>
          </AccordionTrigger>
          <AccordionContent>
            <ToolbarMaxWidth maxWidth={maxWidth} />
          </AccordionContent>
        </AccordionItem>

        <div>{children}</div>
      </Accordion>
    </div>
  );
}

export default ToolbarSettingsForm;
