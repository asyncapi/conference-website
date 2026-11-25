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
    // Shorter than one block of photos, so nothing loads before scrolling.
    cy.viewport(1536, 600);

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

  it('should render a bento grid and load more photos on scroll', () => {
    cy.mount(<Gallery cloudName="demo" albums={albums} />);

    cy.getTestData('gallery-photo')
      .should('have.length', 7)
      .first()
      .should('have.class', 'col-span-2')
      .find('img')
      .should('have.attr', 'src')
      .and('include', 'res.cloudinary.com/demo/')
      .and('include', 'conference-gallery/london-2026/photo-1');
    cy.getTestData('gallery-load-more').should('not.exist');

    // Each scroll to the end of the grid brings in the next block of photos.
    [14, 21, 28, 30].forEach((count) => {
      cy.scrollTo('bottom');
      cy.getTestData('gallery-photo').should('have.length', count);
    });
    cy.getTestData('gallery-sentinel').should('not.exist');
  });

  it('should show only the first photos when given a limit', () => {
    // This is how the home page teaser renders.
    cy.mount(<Gallery cloudName="demo" albums={albums} limit={5} />);

    cy.getTestData('gallery-photo').should('have.length', 5);
    cy.getTestData('gallery-filter-all').should('not.exist');
    cy.getTestData('gallery-sentinel').should('not.exist');
  });

  it('should filter photos by album', () => {
    cy.mount(<Gallery cloudName="demo" albums={albums} />);

    cy.getTestData('gallery-filter-online-2025').click();
    cy.getTestData('gallery-filter-online-2025').should(
      'have.attr',
      'aria-pressed',
      'true'
    );
    cy.getTestData('gallery-photo').should('have.length', 7);
    cy.getTestData('gallery-photo')
      .eq(1)
      .find('img')
      .should('have.attr', 'src')
      .and('include', 'conference-gallery/online-2025/photo-2');

    cy.scrollTo('bottom');
    cy.getTestData('gallery-photo').should('have.length', 10);

    // Switching albums starts again from the first block.
    cy.getTestData('gallery-filter-all').click();
    cy.getTestData('gallery-photo').should('have.length', 7);
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
