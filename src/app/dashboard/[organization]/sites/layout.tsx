import Trans from '~/core/ui/Trans';

function SitesLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div>
      <div className="absolute z-[10000] block h-screen w-screen bg-black/30 backdrop-blur-sm lg:hidden">
        <div className="flex h-full flex-col items-center justify-center">
          <Trans i18nKey="sites:desktopViewSupportLayout" />
        </div>
      </div>

      {children}
    </div>
  );
}

export default SitesLayout;
