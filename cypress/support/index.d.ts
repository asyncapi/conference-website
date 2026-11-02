declare namespace Cypress {
  interface Chainable {
    getTestData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    mount: typeof import('cypress/react').mount;
  }
}
