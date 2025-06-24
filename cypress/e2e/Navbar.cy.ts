import navData from '../../config/links.json';
import speakers from '../../config/speakers.json';
import { LinkItem } from '../../types/types';

let venueData = (navData as LinkItem[]).filter((idx) => {
  return idx.title == 'Venue';
});
let resourcesData = (navData as LinkItem[]).filter((idx) => {
  return idx.title == 'Resources Hub';
});

describe('Navbar links', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should redirect to about', () => {
    // Click on the navbar link that you want to test
    cy.getTestData('nav-About').click();

    // Assert that the current URL matches the expected URL
    cy.url().should('eq', 'http://localhost:3000/#about');
    cy.getTestData('about-section').should('be.visible');
  });

  it('should redirect to speakers', () => {
    cy.getTestData('nav-Speakers').click();

    cy.url().should('eq', 'http://localhost:3000/#speakers');
    if (Array.isArray(speakers) && speakers.length > 0) {
      cy.getTestData('sponsor-section').should('be.visible');
    } else {
      cy.log(
        'No speakers or speaker lists found - skipping sponsor section check'
      );
    }
  });

  it('should redirect to sponsors', () => {
    cy.getTestData('nav-Sponsors').click();

    cy.url().should('eq', 'http://localhost:3000/#sponsors');
    cy.getTestData('sponsor-section').should('be.visible');
  });

  it('should redirect to home', () => {
    cy.getTestData('nav-Home').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should redirect to tickets', () => {
    cy.getTestData('nav-Tickets').click();

    cy.url().should('eq', 'http://localhost:3000/#tickets');
  });

  it('should redirect to venues', () => {
    let data = venueData[0]?.subMenu;
    cy.wrap(data).each((val: LinkItem, idx) => {
      cy.getTestData('nav-Venue').trigger('mouseover');
      cy.getTestData(`nav-sub-${val.title}`).click();
      cy.url().should('eq', `http://localhost:3000${val.ref}`);
    });
  });

  it('should redirect to resource hub', () => {
    let data = resourcesData[0]?.subMenu;
    if (data) {
      cy.wrap(data).each((val: LinkItem, idx) => {
        cy.getTestData('nav-Resources Hub').trigger('mouseover');
        cy.wrap(val.ref).should(
          'match',
          /.*(drive\.google\.com|youtube\.com).*/
        );
      });
    }
  });

  // To check for mobile view

  it('should redirect to about mobile view', () => {
    cy.viewport(700, 800);
    cy.getTestData('nav-Hamberger').click();
    // Click on the navbar link that you want to test
    cy.getTestData('nav-About').click();

    // Assert that the current URL matches the expected URL
    cy.url().should('eq', 'http://localhost:3000/#about');
    cy.getTestData('about-section').should('be.visible');
  });

  it('should redirect to speakers mobile view', () => {
    cy.viewport(700, 800);
    cy.getTestData('nav-Hamberger').click();

    cy.getTestData('nav-Speakers').click();

    cy.url().should('eq', 'http://localhost:3000/#speakers');
    if (Array.isArray(speakers) && speakers.length > 0) {
      cy.getTestData('sponsor-section').should('be.visible');
    } else {
      cy.log(
        'No speakers or speaker lists found - skipping sponsor section check'
      );
    }
  });

  it('should redirect to sponsors mobile view', () => {
    cy.viewport(700, 800);
    cy.getTestData('nav-Hamberger').click();

    cy.getTestData('nav-Sponsors').click();

    cy.url().should('eq', 'http://localhost:3000/#sponsors');
    cy.getTestData('sponsor-section').should('be.visible');
  });

  it('should redirect to home mobile view', () => {
    cy.viewport(700, 800);
    cy.getTestData('nav-Hamberger').click();

    cy.getTestData('nav-Home').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should redirect to tickets mobile view', () => {
    cy.viewport(700, 800);
    cy.getTestData('nav-Hamberger').click();

    cy.getTestData('nav-Tickets').click();

    cy.url().should('eq', 'http://localhost:3000/#tickets');
  });

  it('should redirect to venues mobile view', () => {
    cy.viewport(700, 800);

    let data = venueData[0].subMenu;
    cy.wrap(data).each((val: LinkItem, idx) => {
      cy.getTestData('nav-Hamberger').click();
      cy.getTestData('nav-Venue').click();
      cy.getTestData(`nav-sub-${val.title}`).click();
      cy.url().should('eq', `http://localhost:3000${val.ref}`);
    });
  });

  it('should redirect to resource hub mobile view', () => {
    cy.viewport(700, 800);
    cy.getTestData('nav-Hamberger').click();

    let data = resourcesData[0]?.subMenu;
    if (data) {
      cy.wrap(data).each((val: LinkItem, idx) => {
        cy.wrap(val.ref).should(
          'match',
          /.*(drive\.google\.com|youtube\.com).*/
        );
      });
    }
  });
});
