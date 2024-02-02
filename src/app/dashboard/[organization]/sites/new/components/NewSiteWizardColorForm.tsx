import clsx from 'clsx';

import { useForm, Controller } from 'react-hook-form';

import Heading from '~/core/ui/Heading';
import SubHeading from '~/core/ui/SubHeading';
import { Tooltip, TooltipTrigger, TooltipContent } from '~/core/ui/Tooltip';
import Trans from '~/core/ui/Trans';
import {
  PreviousStepButton,
  NextStepButton,
} from '~/app/dashboard/[organization]/sites/new/components/NewSiteWizard';

const tailwindCSSColorPalette: string[] = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
];

export function NewSiteWizardColorForm({
  form,
  onSubmit,
}: {
  form: ReturnType<
    typeof useForm<{
      color: string;
    }>
  >;
  onSubmit: (data: { color: string }) => void;
}) {
  return (
    <form
      onSubmit={form.handleSubmit((values) => {
        onSubmit(values);
      })}
      className="max-w-[1600px] mx-auto"
    >
      <Heading type={3}>
        <Trans i18nKey="sites:colorStepTitle" />
      </Heading>

      <div className="grid xl:grid-cols-3 mt-10 xl:mt-0 gap-10">
        <div className="flex flex-col gap-4 justify-center">
          <Heading type={2}>
            <Trans i18nKey="sites:colorHeading" />
          </Heading>

          <SubHeading as={'h3'}>
            <Trans i18nKey="sites:colorSubHeading" />
          </SubHeading>

          <div className="my-6">
            <Controller
              name="color"
              control={form.control}
              defaultValue={tailwindCSSColorPalette[0]}
              render={({ field: { value, onChange } }) => (
                <div className="grid grid-cols-6 gap-2 max-w-md">
                  {tailwindCSSColorPalette.map((color) => (
                    <ColorCheckbox
                      key={color}
                      color={color}
                      checked={value === color}
                      onChange={() => onChange(color)}
                    />
                  ))}
                </div>
              )}
            />
          </div>

          <div className="hidden lg:flex space-x-2 mt-6">
            <PreviousStepButton />
            <NextStepButton />
          </div>
        </div>

        <div className="w-full mt-10 xl:mt-0 col-span-2">
          <DisplayComponent form={form} />
        </div>
      </div>
    </form>
  );
}

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

function ColorCheckbox({
  color,
  checked,
  onChange,
}: {
  color: string;
  checked: boolean;
  onChange: () => void;
}) {
  const colorName = color.slice(0, 1).toUpperCase() + color.slice(1);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={clsx(
            `rounded-full w-11 h-11`,
            checkboxConfig[color as keyof typeof checkboxConfig].outerRing,
          )}
          onClick={onChange}
        >
          <div className="flex items-center justify-center h-full">
            <input
              type="checkbox"
              className={clsx(
                `w-8 h-8 mx-auto rounded-full outline-none border-none focus:ring-0`,
                checkboxConfig[color as keyof typeof checkboxConfig].innerRing,
              )}
              checked={checked}
              onChange={() => {}}
            />
            <label className="sr-only">Color {colorName}</label>
          </div>
        </div>
      </TooltipTrigger>

      <TooltipContent>{colorName}</TooltipContent>
    </Tooltip>
  );
}

