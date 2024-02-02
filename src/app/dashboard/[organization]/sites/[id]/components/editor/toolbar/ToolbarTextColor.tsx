'use client';

import _ from 'lodash';
import clsx from 'clsx';
import configuration from '~/configuration';
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

type Color = {
  name: string;
  value: string;
};

function ToolbarColor({ currentColor }: { currentColor: string }) {
  const {
    actions: { setProp },
  } = useNode();

  const defaultColor: Color | null = configuration.colorPalette.find(
    (color) => color === currentColor,
  )
    ? {
        name: _(currentColor).capitalize(),
        value: currentColor,
      }
    : null;

  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Color | null>(
    defaultColor,
  );

  const colors: Color[] = configuration.colorPalette.map((color) => ({
    name: _(color).capitalize(),
    value: color,
  }));

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">
        <Trans i18nKey="sites:toolbarTextColorBtnSelectorTitle" />
      </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex w-full justify-end">
            <Button variant="outline" className="w-full max-w-[160px]">
              {selectedStatus ? (
                <div className="flex items-center gap-2">
                  <ColorCircle color={selectedStatus.value} />
                  <span className="text-sm font-normal">
                    {selectedStatus.name}
                  </span>
                </div>
              ) : (
                <span className="text-sm font-normal">
                  <Trans i18nKey="sites:toolbarTextColorSelectorBtnLabel" />
                </span>
              )}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="center">
          <Command>
            <CommandInput placeholder="Change color..." className="my-2" />
            <CommandEmpty>
              <Trans i18nKey="sites:toolbarNoResults" />
            </CommandEmpty>

            <CommandList>
              <CommandGroup>
                {colors.map((color) => (
                  <CommandItem
                    key={color.value}
                    value={color.value}
                    onSelect={() => {
                      setProp(
                        (props: { textColor: string }) =>
                          (props.textColor = color.value),
                      );
                      setSelectedStatus(color);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <ColorCircle color={color.value} />
                      <span>{color.name}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ToolbarColor;

const checkboxConfig = {
  slate: {
    outerRing: 'bg-slate-200 dark:bg-slate-400/30',
    innerRing:
      'bg-slate-500 text-slate-500 dark:bg-slate-500 dark:text-slate-500',
  },
  gray: {
    outerRing: 'bg-gray-200 dark:bg-gray-400/30',
    innerRing: 'bg-gray-500 text-gray-500 dark:bg-gray-500 dark:text-gray-500',
  },
  zinc: {
    outerRing: 'bg-zinc-200 dark:bg-zinc-400/30',
    innerRing: 'bg-zinc-500 text-zinc-500 dark:bg-zinc-500 dark:text-zinc-500',
  },
  neutral: {
    outerRing: 'bg-neutral-200 dark:bg-neutral-400/30',
    innerRing:
      'bg-neutral-500 text-neutral-500 dark:bg-neutral-500 dark:text-neutral-500',
  },
  stone: {
    outerRing: 'bg-stone-200 dark:bg-stone-400/30',
    innerRing:
      'bg-stone-500 text-stone-500 dark:bg-stone-500 dark:text-stone-500',
  },
  red: {
    outerRing: 'bg-red-200 dark:bg-red-400/30',
    innerRing: 'bg-red-500 text-red-500 dark:bg-red-500 dark:text-red-500',
  },
  orange: {
    outerRing: 'bg-orange-200 dark:bg-orange-400/30',
    innerRing:
      'bg-orange-500 text-orange-500 dark:bg-orange-500 dark:text-orange-500',
  },
  amber: {
    outerRing: 'bg-amber-200 dark:bg-amber-400/30',
    innerRing:
      'bg-amber-500 text-amber-500 dark:bg-amber-500 dark:text-amber-500',
  },
  yellow: {
    outerRing: 'bg-yellow-200 dark:bg-yellow-400/30',
    innerRing:
      'bg-yellow-500 text-yellow-500 dark:bg-yellow-500 dark:text-yellow-500',
  },
  lime: {
    outerRing: 'bg-lime-200 dark:bg-lime-400/30',
    innerRing: 'bg-lime-500 text-lime-500 dark:bg-lime-500 dark:text-lime-500',
  },
  green: {
    outerRing: 'bg-green-200 dark:bg-green-400/30',
    innerRing:
      'bg-green-500 text-green-500 dark:bg-green-500 dark:text-green-500',
  },
  emerald: {
    outerRing: 'bg-emerald-200 dark:bg-emerald-400/30',
    innerRing:
      'bg-emerald-500 text-emerald-500 dark:bg-emerald-500 dark:text-emerald-500',
  },
  teal: {
    outerRing: 'bg-teal-200 dark:bg-teal-400/30',
    innerRing: 'bg-teal-500 text-teal-500 dark:bg-teal-500 dark:text-teal-500',
  },
  cyan: {
    outerRing: 'bg-cyan-200 dark:bg-cyan-400/30',
    innerRing: 'bg-cyan-500 text-cyan-500 dark:bg-cyan-500 dark:text-cyan-500',
  },
  sky: {
    outerRing: 'bg-sky-200 dark:bg-sky-400/30',
    innerRing: 'bg-sky-500 text-sky-500 dark:bg-sky-500 dark:text-sky-500',
  },
  blue: {
    outerRing: 'bg-blue-200 dark:bg-blue-400/30',
    innerRing: 'bg-blue-500 text-blue-500 dark:bg-blue-500 dark:text-blue-500',
  },
  indigo: {
    outerRing: 'bg-indigo-200 dark:bg-indigo-400/30',
    innerRing:
      'bg-indigo-500 text-indigo-500 dark:bg-indigo-500 dark:text-indigo-500',
  },
  violet: {
    outerRing: 'bg-violet-200 dark:bg-violet-400/30',
    innerRing:
      'bg-violet-500 text-violet-500 dark:bg-violet-500 dark:text-violet-500',
  },
  purple: {
    outerRing: 'bg-purple-200 dark:bg-purple-400/30',
    innerRing:
      'bg-purple-500 text-purple-500 dark:bg-purple-500 dark:text-purple-500',
  },
  fuchsia: {
    outerRing: 'bg-fuchsia-200 dark:bg-fuchsia-400/30',
    innerRing:
      'bg-fuchsia-500 text-fuchsia-500 dark:bg-fuchsia-500 dark:text-fuchsia-500',
  },
  pink: {
    outerRing: 'bg-pink-200 dark:bg-pink-400/30',
    innerRing: 'bg-pink-500 text-pink-500 dark:bg-pink-500 dark:text-pink-500',
  },
  rose: {
    outerRing: 'bg-rose-200 dark:bg-rose-400/30',
    innerRing: 'bg-rose-500 text-rose-500 dark:bg-rose-500 dark:text-rose-500',
  },
};

function ColorCircle({ color }: { color: string }) {
  const colorName = color.slice(0, 1).toUpperCase() + color.slice(1);

  return (
    <div
      className={clsx(
        `rounded-full w-6 h-6`,
        checkboxConfig[color as keyof typeof checkboxConfig].outerRing,
      )}
    >
      <div className="flex items-center justify-center h-full">
        <div
          className={clsx(
            `w-4 h-4 mx-auto rounded-full outline-none border-none focus:ring-0`,
            checkboxConfig[color as keyof typeof checkboxConfig].innerRing,
          )}
        />
        <label className="sr-only">Color {colorName}</label>
      </div>
    </div>
  );
}
