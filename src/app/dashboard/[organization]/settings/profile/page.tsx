import SettingsTile from '~/app/dashboard/[organization]/settings/components/SettingsTile';
import UpdateProfileFormContainer from '~/app/dashboard/[organization]/settings/profile/components/UpdateProfileFormContainer';
import Trans from '~/core/ui/Trans';
import { withI18n } from '~/i18n/with-i18n';

export const metadata = {
  title: 'Profile Settings',
};

const ProfileDetailsPage = () => {
  return (
    <SettingsTile
      heading={<Trans i18nKey={'profile:generalTab'} />}
      subHeading={<Trans i18nKey={'profile:generalTabSubheading'} />}
    >
      <UpdateProfileFormContainer />
    </SettingsTile>
  );
};

export default withI18n(ProfileDetailsPage);
