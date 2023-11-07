import useSWRMutation from 'swr/mutation';
import type Component from '~/lib/components/types/component';
import useSupabase from '~/core/hooks/use-supabase';
import { updateComponent } from '~/lib/components/database/mutations';
import useUserId from '~/core/hooks/use-user-id';

/**
 * @name useUpdateComponentMutation
 * @description Hook to update a component's information
 */
function useUpdateComponentMutation() {
  const client = useSupabase();
  const userId = useUserId();
  const key = ['components', userId];

  return useSWRMutation(
    key,
    (_, { arg: component }: { arg: WithId<Partial<Component>> }) => {
      return updateComponent(client, {
        data: component,
        id: component.id,
      });
    },
  );
}

export default useUpdateComponentMutation;
