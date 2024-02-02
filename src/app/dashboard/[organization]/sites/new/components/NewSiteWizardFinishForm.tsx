import LoadingOverlay from '~/core/ui/LoadingOverlay';
import Trans from '~/core/ui/Trans';

export function NewSiteWizardFinishForm() {
  return (
    <div className="flex flex-col space-y-4">
      <CreatingPostLoadingOverlay />
    </div>
  );
}

function CreatingPostLoadingOverlay() {
  return (
    <LoadingOverlay fullPage={false}>
      <Trans i18nKey={'sites:generatingSite'} />
    </LoadingOverlay>
  );
}
