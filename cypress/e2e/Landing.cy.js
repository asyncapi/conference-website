import path from "path";
import cities from "../../config/city-lists.json";

describe("Landing Page Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Contains correct heading", () => {
    const Year = new Date().getFullYear();
    cy.getTestData("landing-heading").contains(new RegExp(`AsyncAPI Conf On Tour (${Year}|${Year-1})`));
  });

  it("Should contain About Section", () => {
    cy.getTestData("about-section").should("be.visible");
  });

  it("Verify the downloaded file", () => {
    const Year = new Date().getFullYear();
    cy.getTestData("prospectus-download").should("be.visible");
    cy.getTestData("prospectus-download").click();

    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.readFile(path.join(downloadsFolder, `conf ${Year}.pdf`)).should("exist");
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
    const eventSponsors = cities[0].sponsors.eventSponsors;
    const financialSponsors = cities[0].sponsors.financialSponsors;

    eventSponsors.forEach((sponsor) => {
      cy.getTestData("sponsor-section")
        .find(`img[src="${sponsor.image}"]`)
        .should("be.visible");
      cy.get(`a[href="${sponsor.websiteUrl}"]`).should("exist");
    });

    financialSponsors.forEach((sponsor) => {
      cy.getTestData("sponsor-section")
        .find(`img[src="${sponsor.image}"]`)
        .should("be.visible");
      cy.get(`a[href="${sponsor.websiteUrl}"]`).should("exist");
    });
  });

  it("Subscribe Button is functional", () => {
    cy.getTestData("subscribe-button").invoke("removeAttr", "target").click();

    cy.origin("https://www.asyncapi.com/newsletter", () => {
      cy.url().should("match", /https:\/\/www\.asyncapi\.com\/[a-z]{2}\/newsletter/);
    });
  });
});
