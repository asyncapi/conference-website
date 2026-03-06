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

    cy.origin('https://www.linkedin.com', () => {
      cy.url().should('include', 'linkedin.com/company/asyncapi');
    });
  });

  it('Twitter(X) should redirect to correct page', () => {
    cy.getTestData('footer-Twitter(X)').invoke('removeAttr', 'target').click();

    cy.origin('https://x.com', () => {
      cy.url().should('include', 'asyncapispec');
    });
  });

  it('YouTube should redirect to correct page', () => {
    cy.getTestData('footer-youtube')
      .should('have.attr', 'href', 'https://www.youtube.com/asyncapi');
  });

  it('Should Contain AsyncAPI Conference Logo', () => {
    cy.getTestData('footer-asyncAPI-logo').should('be.visible');
  });

  describe('Social Media Icons', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Should display social media icons', () => {
      cy.getTestData('social-wrapper').should('exist');
      cy.getTestData('footer-icon-linkedin').should('exist');
      cy.getTestData('footer-icon-github').should('exist');
      cy.getTestData('footer-icon-twitter').should('exist');
      cy.getTestData('footer-icon-youtube').should('exist');
    });

    const socialPlatforms = [
      { dataTest: 'footer-tooltip-linkedin', name: 'LinkedIn' },
      { dataTest: 'footer-tooltip-github', name: 'GitHub' },
      { dataTest: 'footer-tooltip-twitter', name: 'Twitter' },
      { dataTest: 'footer-tooltip-youtube', name: 'YouTube' },
    ];

    socialPlatforms.forEach((platform) => {
      it(`Should display tooltip when hovering over ${platform.name} icon`, () => {
        cy.getTestData(platform.dataTest).invoke(
          'addClass',
          'show-for-test'
        );
        cy.getTestData(platform.dataTest).should(
          'be.visible'
        );
        cy.getTestData(platform.dataTest).should(
          'contain',
          platform.name
        );
      });
    });
  });
});
