'use client';

import { useEffect, useState } from 'react';

type Image = {
  url: string;
  width: number;
  height: number;
};

export default function GalleryPage() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch('/api/gallery/images');
      if (!res.ok) return;

      const data: Image[] = await res.json();
      setImages(data);
    }

    fetchImages();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-28 pb-12">

      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <img
            key={image.url}
            src={image.url}
            alt="Gallery image"
            className="rounded-xl object-cover aspect-square"
          />
        ))}
      </div>
    </div>
  );
}
