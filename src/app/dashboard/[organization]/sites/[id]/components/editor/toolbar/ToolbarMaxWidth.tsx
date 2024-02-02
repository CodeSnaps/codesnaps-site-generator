'use client';

import _ from 'lodash';
import Trans from '~/core/ui/Trans';

import { useState } from 'react';
import { useNode } from '@craftjs/core';

import { Button } from '~/core/ui/Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/core/ui/Command';
import { Popover, PopoverContent, PopoverTrigger } from '~/core/ui/Popover';

import { maxWidthClasses } from '~/app/dashboard/[organization]/sites/[id]/lib/padding-margin-width-classes';

function ToolbarMaxWidth({ maxWidth }: { maxWidth: string }) {
  const {
    actions: { setProp },
  } = useNode();

  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(maxWidth);

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">
        <Trans i18nKey="sites:toolbarMaxWidthBtnSelectorTitle" />
      </p>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex w-full justify-end">
            <Button variant="outline" className="w-full max-w-[160px]">
              {selectedStatus ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-normal">{selectedStatus}</span>
                </div>
              ) : (
                <span className="text-sm font-normal">
                  <Trans i18nKey="sites:toolbarMaxWidthSelectorBtnLabel" />
                </span>
              )}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="center">
          <Command>
            <CommandInput placeholder="Set max width..." className="my-2" />
            <CommandEmpty>
              <Trans i18nKey="sites:toolbarNoResults" />
            </CommandEmpty>

            <CommandList>
              <CommandGroup>
                {maxWidthClasses.map((widthClass) => {
                  return (
                    <CommandItem
                      key={widthClass.className}
                      onSelect={() => {
                        setProp(
                          (props: { maxWidth: string }) =>
                            (props.maxWidth = widthClass.className),
                        );
                        setSelectedStatus(widthClass.className);
                        setOpen(false);
                      }}
                    >
                      <span>{widthClass.className}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ToolbarMaxWidth;
