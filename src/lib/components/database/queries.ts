import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/database.types';
import { COMPONENTS_TABLE } from '~/lib/db-tables';
import Component from '~/lib/components/types/component';
import SavedComponent from '~/lib/components/types/saved-component';

type Client = SupabaseClient<Database>;

const COMPONENTS_PAGE_SIZE = 30;

interface SearchParams {
  pageIndex?: number;
  perPage?: number;
  free?: string;
  search?: string;
  category?: string;
  interactive?: string;
  layout?: string;
  elements?: string;
}

export function getFreeComponents(client: Client) {
  return client
    .from(COMPONENTS_TABLE)
    .select<string, Component>(
      `
    id,
    name,
    type,
    category,
    preview_url,
    image_src,
    image_alt
    `,
      { count: 'exact' },
    )
    .eq('is_free', true)
    .eq('is_published', true);
}

export async function getAllComponents(
  client: Client,
  searchParams: SearchParams,
) {
  const {
    pageIndex = 1,
    perPage = COMPONENTS_PAGE_SIZE,
    free,
    search,
    category,
    interactive,
    layout,
    elements,
  } = searchParams;

  const startOffset = (pageIndex - 1) * perPage;
  const endOffset = startOffset + perPage - 1;

  let query = client
    .from(COMPONENTS_TABLE)
    .select<string, Component>(
      `
    id,
    name,
    type,
    category,
    is_free,
    preview_url,
    image_src,
    image_alt
    `,
      { count: 'exact' },
    )
    .eq('is_published', true);

  if (search) {
    return query.ilike('name', `%${search}%`).range(startOffset, endOffset);
  }

  if (free) {
    query = query.eq('is_free', true);
  }

  if (category) {
    query = query.eq('category', category);
  }

  if (interactive) {
    query = query.eq('is_interactive', true);
  }

  if (layout) {
    const layoutProperties = layout.split('|');
    query = query.contains('layout_properties', layoutProperties);
  }

  if (elements) {
    const elementsProperties = elements.split('|');
    query = query.contains('elements', elementsProperties);
  }

  return query.range(startOffset, endOffset);
}

export async function getSingleComponent(client: Client, uuid: string) {
  const { data: component, error } = await client
    .from(COMPONENTS_TABLE)
    .select('*')
    .eq('id', uuid)
    .single();

  if (error) {
    console.error('Error getting component', error);
    throw error;
  }

  return component;
}

export async function getSavedComponents(
  client: Client,
  orgId: string,
  pageIndex: number = 1,
  perPage: number = COMPONENTS_PAGE_SIZE,
) {
  const startOffset = (pageIndex - 1) * perPage;
  const endOffset = startOffset + perPage - 1;

  return await client
    .from('saved_components')
    .select<string, SavedComponent>('*', { count: 'exact' })
    .eq('organization_id', orgId)
    .range(startOffset, endOffset);
}
