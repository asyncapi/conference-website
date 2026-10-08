// Photos come from Cloudinary at build time. Without Cloudinary credentials
// (for example in CI) the page renders its empty state, so the photo checks
// run only when photos are present.
const withPhotos = (callback: () => void): void => {
  cy.get('body').then(($body) => {
    if ($body.find('[data-test="gallery-photo"]').length === 0) {
      cy.getTestData('gallery-empty').should('be.visible');
      cy.log('No gallery photos found - skipping photo checks');
      return;
    }

    callback();
  });
};

describe('Gallery page', () => {
  it('should redirect to gallery from the navbar', () => {
    cy.visit('/');
    cy.getTestData('nav-Gallery').click();

    cy.url().should('eq', 'http://localhost:3000/gallery');
  });

  it('should render photos from Cloudinary', () => {
    cy.visit('/gallery');

    withPhotos(() => {
      cy.getTestData('gallery-photo')
        .should('have.length.at.most', 24)
        .first()
        .find('img')
        .should('have.attr', 'src')
        .and('include', 'res.cloudinary.com/');
    });
  });

  it('should open and close the photo viewer', () => {
    cy.visit('/gallery');

    withPhotos(() => {
      cy.getTestData('gallery-photo').first().click();
      cy.getTestData('gallery-lightbox').should('be.visible');
      cy.getTestData('gallery-lightbox-image').should('be.visible');

      cy.get('body').type('{esc}');
      cy.getTestData('gallery-lightbox').should('not.exist');
    });
  });
});
