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
    cy.getTestData('close-button').click();
    cy.wait(350);
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
    cy.getTestData('close-button').click();
    cy.wait(350);
    cy.getTestData('footer-Github').invoke('removeAttr', 'target').click();

    cy.origin('https://github.com/asyncapi', () => {
      cy.url().should('eq', 'https://github.com/asyncapi');
    });
  });

  it('Linkedin should redirect to correct page', () => {
    cy.getTestData('close-button').click();
    cy.wait(350);
    cy.getTestData('footer-Linkedin').invoke('removeAttr', 'target').click();

    cy.origin('https://www.linkedin.com', () => {
      cy.url().should('include', 'linkedin.com/company/asyncapi');
    });
  });

  it('Twitter(X) should redirect to correct page', () => {
    cy.getTestData('close-button').click();
    cy.wait(350);
    cy.getTestData('footer-Twitter(X)').invoke('removeAttr', 'target').click();

    cy.origin('https://x.com', () => {
      cy.url().should('include', 'asyncapispec');
    });
  });

  it('Should Contain AsyncAPI Conference Logo', () => {
    cy.getTestData('footer-asyncAPI-logo').should('be.visible');
  });

  describe('Social Media Icons', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Should display social media icons', () => {
      cy.get('.social-wrapper').should('exist');
      cy.get('.social-wrapper .icon').should('have.length.at.least', 4);
    });

    const socialPlatforms = [
      { class: 'linkedin', name: 'LinkedIn' },
      { class: 'github', name: 'GitHub' },
      { class: 'twitter', name: 'Twitter' },
      { class: 'youtube', name: 'YouTube' },
    ];

    socialPlatforms.forEach((platform) => {
      it(`Should display tooltip when hovering over ${platform.name} icon`, () => {
        cy.get(`.social-wrapper .${platform.class} .tooltip`).invoke(
          'addClass',
          'show-for-test'
        );
        cy.get(`.social-wrapper .${platform.class} .tooltip`).should(
          'be.visible'
        );
        cy.get(`.social-wrapper .${platform.class} .tooltip`).should(
          'contain',
          platform.name
        );
      });
    });
  });
});
