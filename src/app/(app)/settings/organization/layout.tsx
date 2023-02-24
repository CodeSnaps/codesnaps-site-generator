import OrganizationSettingsTabs from '~/app/(app)/settings/organization/components/OrganizationSettingsTabs';
import SettingsContentContainer from '~/app/(app)/settings/components/SettingsContentContainer';

function OrganizationSettingsLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div>
        <OrganizationSettingsTabs />
      </div>

      <SettingsContentContainer>{children}</SettingsContentContainer>
    </>
  );
}

export default OrganizationSettingsLayout;