function DisplayComponent({
  form,
}: {
  form: ReturnType<
    typeof useForm<{
      color: string;
    }>
  >;
}) {
  const colorConfig = {
    slate: {
      wave: 'bg-slate-300 dark:bg-slate-600',
      primaryBtn:
        'bg-slate-700 hover:bg-slate-600 text-white dark:bg-slate-800 dark:hover:bg-slate-900',
      secondaryBtn:
        'bg-slate-200 text-slate-800 ring-slate-500 hover:bg-slate-100/80 dark:ring-slate-400 dark:bg-slate-300 dark:hover:bg-slate-300/80',
      icon: 'fill-slate-700',
      image: 'bg-slate-50',
      textHeading: 'text-slate-900',
      textSubHeading: 'text-slate-600',
    },
    gray: {
      wave: 'bg-gray-300 dark:bg-gray-600',
      primaryBtn:
        'bg-gray-700 hover:bg-gray-600 text-white dark:bg-gray-800 dark:hover:bg-gray-900',
      secondaryBtn:
        'bg-gray-200 text-gray-800 ring-gray-500 hover:bg-gray-100/80 dark:ring-gray-400 dark:bg-gray-300 dark:hover:bg-gray-300/80',
      icon: 'fill-gray-700',
      image: 'bg-gray-50',
      textHeading: 'text-gray-900',
      textSubHeading: 'text-gray-600',
    },
    zinc: {
      wave: 'bg-zinc-300 dark:bg-zinc-600',
      primaryBtn:
        'bg-zinc-700 hover:bg-zinc-600 text-white dark:bg-zinc-800 dark:hover:bg-zinc-900',
      secondaryBtn:
        'bg-zinc-200 text-zinc-800 ring-zinc-500 hover:bg-zinc-100/80 dark:ring-zinc-400 dark:bg-zinc-300 dark:hover:bg-zinc-300/80',
      icon: 'fill-zinc-700',
      image: 'bg-zinc-50',
      textHeading: 'text-zinc-900',
      textSubHeading: 'text-zinc-600',
    },
    neutral: {
      wave: 'bg-neutral-300 dark:bg-neutral-600',
      primaryBtn:
        'bg-neutral-700 hover:bg-neutral-600 text-white dark:bg-neutral-800 dark:hover:bg-neutral-900',
      secondaryBtn:
        'bg-neutral-200 text-neutral-800 ring-neutral-500 hover:bg-neutral-100/80 dark:ring-neutral-400 dark:bg-neutral-300 dark:hover:bg-neutral-300/80',
      icon: 'fill-neutral-700',
      image: 'bg-neutral-50',
      textHeading: 'text-neutral-900',
      textSubHeading: 'text-neutral-600',
    },
    stone: {
      wave: 'bg-stone-300 dark:bg-stone-600',
      primaryBtn:
        'bg-stone-700 hover:bg-stone-600 text-white dark:bg-stone-800 dark:hover:bg-stone-900',
      secondaryBtn:
        'bg-stone-200 text-stone-800 ring-stone-500 hover:bg-stone-100/80 dark:ring-stone-400 dark:bg-stone-300 dark:hover:bg-stone-300/80',
      icon: 'fill-stone-700',
      image: 'bg-stone-50',
      textHeading: 'text-stone-900',
      textSubHeading: 'text-stone-600',
    },
    red: {
      wave: 'bg-red-300 dark:bg-red-600',
      primaryBtn:
        'bg-red-700 hover:bg-red-600 text-white dark:bg-red-900 dark:hover:bg-red-800',
      secondaryBtn:
        'bg-red-50 text-red-800 ring-red-300 hover:bg-white dark:ring-red-500 dark:bg-red-100 dark:hover:bg-red-50',
      icon: 'fill-red-700',
      image: 'bg-red-50',
      textHeading: 'text-red-950',
      textSubHeading: 'text-red-800/80',
    },
    orange: {
      wave: 'bg-orange-300 dark:bg-orange-600',
      primaryBtn:
        'bg-orange-700 hover:bg-orange-600 text-white dark:bg-orange-900 dark:hover:bg-orange-800',
      secondaryBtn:
        'bg-orange-50 text-orange-800 ring-orange-300 hover:bg-white dark:ring-orange-500 dark:bg-orange-100 dark:hover:bg-orange-50',
      icon: 'fill-orange-700',
      image: 'bg-orange-50',
      textHeading: 'text-orange-950',
      textSubHeading: 'text-orange-800/80',
    },
    amber: {
      wave: 'bg-amber-300 dark:bg-amber-600',
      primaryBtn:
        'bg-amber-700 hover:bg-amber-600 text-white dark:bg-amber-900 dark:hover:bg-amber-800',
      secondaryBtn:
        'bg-amber-50 text-amber-800 ring-amber-300 hover:bg-white dark:ring-amber-500 dark:bg-amber-100 dark:hover:bg-amber-50',
      icon: 'fill-amber-700',
      image: 'bg-amber-50',
      textHeading: 'text-amber-950',
      textSubHeading: 'text-amber-800/80',
    },
    yellow: {
      wave: 'bg-yellow-300 dark:bg-yellow-600',
      primaryBtn:
        'bg-yellow-700 hover:bg-yellow-600 text-white dark:bg-yellow-900 dark:hover:bg-yellow-800',
      secondaryBtn:
        'bg-yellow-50 text-yellow-800 ring-yellow-300 hover:bg-white dark:ring-yellow-500 dark:bg-yellow-100 dark:hover:bg-yellow-50',
      icon: 'fill-yellow-700',
      image: 'bg-yellow-50',
      textHeading: 'text-yellow-950',
      textSubHeading: 'text-yellow-800/80',
    },
    lime: {
      wave: 'bg-lime-300 dark:bg-lime-600',
      primaryBtn:
        'bg-lime-700 hover:bg-lime-600 text-white dark:bg-lime-900 dark:hover:bg-lime-800',
      secondaryBtn:
        'bg-lime-50 text-lime-800 ring-lime-300 hover:bg-white dark:ring-lime-500 dark:bg-lime-100 dark:hover:bg-lime-50',
      icon: 'fill-lime-700',
      image: 'bg-lime-50',
      textHeading: 'text-lime-950',
      textSubHeading: 'text-lime-800/80',
    },
    green: {
      wave: 'bg-green-300 dark:bg-green-600',
      primaryBtn:
        'bg-green-700 hover:bg-green-600 text-white dark:bg-green-900 dark:hover:bg-green-800',
      secondaryBtn:
        'bg-green-50 text-green-800 ring-green-300 hover:bg-white dark:ring-green-500 dark:bg-green-100 dark:hover:bg-green-50',
      icon: 'fill-green-700',
      image: 'bg-green-50',
      textHeading: 'text-green-950',
      textSubHeading: 'text-green-800/80',
    },
    emerald: {
      wave: 'bg-emerald-300 dark:bg-emerald-600',
      primaryBtn:
        'bg-emerald-700 hover:bg-emerald-600 text-white dark:bg-emerald-900 dark:hover:bg-emerald-800',
      secondaryBtn:
        'bg-emerald-50 text-emerald-800 ring-emerald-300 hover:bg-white dark:ring-emerald-500 dark:bg-emerald-100 dark:hover:bg-emerald-50',
      icon: 'fill-emerald-700',
      image: 'bg-emerald-50',
      textHeading: 'text-emerald-950',
      textSubHeading: 'text-emerald-800/80',
    },
    teal: {
      wave: 'bg-teal-300 dark:bg-teal-600',
      primaryBtn:
        'bg-teal-700 hover:bg-teal-600 text-white dark:bg-teal-900 dark:hover:bg-teal-800',
      secondaryBtn:
        'bg-teal-50 text-teal-800 ring-teal-300 hover:bg-white dark:ring-teal-500 dark:bg-teal-100 dark:hover:bg-teal-50',
      icon: 'fill-teal-700',
      image: 'bg-teal-50',
      textHeading: 'text-teal-950',
      textSubHeading: 'text-teal-800/80',
    },
    cyan: {
      wave: 'bg-cyan-300 dark:bg-cyan-600',
      primaryBtn:
        'bg-cyan-700 hover:bg-cyan-600 text-white dark:bg-cyan-900 dark:hover:bg-cyan-800',
      secondaryBtn:
        'bg-cyan-50 text-cyan-800 ring-cyan-300 hover:bg-white dark:ring-cyan-500 dark:bg-cyan-100 dark:hover:bg-cyan-50',
      icon: 'fill-cyan-700',
      image: 'bg-cyan-50',
      textHeading: 'text-cyan-950',
      textSubHeading: 'text-cyan-800/80',
    },
    sky: {
      wave: 'bg-sky-300 dark:bg-sky-600',
      primaryBtn:
        'bg-sky-700 hover:bg-sky-600 text-white dark:bg-sky-900 dark:hover:bg-sky-800',
      secondaryBtn:
        'bg-sky-50 text-sky-800 ring-sky-300 hover:bg-white dark:ring-sky-500 dark:bg-sky-100 dark:hover:bg-sky-50',
      icon: 'fill-sky-700',
      image: 'bg-sky-50',
      textHeading: 'text-sky-950',
      textSubHeading: 'text-sky-800/80',
    },
    blue: {
      wave: 'bg-blue-300 dark:bg-blue-600',
      primaryBtn:
        'bg-blue-700 hover:bg-blue-600 text-white dark:bg-blue-900 dark:hover:bg-blue-800',
      secondaryBtn:
        'bg-blue-50 text-blue-800 ring-blue-300 hover:bg-white dark:ring-blue-500 dark:bg-blue-100 dark:hover:bg-blue-50',
      icon: 'fill-blue-700',
      image: 'bg-blue-50',
      textHeading: 'text-blue-950',
      textSubHeading: 'text-blue-800/80',
    },
    indigo: {
      wave: 'bg-indigo-300 dark:bg-indigo-600',
      primaryBtn:
        'bg-indigo-700 hover:bg-indigo-600 text-white dark:bg-indigo-900 dark:hover:bg-indigo-800',
      secondaryBtn:
        'bg-indigo-50 text-indigo-800 ring-indigo-300 hover:bg-white dark:ring-indigo-500 dark:bg-indigo-100 dark:hover:bg-indigo-50',
      icon: 'fill-indigo-700',
      image: 'bg-indigo-50',
      textHeading: 'text-indigo-950',
      textSubHeading: 'text-indigo-800/80',
    },
    violet: {
      wave: 'bg-violet-300 dark:bg-violet-600',
      primaryBtn:
        'bg-violet-700 hover:bg-violet-600 text-white dark:bg-violet-900 dark:hover:bg-violet-800',
      secondaryBtn:
        'bg-violet-50 text-violet-800 ring-violet-300 hover:bg-white dark:ring-violet-500 dark:bg-violet-100 dark:hover:bg-violet-50',
      icon: 'fill-violet-700',
      image: 'bg-violet-50',
      textHeading: 'text-violet-950',
      textSubHeading: 'text-violet-800/80',
    },
    purple: {
      wave: 'bg-purple-300 dark:bg-purple-600',
      primaryBtn:
        'bg-purple-700 hover:bg-purple-600 text-white dark:bg-purple-900 dark:hover:bg-purple-800',
      secondaryBtn:
        'bg-purple-50 text-purple-800 ring-purple-300 hover:bg-white dark:ring-purple-500 dark:bg-purple-100 dark:hover:bg-purple-50',
      icon: 'fill-purple-700',
      image: 'bg-purple-50',
      textHeading: 'text-purple-950',
      textSubHeading: 'text-purple-800/80',
    },
    fuchsia: {
      wave: 'bg-fuchsia-300 dark:bg-fuchsia-600',
      primaryBtn:
        'bg-fuchsia-700 hover:bg-fuchsia-600 text-white dark:bg-fuchsia-900 dark:hover:bg-fuchsia-800',
      secondaryBtn:
        'bg-fuchsia-50 text-fuchsia-800 ring-fuchsia-300 hover:bg-white dark:ring-fuchsia-500 dark:bg-fuchsia-100 dark:hover:bg-fuchsia-50',
      icon: 'fill-fuchsia-700',
      image: 'bg-fuchsia-50',
      textHeading: 'text-fuchsia-950',
      textSubHeading: 'text-fuchsia-800/80',
    },
    pink: {
      wave: 'bg-pink-300 dark:bg-pink-600',
      primaryBtn:
        'bg-pink-700 hover:bg-pink-600 text-white dark:bg-pink-900 dark:hover:bg-pink-800',
      secondaryBtn:
        'bg-pink-50 text-pink-800 ring-pink-300 hover:bg-white dark:ring-pink-500 dark:bg-pink-100 dark:hover:bg-pink-50',
      icon: 'fill-pink-700',
      image: 'bg-pink-50',
      textHeading: 'text-pink-950',
      textSubHeading: 'text-pink-800/80',
    },
    rose: {
      wave: 'bg-rose-300 dark:bg-rose-600',
      primaryBtn:
        'bg-rose-700 hover:bg-rose-600 text-white dark:bg-rose-900 dark:hover:bg-rose-800',
      secondaryBtn:
        'bg-rose-50 text-rose-800 ring-rose-300 hover:bg-white dark:ring-rose-500 dark:bg-rose-100 dark:hover:bg-rose-50',
      icon: 'fill-rose-700',
      image: 'bg-rose-50',
      textHeading: 'text-rose-950',
      textSubHeading: 'text-rose-800/80',
    },
  };

  const features = [
    {
      id: 1,
      name: 'Praesent a magna vitae nibh dignissim',
      description:
        'Cras fermentum ipsum sed velit accumsan pretium. Donec nec massa justo.',
      href: '#',
      icon: Icon,
    },
    {
      id: 2,
      name: 'Praesent a magna vitae nibh dignissim',
      description:
        'Cras fermentum ipsum sed velit accumsan pretium. Donec nec massa justo.',
      href: '#',
      icon: Icon,
    },
    {
      id: 3,
      name: 'Praesent a magna vitae nibh dignissim',
      description:
        'Cras fermentum ipsum sed velit accumsan pretium. Donec nec massa justo.',
      href: '#',
      icon: Icon,
    },
  ];

  const color = form.watch('color') as keyof typeof colorConfig;

  return (
    <div className="w-full border rounded-xl shadow-sm">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full relative h-full p-10">
          <div
            className={clsx(
              "absolute top-0 left-0 right-0 -z-10 h-full bg-[url('/assets/images/wave.webp')] bg-bottom bg-no-repeat rounded-xl",
              colorConfig[color].wave,
            )}
          />

          <div className="grid 2xl:grid-cols-2 gap-10 mt-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold leading-tight tracking-wide text-neutral-900 dark:text-white">
                Maecenas libero magna dapibus
              </h2>

              <p className="text-base text-neutral-600 dark:text-white/90">
                Sed cursus suscipit nunc, vitae auctor sapien vulputate a
                pellentesque ullamcorper.
              </p>

              <div className="flex gap-4">
                <button
                  type="button"
                  disabled
                  className={clsx(
                    'rounded-md px-8 py-3 text-xs uppercase font-bold shadow-sm focus-visible:outline-none',
                    colorConfig[color].primaryBtn,
                  )}
                >
                  <Trans i18nKey="sites:displayPrimaryBtn" />
                </button>

                <button
                  type="button"
                  disabled
                  className={clsx(
                    'rounded-md px-8 py-3 text-xs uppercase font-bold shadow-sm ring-1 ring-inset focus-visible:outline-none dark:focus-visible:outline-none',
                    colorConfig[color].secondaryBtn,
                  )}
                >
                  <Trans i18nKey="sites:displaySecondaryBtn" />
                </button>
              </div>
            </div>

            <div
              className={clsx(
                'w-full h-full min-h-60 rounded-md shadow-sm',
                colorConfig[color].image,
              )}
            />
          </div>

          <div className="mt-16 sm:mt-20 lg:mt-24">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.id} className="flex flex-col">
                  <feature.icon
                    className={clsx(
                      'h-10 w-10 flex-none',
                      colorConfig[color].icon,
                    )}
                    aria-hidden="true"
                  />

                  <dt
                    className={clsx(
                      'mt-4 flex items-center gap-x-3 text-lg font-semibold leading-7',
                      colorConfig[color].textHeading,
                    )}
                  >
                    {feature.name}
                  </dt>

                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7">
                    <p
                      className={clsx(
                        'flex-auto text-sm',
                        colorConfig[color].textSubHeading,
                      )}
                    >
                      {feature.description}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" {...props}>
      <path
        fillRule="nonzero"
        d="M26.009 8.191a13.253 13.253 0 00-2-3.22 13.53 13.53 0 10-18.68 19.32 13.08 13.08 0 003.2 1.83c1.609.66 3.331.999 5.07 1a13.56 13.56 0 0013.53-13.55 13.392 13.392 0 00-1.12-5.38zm-12.42-5.43c1.562 0 3.104.341 4.52 1a4.364 4.364 0 01-1.08.31 5.731 5.731 0 00-4.85 4.85 2.998 2.998 0 01-2.71 2.65 5.731 5.731 0 00-4.85 4.85 2.905 2.905 0 01-.79 1.74 10.801 10.801 0 019.77-15.42l-.01.02zm-8.27 17.81c.12-.11.24-.21.36-.33a5.474 5.474 0 001.62-3.23 2.916 2.916 0 01.87-1.82 2.827 2.827 0 011.81-.86 5.731 5.731 0 004.85-4.85 2.919 2.919 0 01.87-1.91 2.87 2.87 0 011.83-.83 5.474 5.474 0 003-1.43 10.51 10.51 0 012.36 2.78.907.907 0 01-.13.14 2.868 2.868 0 01-1.81.88 5.704 5.704 0 00-3.234 1.616 5.704 5.704 0 00-1.616 3.234 3.001 3.001 0 01-2.69 2.68 5.76 5.76 0 00-4.88 4.85 3.145 3.145 0 01-.49 1.37 10.89 10.89 0 01-2.72-2.29zm8.27 3.86a10.83 10.83 0 01-3-.42c.334-.622.551-1.3.64-2a3.003 3.003 0 012.68-2.68 5.731 5.731 0 004.86-4.85 3.003 3.003 0 012.68-2.68 5.708 5.708 0 002.56-1 10.82 10.82 0 01-10.42 13.58v.05z"
      ></path>
    </svg>
  );
}
