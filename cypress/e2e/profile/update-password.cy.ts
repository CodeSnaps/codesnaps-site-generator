import profilePo from '../../support/profile.po';

describe(`Update Password`, () => {
  const newPassword = `newpassword`;

  function signIn() {
    cy.signIn(`/settings/profile/password`);
  }

  after(() => {
    cy.resetDatabase();
  });

  function fillForm(params: { newPassword: string; repeatPassword: string }) {
    profilePo.$getNewPasswordInput().clear().type(params.newPassword);
    profilePo.$getRepeatNewPasswordInput().clear().type(params.repeatPassword);
    profilePo.$getUpdatePasswordForm().submit();
  }

  describe(`When successfully updating the password`, () => {
    it('should successfully execute the request', () => {
      signIn();
      cy.intercept('PUT', '**auth/v1/user').as('updatePassword');

      fillForm({
        newPassword: newPassword,
        repeatPassword: newPassword,
      });

      cy.wait('@updatePassword').its('response.statusCode').should('eq', 200);

      profilePo.$getNewPasswordInput().invoke('val').should('be.empty');
      profilePo.$getRepeatNewPasswordInput().invoke('val').should('be.empty');
    });
  });
});
