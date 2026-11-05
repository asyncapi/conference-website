import Gallery from '../../components/Gallery/gallery';
import { GalleryAlbum } from '../../types/types';

const fakeAlbum = (
  slug: string,
  title: string,
  year: number | null,
  count: number
): GalleryAlbum => ({
  slug,
  title,
  year,
  photos: Array.from({ length: count }, (_, i) => ({
    publicId: `conference-gallery/${slug}/photo-${i + 1}`,
    width: 1200,
    height: 800,
  })),
});

const albums = [
  fakeAlbum('london-2026', 'London 2026', 2026, 20),
  fakeAlbum('online-2025', 'Online 2025', 2025, 10),
];

describe('Gallery', () => {
  beforeEach(() => {
    // The fake public IDs do not exist, so serve a stub instead of hitting Cloudinary.
    cy.intercept('GET', 'https://res.cloudinary.com/**', {
      statusCode: 200,
      headers: { 'content-type': 'image/svg+xml' },
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="8"/>',
    });
  });

  it('should show the friendly message when there are no photos', () => {
    cy.mount(<Gallery cloudName="demo" albums={[]} />);

    cy.getTestData('gallery-empty').should('be.visible');
    cy.getTestData('gallery-photo').should('not.exist');
  });

  it('should render a page of photos and load more', () => {
    cy.mount(<Gallery cloudName="demo" albums={albums} />);

    cy.getTestData('gallery-photo')
      .should('have.length', 24)
      .first()
      .find('img')
      .should('have.attr', 'src')
      .and('include', 'res.cloudinary.com/demo/')
      .and('include', 'conference-gallery/london-2026/photo-1');

    cy.getTestData('gallery-load-more').click();
    cy.getTestData('gallery-photo').should('have.length', 30);
    cy.getTestData('gallery-load-more').should('not.exist');
  });

  it('should show only the first photos when given a limit', () => {
    // This is how the home page teaser renders.
    cy.mount(<Gallery cloudName="demo" albums={albums} limit={6} />);

    cy.getTestData('gallery-photo').should('have.length', 6);
    cy.getTestData('gallery-filter-all').should('not.exist');
    cy.getTestData('gallery-load-more').should('not.exist');
  });

  it('should filter photos by album', () => {
    cy.mount(<Gallery cloudName="demo" albums={albums} />);

    cy.getTestData('gallery-filter-online-2025').click();
    cy.getTestData('gallery-filter-online-2025').should(
      'have.attr',
      'aria-pressed',
      'true'
    );
    cy.getTestData('gallery-photo').should('have.length', 10);

    cy.getTestData('gallery-filter-all').click();
    cy.getTestData('gallery-photo').should('have.length', 24);
  });

  it('should open, navigate and close the photo viewer', () => {
    cy.mount(<Gallery cloudName="demo" albums={albums} />);

    cy.getTestData('gallery-photo').first().click();
    cy.getTestData('gallery-lightbox').should('be.visible');
    cy.getTestData('gallery-lightbox-caption').should(
      'have.text',
      'London 2026 · 1 / 30'
    );

    cy.get('body').type('{rightarrow}');
    cy.getTestData('gallery-lightbox-caption').should('contain', '2 / 30');
    cy.getTestData('gallery-lightbox-previous').click();
    cy.getTestData('gallery-lightbox-caption').should('contain', '1 / 30');

    // Clicking the image or caption must not close the viewer.
    cy.getTestData('gallery-lightbox-image').click();
    cy.getTestData('gallery-lightbox-caption').click();
    cy.getTestData('gallery-lightbox').should('be.visible');

    cy.get('body').type('{esc}');
    cy.getTestData('gallery-lightbox').should('not.exist');
  });

  it('should close the photo viewer from the backdrop', () => {
    cy.mount(<Gallery cloudName="demo" albums={albums} />);

    cy.getTestData('gallery-photo').first().click();
    cy.getTestData('gallery-lightbox').click('topLeft');
    cy.getTestData('gallery-lightbox').should('not.exist');
  });
});
