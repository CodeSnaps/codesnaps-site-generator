'use client';

import clsx from 'clsx';
import Image from 'next/image';

import { useState } from 'react';
import { toast } from 'sonner';
import { useForm, Controller } from 'react-hook-form';
import { Switch } from '~/core/ui/Switch';
import type { SupabaseClient } from '@supabase/supabase-js';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github';

import { createComponent } from '~/lib/components/database/mutations';

import Button from '~/core/ui/Button';
import Textarea from '~/core/ui/Textarea';
import TextField from '~/core/ui/TextField';
import ImageUploadInput from '~/core/ui/ImageUploadInput';
import Label from '~/core/ui/Label';

import useSupabase from '~/core/hooks/use-supabase';

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '~/core/ui/Select';

import { ScrollArea } from '~/core/ui/ScrollArea';

import {
  categories,
  textLayout,
  visualLayout,
  columnLayout,
  elementsProps,
  tabs,
} from '~/lib/components/database/filter-list';

type CreateComponentFormProps = {
  name: string;
  description: string;
  isPublished: boolean;
  isFree: boolean;
  type: string;
  category: string;
  previewURL: string;
  imageSrc: string;
  imageAlt: string;
  textLayout: string[];
  visualLayout: string[];
  columnLayout: string[];
  isInteractive: boolean;
  elements: string[];
  codeTailwindcssReact: string;
  codeTailwindcssNextjs: string;
  codeAnimationReact: string;
  codeAnimationNextjs: string;
};

