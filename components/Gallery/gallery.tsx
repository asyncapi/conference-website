'use client';

import Heading from '../Typography/heading';
import Button from '../Buttons/button';
import { useEffect, useState } from 'react';

type Image = {
  url: string;
  width: number;
  height: number;
};

function getRandomImages(images: Image[], count: number) {
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function Gallery() {
  const [images, setImages] = useState<Image[]>([]);
  const [visibleImages, setVisibleImages] = useState<Image[]>([]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch('/api/gallery/images');
      if (!res.ok) return;

      const data: Image[] = await res.json();
      setImages(data);
      setVisibleImages(getRandomImages(data, 9));
    }

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setVisibleImages(getRandomImages(images, 9));
        setFade(true);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="flex flex-col items-center py-12">
      <div className="text-lg capitalize sm:text-sm text-white font-semibold border-b-2 border-blue-400 mb-1">
        gallery
      </div>

      <Heading
        typeStyle="heading-md"
        className="capitalize text-gradient text-center lg:mt-8"
      >
        our event gallery
      </Heading>

      <div
        className={`
          max-w-6xl
          w-full
          mx-auto
          grid
          grid-cols-3
          md:grid-cols-3
          lg:grid-cols-4
          gap-4
          my-6
          px-4
          transition-opacity
          duration-500
          ${fade ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {visibleImages.map((image) => (
          <div
            key={image.url}
            className="relative rounded-xl overflow-hidden bg-black/10 hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src={image.url}
              alt="Gallery image"
              loading="lazy"
              className="w-full h-full object-cover aspect-[4/4] rounded-xl"
            />
          </div>
        ))}
      </div>

      <Button type="button" className="w-[200px] mt-6 px-10">
        Browse
      </Button>
    </div>
  );
}
