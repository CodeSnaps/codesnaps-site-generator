import organizationPageObject from '../../support/organization.po';
import authPo from '../../support/auth.po';

describe(`Accept Invite - New User`, () => {
  const nonExistingUserEmail = `user-invite-email-pwd@makerkit.dev`;
  const nonExistingUserInviteCode = 'yB0kEPZCljLIsg4a';

  describe(`After accepting the invite`, () => {
    it('should have removed the new member from the invited list', () => {
      visitInvitePage(nonExistingUserInviteCode);

      // and then, sign user up
      authPo.signUpWithEmailAndPassword(
        nonExistingUserEmail,
        authPo.getDefaultUserPassword()
      );

      cy.wait(1000);

      cy.visit(`/settings/organization/members`);

      organizationPageObject
        .$getInvitedMemberByEmail(nonExistingUserEmail)
        .should('not.exist');

      organizationPageObject
        .$getMemberByEmail(nonExistingUserEmail)
        .should('exist');
    });
  });
});

function visitInvitePage(code: string) {
  const url = `/invite/${code}`;

  cy.visit(url);
}
