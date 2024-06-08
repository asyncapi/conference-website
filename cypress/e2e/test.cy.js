describe('Landing Page Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Contains correct heading', () => {
    const Year = new Date().getFullYear();
    cy.getTestData("landing-heading").contains(`AsyncAPI Conf On Tour ${Year}`);
  })

  it("Subscribe Button is functional", () => {
    cy.getTestData("subscribe-button").invoke('removeAttr', 'target').click()
  
    cy.origin('https://www.asyncapi.com/newsletter', () => {
      cy.url().should('eq', 'https://www.asyncapi.com/newsletter')
    })
  })

  it("Should contain Sponsor component", () => {
    cy.getTestData("sponsor-component").should('be.visible')
  })
})