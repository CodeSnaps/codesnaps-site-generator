import { SupabaseClient } from '@supabase/supabase-js';

import { COMPONENTS_TABLE } from '~/lib/db-tables';
import { Database } from '~/database.types';

type Client = SupabaseClient<Database>;

export async function getComponents(
  client: Client,
  search: string,
  page = 1,
  perPage = 20,
) {
  const startOffset = (page - 1) * perPage;
  const endOffset = startOffset + perPage - 1;

  let query = client.from(COMPONENTS_TABLE).select(
    `
        id,
        created_at,
        name,
        description,
        is_published,
        is_free,
        type,
        category,
        preview_url,
        image_src,
        image_alt,
        image_position,
        layout_properties,
        is_interactive,
        elements
    `,
    {
      count: 'exact',
    },
  );

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  const {
    data: components,
    count,
    error,
  } = await query.range(startOffset, endOffset);

  if (error) {
    console.error('Error getting components', error);
    throw error;
  }

  return {
    components,
    count,
  };
}

export async function getComponent(client: Client, uuid: string) {
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
