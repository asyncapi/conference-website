describe("Footer", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be visible", () => {
    cy.get('footer').should("be.visible");
  });

  it("should contain AsyncAPI logo", () => {
    cy.get('img[alt="AsyncAPI Logo"]').should("be.visible");
  });

  it("should contain the correct description text", () => {
    cy.get('footer').contains("A Global Gathering for API Experts, Architects, and Enthusiasts");
  });

  it("should have working social media links", () => {
    const socialLinks = [
      { 
        name: 'Twitter', 
        testId: '[href="https://x.com/asyncapispec"]',
        url: 'https://x.com/asyncapispec'
      },
      { 
        name: 'GitHub', 
        testId: '[href="https://github.com/asyncapi"]',
        url: 'https://github.com/asyncapi'
      },
      { 
        name: 'LinkedIn', 
        testId: '[href="https://linkedin.com/company/asyncapi"]',
        url: 'https://linkedin.com/company/asyncapi'
      },
      { 
        name: 'YouTube', 
        testId: '[href="https://youtube.com/asyncapi"]',
        url: 'https://youtube.com/asyncapi'
      },
      { 
        name: 'Slack', 
        testId: '[href="https://asyncapi.com/slack-invite"]',
        url: 'https://asyncapi.com/slack-invite'
      },
      { 
        name: 'Twitch', 
        testId: '[href="https://twitch.tv/asyncapi"]',
        url: 'https://twitch.tv/asyncapi'
      }
    ];

    socialLinks.forEach((link) => {
      cy.get(`footer ${link.testId}`)
        .should('have.attr', 'href', link.url)
        .and('have.attr', 'target', '_blank')
        .and('have.attr', 'rel', 'noopener noreferrer');
    });
  });

  it("should have a working subscription link", () => {
    cy.get('footer a[href="https://www.asyncapi.com/newsletter"]')
      .should('exist')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noreferrer');
  });

  it("should contain community attribution", () => {
    cy.get('footer').contains("Made with ❤️ by the AsyncAPI Community");
  });

  it("should have a working Code of Conduct link", () => {
    cy.get('footer a[href="https://github.com/asyncapi/community/blob/master/CODE_OF_CONDUCT.md"]')
      .should('exist')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer')
      .and('contain', 'Code of Conduct');
  });

  it("should display the rotating greeting text", () => {
    cy.get('footer').contains(/Hello|Hola|नमस्ते|Bonjour|Hallo|こんにちは/);
  });
});
