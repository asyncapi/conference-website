import { agenda, cities } from '../../config/conference-data';
import { City } from '../../types/types';
import { resolveCfpUrl } from '../../utils/pretalx';

const monthIndexByName: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function isCfpDeadlinePassed(cfpDate: string): boolean {
  if (!cfpDate || cfpDate.toLowerCase() === 'not announced yet') {
    return false;
  }

  const match = cfpDate.match(/^(\d{1,2})\s+([a-zA-Z]+),?\s+(\d{4})$/);

  if (!match) {
    return false;
  }

  const month = monthIndexByName[match[2].toLowerCase()];

  if (month === undefined) {
    return false;
  }

  const deadline = new Date(Number(match[3]), month, Number(match[1]), 23, 59);

  return Date.now() > deadline.getTime();
}

it('should render guideline if cfp is open, and agenda otherwise', () => {
  cy.wrap(cities).each((city: City) => {
    cy.visit(`/venue/${encodeURIComponent(city.name)}`);

    cy.getTestData(`venue-${city.name}`).then((val) => {
      const hasAgenda = agenda.some((item) => item.city === city.name);

      if (hasAgenda) {
        cy.getTestData('agenda-com').should('be.visible');
      } else if (resolveCfpUrl(city.cfp) && !isCfpDeadlinePassed(city.cfpDate)) {
        cy.getTestData('guideline-com').should('be.visible');
      } else {
        cy.getTestData('agenda-com').should('be.visible');
      }
    });
  });
});

// disbale this test file for now

// it("Should contain logos in Sponsor component", () => {
//     const eventSponsors = cities[0].sponsors.eventSponsors;

//     // const financialSponsor = cities[0].sponsors.financialSponsors;

//     cy.wrap(cities).each((city) => {
//         cy.visit(`http://localhost:3000/venue/${city.name}`);

//         cy.getTestData("sponsor-section").should("exist");

//         eventSponsors.forEach((sponsor) => {
//             cy.getTestData('sponsor-section')
//             .find(`img[src="${sponsor.image}"]`)
//             .should('be.visible');
//             cy.get(`a[href="${sponsor.websiteUrl}"]`).should('exist');
//         });

//         // financialSponsor.forEach((sponsor) => {
//         //     cy.getTestData('sponsor-section')
//         //     .find(`img[src="${sponsor.image}"]`)
//         //     .should('be.visible');
//         //     cy.get(`a[href="${sponsor.websiteUrl}"]`).should('exist');
//         // });
//     })
// });
