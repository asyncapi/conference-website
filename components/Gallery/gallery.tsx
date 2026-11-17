'use client';

import React, { JSX, useCallback, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Paragraph from '../Typography/paragraph';
import Lightbox from './lightbox';
import { GalleryAlbum, GalleryItem } from '../../types/types';
import { cloudinaryUrl } from '../../utils/cloudinary';
import { BLUR_DATA_URL } from '../../utils/image-blur';

const PAGE_SIZE = 7;
const ALL_ALBUMS = 'all';
const TILE_WIDTH = 720;
const WIDE_TILE_WIDTH = 1080;

interface GalleryProps {
  cloudName: string;
  albums: GalleryAlbum[];
  limit?: number;
}

function Gallery({ cloudName, albums, limit }: GalleryProps): JSX.Element {
  const [activeAlbum, setActiveAlbum] = useState<string>(ALL_ALBUMS);
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items: GalleryItem[] = albums
    .filter((album) => activeAlbum === ALL_ALBUMS || album.slug === activeAlbum)
    .flatMap((album) =>
      album.photos.map((photo, index) => ({
        ...photo,
        albumTitle: album.title,
        alt: `${album.title} photo ${index + 1}`,
      }))
    )
    .slice(0, limit);

  const closeLightbox = useCallback((): void => setOpenIndex(null), []);

  const selectAlbum = (slug: string): void => {
    setActiveAlbum(slug);
    setVisibleCount(PAGE_SIZE);
  };

  if (!cloudName || items.length === 0) {
    return (
      <div data-test="gallery-empty" className="text-center">
        <Paragraph>
          Photos from our past conferences are on their way. Check back soon.
        </Paragraph>
      </div>
    );
  }

  return (
    <div data-test="gallery">
      {!limit && albums.length > 1 && (
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {[{ slug: ALL_ALBUMS, title: 'All' }, ...albums].map((album) => (
            <button
              key={album.slug}
              type="button"
              aria-pressed={activeAlbum === album.slug}
              data-test={`gallery-filter-${album.slug}`}
              className={`rounded-full border px-6 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white ${
                activeAlbum === album.slug
                  ? 'border-transparent bg-violet-700'
                  : 'border-white/20 hover:bg-white/10'
              }`}
              onClick={() => selectAlbum(album.slug)}
            >
              {album.title}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-2">
        {items.slice(0, visibleCount).map((item, index) => {
          const position = index % PAGE_SIZE;
          const isLast = position === PAGE_SIZE - 1;
          const isWide = position === 0 || isLast;

          return (
            <button
              key={item.publicId}
              type="button"
              aria-label={`View ${item.alt}`}
              data-test="gallery-photo"
              className={`relative h-85 overflow-hidden rounded-2xl bg-white/10 focus:outline-none focus:ring-2 focus:ring-white lg:h-60 sm:h-40 ${
                isWide ? 'col-span-2' : ''
              } ${isLast ? 'sm:col-span-1' : ''}`}
              onClick={() => setOpenIndex(index)}
            >
              <Image
                src={cloudinaryUrl(
                  cloudName,
                  item.publicId,
                  isWide ? WIDE_TILE_WIDTH : TILE_WIDTH
                )}
                alt={item.alt}
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </button>
          );
        })}
      </div>

      {visibleCount < items.length && (
        <motion.div
          key={visibleCount}
          data-test="gallery-sentinel"
          viewport={{ margin: '300px' }}
          onViewportEnter={() => setVisibleCount(visibleCount + PAGE_SIZE)}
        />
      )}

      {openIndex !== null && (
        <Lightbox
          cloudName={cloudName}
          items={items}
          index={openIndex}
          onNavigate={setOpenIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}

export default Gallery;
