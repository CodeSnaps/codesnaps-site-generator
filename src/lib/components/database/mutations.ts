import type { SupabaseClient } from '@supabase/supabase-js';

import { COMPONENTS_TABLE, SAVED_COMPONENTS_TABLE } from '~/lib/db-tables';

import type Component from '~/lib/components/types/component';
import type { Database } from '~/database.types';

type ComponentRow = Database['public']['Tables']['components']['Row'];
type SavedComponentRow =
  Database['public']['Tables']['saved_components']['Row'];

type Client = SupabaseClient<Database>;

/**
 * @name updateComponent
 * @param client
 * @param params
 */
export async function updateComponent(
  client: Client,
  params: {
    id: string;
    data: Partial<Component>;
  },
) {
  const payload: Omit<Partial<ComponentRow>, 'id'> = {
    name: params.data.name,
    description: params.data.description,
    is_published: params.data.is_published,
    is_free: params.data.is_free,
    type: params.data.type,
    category: params.data.category,
    preview_url: params.data.preview_url,
    image_src: params.data.image_src,
    image_alt: params.data.image_alt,
    image_position: params.data.image_position,
    layout_properties: params.data.layout_properties,
    is_interactive: params.data.is_interactive,
    elements: params.data.elements,
    code_tailwindcss_react: params.data.code_tailwindcss_react,
    code_tailwindcss_nextjs: params.data.code_tailwindcss_nextjs,
    code_animation_component: params.data.code_animation_component,
  };

  const { data, error } = await client
    .from(COMPONENTS_TABLE)
    .update(payload)
    .match({ id: params.id })
    .throwOnError();

  if (error) {
    console.error('Error updating component:', error);
  }

  return data;
}

/**
 * @name createComponent
 * @param client
 * @param params
 */
export async function createComponent(
  client: Client,
  params: {
    data: any;
  },
) {
  const { data, error } = await client
    .from(COMPONENTS_TABLE)
    .insert(params.data)
    .throwOnError();

  if (error) {
    console.error('Error creating component:', error);
  }

  return {
    data,
    error,
  };
}

/**
 * @name favoriteComponent
 * @param client
 * @param params
 */
export async function favoriteComponent(
  client: Client,
  organization_id: string,
  component_id: string,
  propData: any,
) {
  const payload = {
    name: propData.name,
    is_free: propData.is_free,
    type: propData.type,
    category: propData.category,
    preview_url: propData.preview_url,
    image_src: propData.image_src,
    image_alt: propData.image_alt,
    image_position: propData.image_position,
    organization_id: organization_id,
    component_id: component_id,
  };

  const { error, status } = await client
    .from(SAVED_COMPONENTS_TABLE)
    .insert(payload)
    .single();

  if (error) {
    console.error('Error creating component:', error);
  }

  return {
    success: status === 201,
    error,
  };
}

/**
 * @name removeFavoriteComponent
 * @param client
 * @param params
 */
export async function removeFavoriteComponent(
  client: Client,
  component_id: string,
  organization_id: string,
) {
  const { error, status } = await client
    .from(SAVED_COMPONENTS_TABLE)
    .delete()
    .eq('component_id', component_id)
    .eq('organization_id', organization_id)
    .single();

  if (error) {
    console.error('Error creating component:', error);
  }

  return {
    success: status === 204,
    error,
  };
}
