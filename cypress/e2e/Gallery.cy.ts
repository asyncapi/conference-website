import galleryManifest from '../../config/gallery.json';
import { GalleryManifest } from '../../types/types';

const manifest = galleryManifest as GalleryManifest;
const photoCount = manifest.albums.reduce(
  (total, album) => total + album.photos.length,
  0
);
const hasPhotos = Boolean(manifest.cloudName) && photoCount > 0;

describe('Gallery page', () => {
  it('should redirect to gallery from the navbar', () => {
    cy.visit('/');
    cy.getTestData('nav-Gallery').click();

    cy.url().should('eq', 'http://localhost:3000/gallery');
  });

  it('should link to the full photo archive', () => {
    cy.visit('/gallery');

    cy.getTestData('gallery-archive-link')
      .should('have.attr', 'href')
      .and('match', /drive\.google\.com/);
  });

  it('should render photos from the manifest', () => {
    cy.visit('/gallery');

    if (!hasPhotos) {
      cy.getTestData('gallery-empty').should('be.visible');
      return;
    }

    cy.getTestData('gallery-photo')
      .should('have.length', Math.min(photoCount, 24))
      .first()
      .find('img')
      .should('have.attr', 'src')
      .and('include', `res.cloudinary.com/${manifest.cloudName}/`);
  });

  it('should open and close the photo viewer', () => {
    if (!hasPhotos) {
      cy.log('No gallery photos found - skipping photo viewer check');
      return;
    }

    cy.visit('/gallery');
    cy.getTestData('gallery-photo').first().click();
    cy.getTestData('gallery-lightbox').should('be.visible');
    cy.getTestData('gallery-lightbox-image').should('be.visible');

    cy.get('body').type('{esc}');
    cy.getTestData('gallery-lightbox').should('not.exist');
  });

  it('should filter photos by album', () => {
    if (!hasPhotos || manifest.albums.length < 2) {
      cy.log('Fewer than two albums found - skipping album filter check');
      return;
    }

    const album = manifest.albums[0];

    cy.visit('/gallery');
    cy.getTestData(`gallery-filter-${album.slug}`).click();
    cy.getTestData('gallery-photo').should(
      'have.length',
      Math.min(album.photos.length, 24)
    );
  });
});
