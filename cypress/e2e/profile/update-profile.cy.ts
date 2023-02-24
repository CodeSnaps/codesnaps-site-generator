import profilePo from '../../support/profile.po';

describe(`Update Profile`, () => {
  describe(`When updating the user Display name`, () => {
    const newDisplayName = `Makerkit Guy`;

    it('should execute a request to update the profile', () => {
      cy.signIn(`/settings/profile`);

      cy.intercept('PATCH', '/rest/v1/users**').as('updateProfile');

      // update display name
      profilePo.$getDisplayNameInput().clear().type(newDisplayName);
      profilePo.$getUpdateProfileForm().submit();

      // wait for completion to ensure the request succeeds
      cy.wait('@updateProfile');
    });

    it('should store the new profile name', () => {
      cy.signIn(`/settings/profile`);

      profilePo
        .$getDisplayNameInput()
        .then(($el) => $el.val())
        .should('equal', newDisplayName);
    });
  });
});
