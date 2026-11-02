import type { Metadata } from 'next';
import Gallery from '../../components/Gallery/gallery';
import Heading from '../../components/Typography/heading';
import { fetchGallery } from '../../lib/gallery/cloudinary';

export const metadata: Metadata = {
  title: 'Gallery | AsyncAPI Conference',
  description: 'Photos from past AsyncAPI Conference events around the world.',
};

export const revalidate = 3600;

export default async function GalleryPage() {
  const { cloudName, albums } = await fetchGallery();

  return (
    <div>
      <div className="my-20 px-4">
        <Heading level="h1" textColor="text-white" className="text-center">
          Moments from AsyncAPI Conf
        </Heading>
      </div>

      <div className="w-3/4 sm:w-10/12 my-10 mx-auto">
        <Gallery cloudName={cloudName} albums={albums} />
      </div>
    </div>
  );
}
