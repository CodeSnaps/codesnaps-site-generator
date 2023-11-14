'use client';

import classNames from 'clsx';
import { useState } from 'react';

// TODO: remove ignore https://github.com/vercel/next.js/issues/56041
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom';

import Image from 'next/image';

import {
  CheckCircleIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline';

import { submitFeedbackAction } from './lib/feedback-actions';

import If from '~/core/ui/If';
import Button from '~/core/ui/Button';
import Textarea from '~/core/ui/Textarea';

import { Popover, PopoverContent, PopoverTrigger } from '~/core/ui/Popover';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

import TextField, { TextFieldHint, TextFieldInput } from '~/core/ui/TextField';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/core/ui/Tooltip';

enum FeedbackType {
  Bug = 'bug',
  Question = 'question',
  Feedback = 'feedback',
}

type FeedbackPopupContainerProps = React.PropsWithChildren<{
  metadata?: UnknownObject;
}>;

export function FeedbackPopupContainer({
  children,
  metadata = {},
}: FeedbackPopupContainerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent
        collisionPadding={50}
        className={'w-96'}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <FormContainer metadata={metadata} onClose={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}

function FormContainer(
  props: FeedbackPopupContainerProps & {
    onClose: () => void;
  },
) {
  const [status, formAction] = useFormState(submitFeedbackAction, {
    success: undefined,
  });

  const hasError = status.success !== undefined && !status.success;

  if (status.success) {
    return (
      <div
        className={
          'flex flex-col space-y-2 py-2 px-4 w-96 h-40' +
          ' justify-center items-center'
        }
      >
        <div>
          <CheckCircleIcon className={'h-12 text-green-500'} />
        </div>

        <span className={'font-semibold'}>Thank you for your feedback!</span>

        <Button variant={'ghost'} onClick={() => props.onClose()}>
          Close
        </Button>
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        className={
          'flex flex-col space-y-2 py-2 px-4 w-96 h-40' +
          ' justify-center items-center'
        }
      >
        <div>
          <ExclamationCircleIcon className={'h-12 text-yellow-500'} />
        </div>

        <div className={'flex flex-col space-y-1'}>
          <span className={'font-semibold'}>Sorry, Something went wrong!</span>

          <span className={'text-sm text-gray-500'}>
            Please try again later or contact us directly.
          </span>
        </div>

        <div className={'flex justify-start'}>
          <Button variant={'ghost'} onClick={props.onClose}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <div className={'flex flex-col space-y-4 py-2 px-4'}>
        <span className={'font-semibold'}>Contact us about...</span>

        <FormFields />

        <div className={'flex justify-between items-center'}>
          <AttachmentButton />

          <SubmitButtons onClose={props.onClose} />
        </div>
      </div>

      <DeviceInfo />
      <FeedbackMetadata metadata={props.metadata} />
    </form>
  );
}

function FormFields() {
  const [checked, setChecked] = useState(FeedbackType.Feedback);
  const displayEmail = checked === FeedbackType.Question;

  return (
    <>
      <FeedbackTypeRadioGroup checked={checked} setChecked={setChecked} />

      <If condition={displayEmail}>
        <TextField>
          <TextFieldInput
            required
            name={'email'}
            type={'email'}
            placeholder={'Type your Email here...'}
          />

          <TextFieldHint>We will reply to your email address</TextFieldHint>
        </TextField>
      </If>

      <Textarea
        placeholder={getPlaceholder(checked)}
        name={'text'}
        required
        className={'h-24 resize-none'}
      />
    </>
  );
}

function FeedbackTypeRadioGroup({
  checked,
  setChecked,
}: {
  checked: FeedbackType;
  setChecked: (value: FeedbackType) => void;
}) {
  return (
    <div className={'flex space-x-2.5 items-center'}>
      <RadioItem
        checked={checked === FeedbackType.Feedback}
        name={'type'}
        value={FeedbackType.Feedback}
        className={
          'text-green-500' +
          ' aria-checked:dark:bg-green-500/10 aria-checked:bg-green-50/50' +
          ' dark:aria-checked:border-green-800'
        }
        onChange={setChecked}
      >
        Feedback
      </RadioItem>

      <RadioItem
        checked={checked === FeedbackType.Question}
        name={'type'}
        value={FeedbackType.Question}
        className={
          'text-blue-500 ' +
          ' aria-checked:dark:bg-blue-500/10 aria-checked:bg-blue-50/50' +
          ' dark:aria-checked:border-blue-800'
        }
        onChange={setChecked}
      >
        Question
      </RadioItem>

      <RadioItem
        checked={checked === FeedbackType.Bug}
        name={'type'}
        value={FeedbackType.Bug}
        className={
          'text-red-500 ' +
          ' aria-checked:dark:bg-red-500/10 aria-checked:bg-red-50/50' +
          ' dark:aria-checked:border-red-800'
        }
        onChange={setChecked}
      >
        Bug
      </RadioItem>
    </div>
  );
}

function RadioItem(
  props: React.PropsWithChildren<{
    name: string;
    value: FeedbackType;
    checked: boolean;
    className: string;
    onChange: (value: FeedbackType) => void;
  }>,
) {
  return (
    <label
      aria-checked={props.checked}
      className={classNames(
        `text-sm cursor-pointer items-center flex relative space-x-1.5 w-full p-1.5 rounded-lg transition-colors border border-transparent`,
        {
          'hover:bg-gray-50/50 dark:hover:bg-dark-900': !props.checked,
        },
        props.className,
      )}
    >
      <input
        checked={props.checked}
        name={props.name}
        type="radio"
        value={props.value}
        className={'hidden'}
        onChange={() => props.onChange(props.value)}
      />

      <div
        className={
          'bg-current w-4 h-4 rounded-full flex items-center' +
          ' justify-center'
        }
      >
        <span
          className={classNames(
            'w-3.5 h-3.5 block rounded-full border-white border-2',
            {
              'bg-current animate-in zoom-in-75 fade-in': props.checked,
              'bg-white': !props.checked,
            },
          )}
        />
      </div>

      <span className={'text-center font-medium text-foreground'}>
        {props.children}
      </span>
    </label>
  );
}

function SubmitButtons(props: { onClose: () => void }) {
  const { pending } = useFormStatus();

  return (
    <div className={'flex space-x-2'}>
      <Button
        disabled={pending}
        variant={'ghost'}
        onClick={() => props.onClose()}
      >
        Close
      </Button>

      <Button loading={pending}>
        {pending ? (
          'Sending...'
        ) : (
          <span className={'flex space-x-1 items-center'}>
            <span>Send</span>
            <ChevronRightIcon className={'h-4'} />
          </span>
        )}
      </Button>
    </div>
  );
}

function FeedbackMetadata({
  metadata = {},
}: React.PropsWithChildren<{
  metadata: Maybe<UnknownObject>;
}>) {
  const keys = Object.keys(metadata ?? {});

  return (
    <>
      {keys.map((key) => {
        const value = metadata[key];

        if (!value) {
          return null;
        }

        const name = `metadata[${key}]`;

        return <HiddenInput key={key} value={value as string} name={name} />;
      })}
    </>
  );
}

function DeviceInfo() {
  const { userAgent, language } = navigator;
  const width = window.innerWidth.toString();
  const height = window.innerHeight.toString();
  const screenName = document.title;
  const prefix = 'device_info';

  return (
    <>
      <HiddenInput name={`screen_name`} value={screenName} />
      <HiddenInput name={`${prefix}[user_agent]`} value={userAgent} />
      <HiddenInput name={`${prefix}[language]`} value={language} />
      <HiddenInput name={`${prefix}[screen_size][width]`} value={width} />
      <HiddenInput name={`${prefix}[screen_size][height]`} value={height} />
    </>
  );
}

function AttachmentButton() {
  const [attachment, setAttachment] = useState<{
    image: string;
    file: File;
  }>();

  return (
    <>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <div className={'flex space-x-2 items-center'}>
                <Button type={'button'} size={'icon'} variant={'ghost'}>
                  <PaperClipIcon className={'h-4'} />
                </Button>

                <If condition={attachment}>
                  {(attachment) => (
                    <Image
                      className={'object-cover'}
                      alt={'Preview'}
                      width={75}
                      height={75}
                      src={attachment.image}
                    />
                  )}
                </If>
              </div>
            </DropdownMenuTrigger>
          </TooltipTrigger>

          <TooltipContent>Attach file or screenshot</TooltipContent>
        </Tooltip>

        <DropdownMenuContent>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <UploadImageButton onChange={setAttachment} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <If condition={attachment}>
        {(attachment) => {
          return (
            <>
              <HiddenInput
                name={'attachment[name]'}
                value={attachment.file.name}
              />

              <HiddenInput
                name={'attachment[image]'}
                value={attachment.image}
              />

              <HiddenInput
                name={'attachment[type]'}
                value={attachment.file.type}
              />
            </>
          );
        }}
      </If>
    </>
  );
}

function getPlaceholder(checked: FeedbackType) {
  switch (checked) {
    case FeedbackType.Feedback:
      return 'What do you like or dislike? What can we do better?';

    case FeedbackType.Question:
      return 'Ask us anything';

    case FeedbackType.Bug:
      return 'What happened? What were you expecting to happen?';
  }
}

function HiddenInput(
  props: React.PropsWithChildren<{
    name: string;
    value: string;
  }>,
) {
  return <input type={'hidden'} name={props.name} value={props.value} />;
}

function UploadImageButton(
  props: React.PropsWithChildren<{
    onChange: (params: { file: File; image: string }) => void;
  }>,
) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result as string;

      props.onChange({ image, file });
    };

    reader.readAsDataURL(file);
  };

  return (
    <label>
      Upload Image{' '}
      <input
        type={'file'}
        className={'hidden'}
        name={'attachment'}
        accept="image/*"
        onChange={onChange}
      />
    </label>
  );
}
