'use client';

import { useState } from 'react';
import { useNode } from '@craftjs/core';

import { XCircleIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import Badge from '~/core/ui/Badge';
import { Button } from '~/core/ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '~/core/ui/Popover';
import { ScrollArea } from '~/core/ui/ScrollArea';
import { TextFieldInput } from '~/core/ui/TextField';
import Trans from '~/core/ui/Trans';

import { marginClasses } from '~/app/dashboard/[organization]/sites/[id]/lib/padding-margin-width-classes';

import Fuse from 'fuse.js';

function ToolbarMarginCombobox() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const fuse = new Fuse(marginClasses, {
    keys: ['className'],
  });

  const searchResults = fuse.search(search);

  const {
    marginArray,
    actions: { setProp },
  } = useNode((node) => ({
    marginArray: node.data.props.marginArray,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-sm font-normal"
        >
          <Trans i18nKey="sites:toolbarMarginBtnLabel" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[15rem] p-0" side="bottom" align="center">
        <div className="flex space-x-2 items-center bg-white py-2.5 px-2 rounded-lg dark:bg-background/50">
          <MagnifyingGlassIcon className="w-5 h-5 mx-px" />
          <TextFieldInput
            id={'search'}
            name={'search'}
            defaultValue={search}
            placeholder={'Search class...'}
            onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
            className="w-full"
          />
        </div>

        <hr className="border-neutral-200 dark:border-neutral-700 my-2" />

        <ScrollArea className="h-[300px] w-full dark:border rounded-lg bg-background dark:bg-background/60">
          <div className="p-1.5">
            {searchResults.map((result) => {
              const { item } = result;
              const { className } = item;

              const isAlreadySelected = marginArray.includes(className);
              if (isAlreadySelected) {
                return null;
              }

              return (
                <button
                  key={className}
                  className="w-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm font-medium outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-neutral-200/50 dark:hover:bg-neutral-900"
                  onClick={() => {
                    setProp((props: { marginArray: string[] }) => {
                      const array: string[] = [...props.marginArray];
                      array.push(className);
                      return (props.marginArray = array);
                    });
                    setOpen(false);
                  }}
                >
                  {className}
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

export default ToolbarMarginCombobox;

export function MarginClassBadges() {
  const {
    marginArray,
    actions: { setProp },
  } = useNode((node) => ({
    marginArray: node.data.props.marginArray,
  }));

  return (
    <div className="flex flex-wrap gap-2">
      {marginArray.map((classKey: string) => {
        return (
          <div key={classKey}>
            <Badge className="flex items-center bg-neutral-800 text-white text-xs">
              <span>{classKey}</span>
              <button
                className="text-white"
                onClick={() => {
                  setProp((props: { marginArray: string[] }) => {
                    const array: string[] = props.marginArray;
                    const index = array.indexOf(classKey);
                    if (index > -1) {
                      array.splice(index, 1);
                    }
                    return (props.marginArray = array);
                  });
                }}
              >
                <XCircleIcon className="w-4 h-4" />
              </button>
            </Badge>
          </div>
        );
      })}
    </div>
  );
}
