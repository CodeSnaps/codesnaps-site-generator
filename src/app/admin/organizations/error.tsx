'use client';

import Alert from '~/core/ui/Alert';
import AppContainer from '~/app/dashboard/[organization]/components/AppContainer';

function OrganizationsAdminPageError() {
  return (
    <AppContainer>
      <Alert type={'error'}>
        <Alert.Heading>Could not load organizations</Alert.Heading>
        <p>
          There was an error loading the organizations. Please check your
          console errors.
        </p>
      </Alert>
    </AppContainer>
  );
}

export default OrganizationsAdminPageError;
