declare namespace Cypress {
  interface Chainable {
    getTestData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
  }
}
