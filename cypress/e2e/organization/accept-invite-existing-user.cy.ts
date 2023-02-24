import authPo from '../../support/auth.po';
import configuration from '~/configuration';
import organizationPageObject from '../../support/organization.po';

describe(`Accept Invite - Existing User`, () => {
  const existingUserEmail = `test2@makerkit.dev`;
  const existingUserInviteCode = '89Mu5Q42DjzIWvyc';
  const password = authPo.getDefaultUserPassword();

  function signIn() {
    const invitePath = `/invite/${existingUserInviteCode}`;

    cy.signIn(invitePath, {
      email: existingUserEmail,
      password,
    });
  }

  describe(`when the user accepts the invite`, () => {
    before(() => {
      signIn();
      authPo.$getAcceptInviteSubmitButton().wait(150).click();
    });

    it('should be redirected to the dashboard', () => {
      cy.url().should('contain', configuration.paths.appHome);
    });
  });

  describe(`when the user visits the members page`, () => {
    before(() => {
      cy.signIn(`/settings/organization/members`, {
        email: existingUserEmail,
        password,
      });

      organizationPageObject.switchToOrganization('IndieCorp');
    });

    it('should add the new member to the members list', () => {
      organizationPageObject
        .$getMemberByEmail(existingUserEmail)
        .should('exist');
    });
  });
});