const CreateComponentForm = () => {
  const client = useSupabase();
  const [image, setImage] = useState('https://dummyimage.com/1280x800');
  const [activeTab, setActiveTab] = useState('nextjs');

  const { control, register, handleSubmit, setValue } = useForm();

  const onSubmit = async (value: CreateComponentFormProps) => {
    let newPublicURL: string | null | undefined;

    const imageFile = getImageFile(value.imageSrc);

    if (imageFile) {
      newPublicURL = await uploadImage({
        client,
        componentName: value.name,
        image: imageFile,
        setImage,
      }).catch(() => {
        toast.error('Error uploading image');

        return null;
      });
    }

    const textLayout = value.textLayout ? value.textLayout : [];
    const visualLayout = value.visualLayout ? value.visualLayout : [];
    const columnLayout = value.columnLayout ? value.columnLayout : [];
    const layoutProperties = [...textLayout, ...visualLayout, ...columnLayout];

    const res = await createComponent(client, {
      data: {
        name: value.name,
        description: value.description,
        is_published: value.isPublished,
        is_free: value.isFree,
        type: value.type,
        category: value.category,
        preview_url: value.previewURL,
        image_src: newPublicURL ?? value.imageSrc,
        image_alt: value.imageAlt,
        layout_properties: layoutProperties,
        is_interactive: value.isInteractive,
        elements: value.elements,
        code_tailwindcss_react: value.codeTailwindcssReact,
        code_tailwindcss_nextjs: value.codeTailwindcssNextjs,
        code_animation_react: value.codeAnimationReact,
        code_animation_nextjs: value.codeAnimationNextjs,
      },
    });

    if (res.error) {
      toast.error('Error creating component');
      return;
    }

    toast.success('Component created successfully');
  };

  const changeTab = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  const nameControl = register('name', { required: true });
  const descriptionControl = register('description');
  const previewURLControl = register('previewURL', { required: true });
  const thumbnailControl = register('imageSrc', { required: true });
  const imageAltControl = register('imageAlt', { required: true });
  const textLayoutControl = register('textLayout');
  const visualLayoutControl = register('visualLayout');
  const columnLayoutControl = register('columnLayout');
  const elementsControl = register('elements');

  return (
    <form
      onSubmit={handleSubmit((value) => {
        return onSubmit(value as CreateComponentFormProps);
      })}
      className={'space-y-8'}
    >
      <div className={'flex flex-col space-y-4'}>
        <div className={'flex space-x-6 mb-4 lg:space-x-10'}>
          {/* IS PUBLISHED */}
          <Controller
            render={({ field }) => (
              <div className="flex items-center space-x-3">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="isPublished"
                />
                <label
                  htmlFor="isPublished"
                  className="font-medium text-neutral-900 dark:text-neutral-200 text-sm"
                >
                  Published
                </label>
              </div>
            )}
            name="isPublished"
            control={control}
          />

          {/* IS FREE */}
          <Controller
            render={({ field }) => (
              <div className="flex items-center space-x-3">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="isFree"
                />
                <label
                  htmlFor="isFree"
                  className="font-medium text-neutral-900 dark:text-neutral-200 text-sm"
                >
                  Free
                </label>
              </div>
            )}
            name="isFree"
            control={control}
          />

          {/* IS INTERACTIVE */}
          <Controller
            render={({ field }) => (
              <div className="flex items-center space-x-3">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="IsInteractive"
                />
                <label
                  htmlFor="IsInteractive"
                  className="font-medium text-neutral-900 dark:text-neutral-200 text-sm"
                >
                  Interactive
                </label>
              </div>
            )}
            name="isInteractive"
            control={control}
          />
        </div>

        {/*IMAGE UPLOAD */}
        <div className={'w-full'}>
          <Image
            priority
            src={image}
            alt={'Component Thumbnail'}
            width={1280}
            height={800}
          />
        </div>

        <ImageUploadInput
          {...thumbnailControl}
          multiple={false}
          image={null}
          onClear={() => setValue('imageSrc', '')}
        >
          Component Thumbnail
        </ImageUploadInput>

        {/* NAME */}
        <TextField>
          <TextField.Label>
            Component Name
            <TextField.Input
              {...nameControl}
              required
              placeholder={'Enter component name'}
            />
          </TextField.Label>
        </TextField>

        {/* DESCRIPTION */}
        <div className="grid w-full gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            {...descriptionControl}
            placeholder={'Type description here'}
            id="description"
          />
        </div>

        {/* TYPE */}
        <div className="flex flex-col space-y-2">
          <Label>Type</Label>
          <Select
            onValueChange={(value) => {
              setValue('type', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={'Select type'} />
            </SelectTrigger>

            <SelectContent position={'popper'}>
              <SelectItem value={'marketing'}>Marketing</SelectItem>
              <SelectItem value={'ecommerce'}>Ecommerce</SelectItem>
              <SelectItem value={'application'}>Application UI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* CATEGORY */}
        <div className="flex flex-col space-y-2">
          <Label>Category</Label>
          <Select
            onValueChange={(value) => {
              setValue('category', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={'Select category'} />
            </SelectTrigger>

            <SelectContent position={'popper'}>
              <ScrollArea className="h-60">
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.value}>
                    {category.name}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>

        {/* PREVIEW URL */}
        <TextField>
          <TextField.Label>
            Preview URL
            <TextField.Input
              {...previewURLControl}
              required
              placeholder={'Enter preview URL'}
              defaultValue={'https://library.codesnaps.io/api/content/'}
            />
          </TextField.Label>
        </TextField>

        {/* IMAGE ALT TEXT */}
        <TextField>
          <TextField.Label>
            Image Alt Text
            <TextField.Input
              {...imageAltControl}
              required
              placeholder={'Enter image alt text'}
            />
          </TextField.Label>
        </TextField>

        {/* LAYOUT PROPERTIES */}
        <div>
          {/* TEXT */}
          <div className="mt-2 grid gap-3 border-b pb-6">
            <Label>Text Alignment</Label>
            {textLayout.map((property) => (
              <div key={property.name}>
                <input
                  id={property.name}
                  value={property.value}
                  type="checkbox"
                  className="text-primary-600 focus:ring-primary-600 h-4 w-4 rounded border-neutral-300"
                  {...textLayoutControl}
                />
                <label
                  htmlFor={property.name}
                  className="ml-2 text-neutral-600 dark:text-neutral-400"
                >
                  {property.name}
                </label>
              </div>
            ))}
          </div>

          {/* VISUAL */}
          <div className="grid gap-3 border-b py-6">
            <Label>Visual Layout</Label>
            {visualLayout.map((property) => (
              <div key={property.name}>
                <input
                  id={property.name}
                  value={property.value}
                  type="checkbox"
                  className="text-primary-600 focus:ring-primary-600 h-4 w-4 rounded border-neutral-300"
                  {...visualLayoutControl}
                />
                <label
                  htmlFor={property.name}
                  className="ml-2 text-neutral-600 dark:text-neutral-400"
                >
                  {property.name}
                </label>
              </div>
            ))}
          </div>

          {/* COLUMNS */}
          <div className="grid gap-3 border-b py-6">
            <Label>Columns </Label>
            {columnLayout.map((property) => (
              <div key={property.name}>
                <input
                  id={property.name}
                  value={property.value}
                  type="checkbox"
                  className="text-primary-600 focus:ring-primary-600 h-4 w-4 rounded border-neutral-300"
                  {...columnLayoutControl}
                />
                <label
                  htmlFor={property.name}
                  className="ml-2 text-neutral-600 dark:text-neutral-400"
                >
                  {property.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* ELEMENTS */}
        <div>
          <Label>Elements</Label>
          <div className="grid gap-3 mt-2 md:grid-cols-2 lg:grid-cols-4">
            {elementsProps.map((property) => (
              <div key={property.name}>
                <input
                  id={property.name}
                  value={property.value}
                  type="checkbox"
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-600"
                  {...elementsControl}
                />
                <label
                  htmlFor={property.name}
                  className="ml-2 text-neutral-600 dark:text-neutral-400"
                >
                  {property.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* CODE */}
        <div>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-900"
              value={activeTab}
              onChange={(e) => changeTab(e.target.value)}
            >
              {tabs.map((tab) => (
                <option key={tab.value} value={tab.value}>
                  {tab.name}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:block">
            <nav
              className="isolate flex divide-x divide-neutral-200 rounded-lg shadow dark:divide-neutral-700"
              aria-label="Tabs"
            >
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.value}
                  className={clsx(
                    'group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium focus:z-10 dark:bg-neutral-900 dark:hover:bg-neutral-800',
                    activeTab === tab.value
                      ? 'text-neutral-900 dark:text-neutral-100'
                      : 'text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-100 dark:text-neutral-400',
                    tab.value === tabs[0].value ? 'rounded-l-lg' : '',
                    tab.value === tabs[tabs.length - 1].value
                      ? 'rounded-r-lg'
                      : '',
                  )}
                  onClick={() => changeTab(tab.value)}
                >
                  <span>{tab.name}</span>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      activeTab === tab.value
                        ? 'bg-primary-500'
                        : 'bg-transparent',
                      'absolute inset-x-0 bottom-0 h-0.5',
                    )}
                  />
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-4 min-h-[600px]">
            {activeTab === 'nextjs' && (
              <Controller
                render={({ field }) => (
                  <CodeMirror
                    value={field.value}
                    onChange={field.onChange}
                    theme={githubDark}
                    extensions={[javascript({ jsx: true })]}
                    height="600px"
                  />
                )}
                name="codeTailwindcssNextjs"
                control={control}
                rules={{ required: true }}
              />
            )}

            {activeTab === 'react' && (
              <Controller
                render={({ field }) => (
                  <CodeMirror
                    value={field.value}
                    onChange={field.onChange}
                    theme={githubDark}
                    extensions={[javascript({ jsx: true })]}
                    height="600px"
                  />
                )}
                name="codeTailwindcssReact"
                control={control}
                rules={{ required: true }}
              />
            )}

            {activeTab === 'animationReact' && (
              <Controller
                render={({ field }) => (
                  <CodeMirror
                    value={field.value}
                    onChange={field.onChange}
                    theme={githubDark}
                    extensions={[javascript({ jsx: true })]}
                    height="600px"
                  />
                )}
                name="codeAnimationReact"
                control={control}
                rules={{ required: false }}
              />
            )}

            {activeTab === 'animationNextjs' && (
              <Controller
                render={({ field }) => (
                  <CodeMirror
                    value={field.value}
                    onChange={field.onChange}
                    theme={githubDark}
                    extensions={[javascript({ jsx: true })]}
                    height="600px"
                  />
                )}
                name="codeAnimationNextjs"
                control={control}
                rules={{ required: false }}
              />
            )}
          </div>
        </div>

        <div>
          <Button className={'w-full md:w-auto mt-4'}>Create Component</Button>
        </div>
      </div>
    </form>
  );
};

/**
 * @description Upload file to Storage
 * @param client
 * @param componentName
 * @param image
 */
async function uploadImage({
  client,
  componentName,
  image,
  setImage,
}: {
  client: SupabaseClient;
  componentName: string;
  image: File;
  setImage: (image: string) => void;
}) {
  const bytes = await image.arrayBuffer();
  const bucket = client.storage.from('components');
  const imageName = getImageName(image.name, componentName);

  const result = await bucket.upload(imageName, bytes, {
    upsert: true,
    contentType: image.type,
  });

  if (!result.error) {
    const publicUrl = bucket.getPublicUrl(imageName).data.publicUrl;
    setImage(publicUrl);
    return publicUrl;
  }

  console.error(result.error);
  throw result.error;
}

function getImageName(fileName: string, componentName: string) {
  const extension = fileName.split('.').pop();
  const timestamp = Date.now();
  const sanitizedComponentName = componentName
    .replace(/\s/g, '_')
    .toLowerCase();
  return `${sanitizedComponentName}-${timestamp}.${extension}`;
}

function getImageFile(value: string | null | FileList) {
  if (!value) {
    return;
  }

  if (typeof value === 'string') {
    return new File([], value);
  }

  return value.item(0) ?? undefined;
}

export default CreateComponentForm;
