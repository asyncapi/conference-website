describe('Footer links', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Footer Should be visible', () => {
    cy.getTestData('footer').should('be.visible');
  });

  it('Footer Should contain Code of Conduct', () => {
    cy.getTestData('footer').contains('Code of Conduct');
  });

  it('Code of Conduct should redirect to the correct page', () => {
    cy.getTestData('code-of-conduct').invoke('removeAttr', 'target').click();

    cy.origin(
      'https://github.com/asyncapi/community/blob/master/CODE_OF_CONDUCT.md',
      () => {
        cy.url().should(
          'eq',
          'https://github.com/asyncapi/community/blob/master/CODE_OF_CONDUCT.md'
        );
      }
    );
  });

  it('Github should redirect to correct page', () => {
    cy.getTestData('footer-Github').invoke('removeAttr', 'target').click();

    cy.origin('https://github.com/asyncapi', () => {
      cy.url().should('eq', 'https://github.com/asyncapi');
    });
  });

  it('Linkedin should redirect to correct page', () => {
    cy.getTestData('footer-Linkedin').invoke('removeAttr', 'target').click();

    cy.origin('https://www.linkedin.com/company/asyncapi/', () => {
      cy.url().should('eq', 'https://www.linkedin.com/company/asyncapi/');
    });
  });

  it('Twitter(X) should redirect to correct page', () => {
    cy.getTestData('footer-Twitter(X)').invoke('removeAttr', 'target').click();

    cy.origin('https://x.com/asyncapispec', () => {
      cy.url().should('match', /.*asyncapispec.*/);
    });
  });

  it('Should Contain AsycAPI Conference Logo', () => {
    cy.getTestData('footer-asyncAPI-logo').should('be.visible');
  });
});
