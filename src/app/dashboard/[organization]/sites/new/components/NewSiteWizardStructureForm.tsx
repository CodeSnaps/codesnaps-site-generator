import { useFieldArray, useForm, Controller } from 'react-hook-form';

import { StructureData } from '~/app/dashboard/[organization]/sites/new/components/NewSiteWizard';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/core/ui/Card';
import Heading from '~/core/ui/Heading';
import SubHeading from '~/core/ui/SubHeading';
import Textarea from '~/core/ui/Textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';
import { ScrollArea } from '~/core/ui/ScrollArea';
import { Tooltip, TooltipTrigger, TooltipContent } from '~/core/ui/Tooltip';
import Trans from '~/core/ui/Trans';
import {
  PreviousStepButton,
  NextStepButton,
} from '~/app/dashboard/[organization]/sites/new/components/NewSiteWizard';

import { XMarkIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

export function NewSiteWizardStructureForm({
  form,
  onSubmit,
}: {
  form: ReturnType<typeof useForm<StructureData>>;
  onSubmit: (data: StructureData) => void;
}) {
  const fieldArray = useFieldArray({
    control: form.control,
    name: 'structure',
  });

  return (
    <form
      className="pb-10 max-w-[1600px] mx-auto w-full"
      onSubmit={form.handleSubmit(async (values) => {
        onSubmit(values);
      })}
    >
      <Heading type={3}>
        <Trans i18nKey="sites:structureStepTitle" />
      </Heading>

      <div className="grid xl:grid-cols-2 mt-10 xl:mt-0 w-full">
        <div className="flex flex-col gap-4 justify-center">
          <Heading type={2}>
            <Trans i18nKey="sites:structureHeading" />
          </Heading>

          <SubHeading as={'h3'}>
            <span>
              <Trans i18nKey="sites:structureSubHeadingSpanOne" />
            </span>
            <span>
              <Trans i18nKey="sites:structureSubHeadingSpanTwo" />
            </span>
          </SubHeading>

          <div className="hidden lg:flex space-x-2 mt-6">
            <PreviousStepButton />
            <NextStepButton />
          </div>
        </div>

        <ScrollArea className="h-[800px] w-full rounded-md border p-6 mt-10 xl:mt-0">
          <div className="flex flex-col space-y-6">
            {fieldArray.fields.map((field, index) => {
              const contentControl = form.register(
                `structure.${index}.content`,
                {
                  required: true,
                },
              );

              return (
                <Card key={field.id}>
                  <CardHeader>
                    <CardTitle>{field.component}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Controller
                      defaultValue={field.content}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          className="bg-transparent"
                          placeholder="Add a description here"
                          minLength={1}
                          maxLength={250}
                        />
                      )}
                      control={form.control}
                      {...contentControl}
                    />
                  </CardContent>
                  <CardFooter>
                    <ItemActions
                      onAdd={(name) => {
                        fieldArray.insert(
                          index + 1,
                          {
                            component: name,
                            content: '',
                          },
                          {
                            shouldFocus: true,
                          },
                        );
                      }}
                      onRemove={() => fieldArray.remove(index)}
                    />
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </ScrollArea>

        <div className="flex space-x-2 lg:hidden mt-10">
          <PreviousStepButton />
          <NextStepButton />
        </div>
      </div>
    </form>
  );
}

function ItemActions(props: {
  onRemove: () => void;
  onAdd: (component: string) => void;
}) {
  const components = [
    'Blog',
    'Contact',
    'CTA',
    'FAQ',
    'Feature',
    'Footer',
    'Gallery',
    'Heading',
    'Hero',
    'Logos',
    'Navbar',
    'Pricing',
    'Team',
    'Testimonial',
  ];

  return (
    <div className="w-full flex justify-end">
      <div className="flex space-x-2.5 items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <button type={'button'} onClick={props.onRemove}>
              <XMarkIcon className={'w-5'} />
            </button>
          </TooltipTrigger>

          <TooltipContent>
            <Trans i18nKey="sites:structureRemoveSectionTooltip" />
          </TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Tooltip>
              <TooltipTrigger asChild>
                <PlusCircleIcon className={'w-5'} />
              </TooltipTrigger>

              <TooltipContent>
                <Trans i18nKey="sites:structureAddSectionTooltip" />
              </TooltipContent>
            </Tooltip>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-44">
            {components.map((component) => (
              <DropdownMenuItem key={component}>
                <button type={'button'} onClick={() => props.onAdd(component)}>
                  {component}
                </button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
