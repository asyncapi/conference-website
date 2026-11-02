import type { Metadata } from 'next';
import HomePage from './home-page';
import { fetchGallery } from '../lib/gallery/cloudinary';

const GALLERY_PHOTO_COUNT = 6;

export const metadata: Metadata = {
  title: 'AsyncAPI Conference',
  description: 'AsyncAPI Conference - The conference for the AsyncAPI community',
};
export const revalidate = 3600;

export default async function Page() {
  const { cloudName, albums } = await fetchGallery(GALLERY_PHOTO_COUNT).catch(
    (error) => {
      console.error('Rendering the homepage without the gallery:', error);
      return { cloudName: '', albums: [] };
    }
  );

  return (
    <HomePage
      galleryCloudName={cloudName}
      galleryAlbums={albums}
      galleryLimit={GALLERY_PHOTO_COUNT}
    />
  );
}
