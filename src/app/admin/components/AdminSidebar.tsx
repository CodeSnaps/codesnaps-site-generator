'use client';

import {
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  RectangleGroupIcon,
} from '@heroicons/react/24/outline';
import Sidebar, { SidebarItem } from '~/core/ui/Sidebar';

function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarItem
        end
        path={'/admin'}
        Icon={() => <HomeIcon className={'h-6'} />}
      >
        Admin
      </SidebarItem>

      <SidebarItem
        path={'/admin/users'}
        Icon={() => <UserIcon className={'h-6'} />}
      >
        Users
      </SidebarItem>

      <SidebarItem
        path={'/admin/organizations'}
        Icon={() => <UserGroupIcon className={'h-6'} />}
      >
        Organizations
      </SidebarItem>

      <SidebarItem
        path={'/admin/ui-kit'}
        Icon={() => <RectangleGroupIcon className={'h-6'} />}
      >
        Components
      </SidebarItem>
    </Sidebar>
  );
}

export default AdminSidebar;
