import path from 'path';
import speakers from '../../config/speakers.json';

describe('Landing Page Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Contains correct heading', () => {
    const Year = new Date().getFullYear();
    cy.getTestData('landing-heading').contains(
      new RegExp(`AsyncAPI Conference ${Year}`)
    );
  });

  it('Should contain About Section', () => {
    cy.getTestData('about-section').should('be.visible');
  });

  it('Verify the downloaded file', () => {
    const Year = new Date().getFullYear();
    cy.getTestData('prospectus-download').should('be.visible');
    cy.getTestData('prospectus-download').click();

    const downloadsFolder = Cypress.config('downloadsFolder') as string;
    cy.readFile(path.join(downloadsFolder, `conf ${Year}.pdf`)).should('exist');
  });

  it('Should contain Speakers section', () => {
    if (Array.isArray(speakers) && speakers.length > 0) {
      cy.getTestData('sponsor-section').should('be.visible');
    } else {
      cy.log(
        'No speakers or speaker lists found - skipping sponsor section check'
      );
    }
  });

  it('Should contain Ticket section', () => {
    cy.getTestData('ticket-section').should('be.visible');
  });

  it('Should contain Sponsor component', () => {
    cy.getTestData('sponsor-section').should('be.visible');
  });

  //   it("Should contain logos in Sponsor component", () => {
  //     const eventSponsors = cities[0].sponsors.eventSponsors;
  //     const financialSponsors = cities[0].sponsors.financialSponsors;

  //     eventSponsors.forEach((sponsor) => {
  //       cy.getTestData("sponsor-section")
  //         .find(`img[src="${sponsor.image}"]`)
  //         .should("be.visible");
  //       cy.get(`a[href="${sponsor.websiteUrl}"]`).should("exist");
  //     });

  //     financialSponsors.forEach((sponsor) => {
  //       cy.getTestData("sponsor-section")
  //         .find(`img[src="${sponsor.image}"]`)
  //         .should("be.visible");
  //       cy.get(`a[href="${sponsor.websiteUrl}"]`).should("exist");
  //     });
  //   });

  it('Subscribe Button is functional', () => {
    cy.getTestData('subscribe-button').invoke('removeAttr', 'target').click();

    cy.origin('https://www.asyncapi.com/newsletter', () => {
      cy.url().should(
        'match',
        /https:\/\/www\.asyncapi\.com\/[a-z]{2}\/newsletter/
      );
    });
  });
});
