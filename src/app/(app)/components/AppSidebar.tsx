import React, { useContext } from 'react';

import Trans from '~/core/ui/Trans';
import classNames from 'classnames';
import { cva } from 'cva';

import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';

import Logo from '~/core/ui/Logo';
import LogoMini from '~/core/ui/Logo/LogoMini';
import IconButton from '~/core/ui/IconButton';
import { TooltipContent, Tooltip, TooltipTrigger } from '~/core/ui/Tooltip';

import configuration from '~/configuration';
import SidebarContext from '~/lib/contexts/sidebar';
import AppSidebarNavigation from './AppSidebarNavigation';

const AppSidebar: React.FC = () => {
  const { collapsed, setCollapsed } = useContext(SidebarContext);

  const className = getClassNameBuilder()({
    collapsed,
  });

  return (
    <div className={className}>
      <div className={'flex w-full flex-col space-y-7 px-4'}>
        <AppSidebarHeader collapsed={collapsed} />
        <AppSidebarNavigation collapsed={collapsed} />
      </div>

      <AppSidebarFooterMenu collapsed={collapsed} setCollapsed={setCollapsed} />
    </div>
  );
};

function AppSidebarHeader({
  collapsed,
}: React.PropsWithChildren<{ collapsed: boolean }>) {
  const logoHref = configuration.paths.appHome;

  return (
    <div className={'flex px-2.5 py-1'}>
      {collapsed ? <LogoMini href={logoHref} /> : <Logo href={logoHref} />}
    </div>
  );
}

function AppSidebarFooterMenu(
  props: React.PropsWithChildren<{
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
  }>
) {
  return (
    <div
      className={classNames(`absolute bottom-8 w-full`, {
        'px-6': !props.collapsed,
        'flex justify-center px-2': props.collapsed,
      })}
    >
      <div
        className={
          'flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
        }
      >
        <CollapsibleButton
          collapsed={props.collapsed}
          onClick={props.setCollapsed}
        />
      </div>
    </div>
  );
}

function CollapsibleButton(
  props: React.PropsWithChildren<{
    collapsed: boolean;
    onClick: (collapsed: boolean) => void;
  }>
) {
  if (props.collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger>
          <IconButton
            as={'div'}
            onClick={() => props.onClick(!props.collapsed)}
          >
            <ArrowRightCircleIcon className={'h-6'} />
          </IconButton>
        </TooltipTrigger>

        <TooltipContent>
          <Trans i18nKey={'common:expandSidebar'} />
        </TooltipContent>
      </Tooltip>
    );
  }

  const className = classNames({
    '[&>span]:hidden justify-center': props.collapsed,
  });

  return (
    <div className={className}>
      <button
        className={'flex items-center space-x-2 bg-transparent'}
        onClick={() => props.onClick(!props.collapsed)}
      >
        <ArrowLeftCircleIcon className={'h-6'} />

        <span>
          <Trans i18nKey={'common:collapseSidebar'} />
        </span>
      </button>
    </div>
  );
}

export default AppSidebar;

function getClassNameBuilder() {
  return cva(
    [
      'relative flex hidden h-screen flex-row justify-center border-r border-gray-100 py-4 dark:border-black-300 dark:bg-black-500 lg:flex',
    ],
    {
      variants: {
        collapsed: {
          true: `w-[5rem]`,
          false: `w-2/12 max-w-xs sm:min-w-[12rem] lg:min-w-[17rem]`,
        },
      },
    }
  );
}
