declare namespace Cypress {
  interface Chainable {
    getTestData(selector: string): Chainable<JQuery<HTMLElement>>
  }
}

Cypress.Commands.add('getTestData', (selector: string) => {
  return cy.get(`[data-test="${selector}"]`);
}); 