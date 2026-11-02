describe('Gallery page', () => {
  it('should redirect to gallery from the navbar', () => {
    cy.visit('/');
    cy.getTestData('nav-Gallery').click();

    cy.url().should('eq', 'http://localhost:3000/gallery');
  });
});
