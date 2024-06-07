import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/core/ui/Tooltip';
import { useEditor } from '@craftjs/core';

type SidebarItemProps = {
  hasActiveSub: boolean;
  isFreeComponent: boolean;
  image: string;
  name: string;
  Component: any;
};

const SidebarItem = ({
  hasActiveSub,
  isFreeComponent,
  image,
  name,
  Component,
}: SidebarItemProps) => {
  const { connectors } = useEditor();

  return (
    <Tooltip>
      {hasActiveSub ? (
        <TooltipTrigger asChild>
          <div
            ref={(ref) => {
              connectors.create(
                ref as HTMLElement,
                <Component isBeingDragged={true} />,
              );
            }}
            className="w-full shadow border rounded-md cursor-move"
          >
            <Image
              src={image}
              alt={name}
              width={232}
              height={145}
              className="rounded-md"
            />

            <TooltipContent>{name}</TooltipContent>
          </div>
        </TooltipTrigger>
      ) : isFreeComponent ? (
        <TooltipTrigger asChild>
          <div
            ref={(ref) => {
              connectors.create(
                ref as HTMLElement,
                <Component isBeingDragged={true} />,
              );
            }}
            className="w-full shadow border rounded-md cursor-move"
          >
            <Image
              src={image}
              alt={name}
              width={232}
              height={145}
              className="rounded-md"
            />

            <TooltipContent>{name}</TooltipContent>
          </div>
        </TooltipTrigger>
      ) : (
        <TooltipTrigger asChild>
          <div className="relative w-full shadow border rounded-md cursor-not-allowed">
            <span className="absolute uppercase tracking-wide text-sm z-10 text-white drop-shadow font-bold text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Upgrade your plan
            </span>

            <Image
              src={image}
              alt={name}
              width={232}
              height={145}
              className="rounded-md brightness-50"
            />

            <TooltipContent>{name}</TooltipContent>
          </div>
        </TooltipTrigger>
      )}
    </Tooltip>
  );
};

export default SidebarItem;
