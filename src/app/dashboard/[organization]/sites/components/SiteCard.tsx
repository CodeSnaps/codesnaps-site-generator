'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { format } from 'date-fns';

import {
  saveSiteDetails,
  deleteSite,
} from '~/app/dashboard/[organization]/sites/actions.server';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/core/ui/AlertDialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/core/ui/Card';
import { Button } from '~/core/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/core/ui/Dialog';
import Textarea from '~/core/ui/Textarea';
import {
  TextFieldInput,
  TextFieldError,
  TextFieldLabel,
} from '~/core/ui/TextField';

import { PencilIcon } from '@heroicons/react/24/outline';

const formSchema = z.object({
  siteName: z
    .string()
    .min(1, { message: 'Site name is required' })
    .max(100, { message: 'Site name must be under 100 characters' }),
  siteDescription: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(250, { message: 'Description must be under 250 characters' }),
});

type SiteCardProps = {
  id: string;
  organization_id: number;
  page_description: string;
  created_at: Date;
  project_name: string;
};

const SiteCard = (params: SiteCardProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: params.project_name,
      siteDescription: params.page_description,
    },
  });

  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSaving(true);

    const response = await saveSiteDetails({
      siteName: data.siteName,
      siteDescription: data.siteDescription,
      siteId: params.id,
    });

    if (response.success) {
      setSaving(false);
      setOpen(false);
      router.refresh();
    } else {
      setSaving(false);
      console.error('Error saving site details');
    }
  };

  const onDelete = async () => {
    setDeleting(true);

    const response = await deleteSite(params.id);

    if (response.success) {
      setDeleting(false);
      setOpen(false);
      router.refresh();
    } else {
      setDeleting(false);
      console.error('Error deleting site');
    }
  };

  const handleButtonClick = () => {
    setLoading(true);
  };

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card className="flex flex-col justify-between">
        <CardHeader>
          <CardDescription className="mb-2">
            Created at {format(params.created_at, 'dd MMMM yyyy')}
          </CardDescription>

          <div className="flex justify-between">
            <CardTitle>{params.project_name}</CardTitle>
            <DialogTrigger asChild>
              <Button size="icon" variant="secondary">
                <span className="sr-only">Edit</span>
                <PencilIcon className="h-5 w-5" />
              </Button>
            </DialogTrigger>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base text-neutral-700 mt-1 dark:text-neutral-400">
            {params.page_description}
          </p>
        </CardContent>
        <CardFooter>
          {loading ? (
            <Button className="w-full" variant="secondary" loading disabled>
              View Site
            </Button>
          ) : (
            <Button
              className="w-full"
              variant="secondary"
              href={`sites/${params.id}`}
              onClick={() => {
                handleButtonClick();
              }}
            >
              View Site
            </Button>
          )}
        </CardFooter>
      </Card>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Site</DialogTitle>
          <DialogDescription>
            <p className="text-muted-foreground">
              You can edit the site name and description here.
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <TextFieldLabel htmlFor="site-name">Site Name</TextFieldLabel>
            <Controller
              name="siteName"
              control={control}
              render={({ field }) => (
                <TextFieldInput
                  {...field}
                  id="site-name"
                  aria-invalid={errors.siteName ? 'true' : 'false'}
                  aria-describedby="site-name-error"
                />
              )}
            />
            {errors.siteName && (
              <TextFieldError
                error={errors.siteName.message}
                id="site-name-error"
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <TextFieldLabel htmlFor="site-name">
              Site Description
            </TextFieldLabel>
            <Controller
              name="siteDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="site-description"
                  aria-invalid={errors.siteDescription ? 'true' : 'false'}
                  aria-describedby="site-description-error"
                />
              )}
            />
            {errors.siteDescription && (
              <TextFieldError
                error={errors.siteDescription.message}
                id="site-description-error"
              />
            )}
          </div>

          <DialogFooter className="">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={saving}>
                  Delete
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your site and all of its data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel asChild>
                    <Button variant="secondary" disabled={deleting}>
                      Cancel
                    </Button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      variant="destructive"
                      disabled={deleting}
                      loading={deleting}
                      onClick={onDelete}
                    >
                      Delete
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={saving}
              loading={saving}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SiteCard;
