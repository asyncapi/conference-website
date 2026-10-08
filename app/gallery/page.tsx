import type { Metadata } from 'next';
import Gallery from '../../components/Gallery/gallery';
import { fetchGallery } from '../../lib/gallery/cloudinary';

export const metadata: Metadata = {
  title: 'Gallery | AsyncAPI Conference',
  description: 'Photos from past AsyncAPI Conference events around the world.',
};

// Photos change a few times a year, so re-read Cloudinary at most hourly.
// Next.js requires a literal here; keep it in sync with
// GALLERY_REVALIDATE_SECONDS in lib/gallery/cloudinary.ts.
export const revalidate = 3600;

export default async function GalleryPage() {
  const { cloudName, albums } = await fetchGallery();

  return (
    <div>
      <div className="my-20">
        <h1 className="text-5xl sm:text-4xl sm:w-full text-white my-4 text-center w-1/2 mx-auto font-bold">
          Moments from
        </h1>
        <h1 className="text-5xl sm:text-4xl px-10 py-4 rounded-full bg-violet-700 text-white my-4 text-center w-fit mx-auto font-bold">
          AsyncAPI Conf
        </h1>
      </div>

      <div className="w-3/4 sm:w-10/12 my-10 mx-auto">
        <Gallery cloudName={cloudName} albums={albums} />
      </div>
    </div>
  );
}
