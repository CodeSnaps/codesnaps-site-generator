// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import authPo from './auth.po';

export function registerCypressCommands() {
  Cypress.Commands.add('cyGet', (name: string) => {
    return cy.get(createCySelector(name));
  });

  Cypress.Commands.add(
    'signIn',
    (redirectPath = '/', credentials = authPo.getDefaultUserCredentials()) => {
      cy.session(
        [redirectPath, credentials.email, credentials.password, Math.random()],
        () => {
          cy.log(
            `Signing in programmatically and redirecting to ${redirectPath} ...`,
          );

          return authPo.signInProgrammatically(credentials);
        },
        {
          validate: () =>
            authPo.validate().then((user) => {
              if (!user) {
                throw new Error('User is not authenticated');
              }
            }),
        },
      );

      // visit page
      cy.visit(redirectPath);

      // let the page hydrate before continuing
      cy.wait(1000);
    },
  );

  Cypress.Commands.add(`clearStorage`, () => {
    cy.clearCookies();
    localStorage.clear();
    sessionStorage.clear();
  });

  Cypress.Commands.add(`resetDatabase`, () => {
    cy.task(`resetDatabase`);
  });

  Cypress.Commands.add(`signOutSession`, () => {
    cy.request(`POST`, `/auth/sign-out`);
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
    const isResizeObserverLoopErr = resizeObserverLoopErrRe.test(err.message);
    const isNextRedirect = err.message.includes('NEXT_REDIRECT');
    const skipErrs = [isResizeObserverLoopErr, isNextRedirect];
    const shouldSkipErr = skipErrs.some(Boolean);

    if (shouldSkipErr) {
      return false;
    }
  });
}

export function createCySelector(name: string) {
  return `[data-cy="${name}"]`;
}
