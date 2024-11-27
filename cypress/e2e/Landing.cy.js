import path from "path";
describe("Landing Page Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Contains correct heading", () => {
    const Year = new Date().getFullYear();
    cy.getTestData("landing-heading").contains(`AsyncAPI Conf On Tour ${Year}`);
  });

  it("Should contain About Section", () => {
    cy.getTestData("about-section").should("be.visible");
  });

  it("Verify the downloaded file", () => {
    cy.getTestData("prospectus-download").should("be.visible");
    cy.getTestData("prospectus-download").click();

    const Year = new Date().getFullYear();
    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.readFile(path.join(downloadsFolder, `conf ${Year}.pdf`));
  });

  it("Should contain Speakers section", () => {
    cy.getTestData("speakers-section").should("be.visible");
  });

  it("Should contain Ticket section", () => {
    cy.getTestData("ticket-section").should("be.visible");
  });

  it("Should contain Sponsor component", () => {
    cy.getTestData("sponsor-section").should("be.visible");
  });

  it("Should contain logos in Sponsor component", () => {
    const eventSponsors = [
      { image: '/img/apidays.png', websiteUrl: 'https://www.apidays.global/' },
    ];
    
    const financialSponsor = [
      { image: '/img/graviteeio.svg', websiteUrl: 'https://www.gravitee.io/' },
      { image: '/img/postman.png', websiteUrl: 'https://www.postman.com/' },
    ];

    eventSponsors.forEach((sponsor) => {
      cy.getTestData('sponsor-section')
        .find(`img[src="${sponsor.image}"]`)
        .should('be.visible');
      cy.get(`a[href="${sponsor.websiteUrl}"]`).should('exist');
    });

    financialSponsor.forEach((sponsor) => {
      cy.getTestData('sponsor-section')
        .find(`img[src="${sponsor.image}"]`)
        .should('be.visible');
      cy.get(`a[href="${sponsor.websiteUrl}"]`).should('exist');
    });
  });

  it("Subscribe Button is functional", () => {
    cy.getTestData("subscribe-button").invoke("removeAttr", "target").click();

    cy.origin("https://www.asyncapi.com/newsletter", () => {
      cy.url().should("eq", "https://www.asyncapi.com/newsletter");
    });
  });
});
