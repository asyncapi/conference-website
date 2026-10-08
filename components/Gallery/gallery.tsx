'use client';

import React, { JSX, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Buttons/button';
import Paragraph from '../Typography/paragraph';
import Arrow from '../illustration/arrow';
import Cancel from '../illustration/cancel';
import { GalleryAlbum, GalleryPhoto } from '../../types/types';
import { cloudinarySrcSet, cloudinaryUrl } from '../../utils/cloudinary';

const PAGE_SIZE = 24;
const ALL_ALBUMS = 'all';
const GRID_WIDTH = 480;
const LIGHTBOX_WIDTH = 1920;

interface GalleryItem extends GalleryPhoto {
  albumTitle: string;
  alt: string;
}

interface GalleryProps {
  cloudName: string;
  albums: GalleryAlbum[];
}

interface LightboxProps {
  cloudName: string;
  items: GalleryItem[];
  index: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

function Lightbox({
  cloudName,
  items,
  index,
  onNavigate,
  onClose,
}: LightboxProps): JSX.Element {
  const dialogRef = useRef<HTMLDivElement>(null);
  const item = items[index];
  const hasMultiple = items.length > 1;

  const showPrevious = (): void =>
    onNavigate((index - 1 + items.length) % items.length);
  const showNext = (): void => onNavigate((index + 1) % items.length);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector('button')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'ArrowLeft' && hasMultiple) {
        showPrevious();
      }
      if (e.key === 'ArrowRight' && hasMultiple) {
        showNext();
      }
      if (e.key === 'Tab') {
        // Keep keyboard focus inside the dialog while it is open.
        const buttons = Array.from(
          dialogRef.current?.querySelectorAll('button') ?? []
        );
        const first = buttons[0];
        const last = buttons[buttons.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      data-test="gallery-lightbox"
      className="fixed inset-0 z-modal flex flex-col items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close photo viewer"
        data-test="gallery-lightbox-close"
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
        onClick={onClose}
      >
        <Cancel className="w-4" />
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            data-test="gallery-lightbox-previous"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={(e) => {
              e.stopPropagation();
              showPrevious();
            }}
          >
            <Arrow className="w-4 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            data-test="gallery-lightbox-next"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            <Arrow className="w-4" />
          </button>
        </>
      )}

      {/* next/image cannot build a Cloudinary srcSet while images.unoptimized is on. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={item.publicId}
        src={cloudinaryUrl(cloudName, item.publicId, LIGHTBOX_WIDTH)}
        srcSet={cloudinarySrcSet(cloudName, item.publicId)}
        sizes="100vw"
        width={item.width}
        height={item.height}
        alt={item.alt}
        data-test="gallery-lightbox-image"
        className="h-auto max-h-full min-h-0 w-auto max-w-full rounded-lg object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="mt-4 text-sm text-white" aria-live="polite">
        {item.albumTitle} · {index + 1} / {items.length}
      </p>
    </div>,
    document.body
  );
}

function Gallery({ cloudName, albums }: GalleryProps): JSX.Element {
  const [activeAlbum, setActiveAlbum] = useState<string>(ALL_ALBUMS);
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = useMemo<GalleryItem[]>(
    () =>
      albums
        .filter(
          (album) => activeAlbum === ALL_ALBUMS || album.slug === activeAlbum
        )
        .flatMap((album) =>
          album.photos.map((photo, index) => ({
            ...photo,
            albumTitle: album.title,
            alt: `${album.title} photo ${index + 1}`,
          }))
        ),
    [albums, activeAlbum]
  );

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
      {albums.length > 1 && (
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

      <div className="grid grid-cols-4 gap-4 lg:grid-cols-3 sm:grid-cols-2">
        {items.slice(0, visibleCount).map((item, index) => (
          <button
            key={item.publicId}
            type="button"
            aria-label={`View ${item.alt}`}
            data-test="gallery-photo"
            className="aspect-square overflow-hidden rounded-xl bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setOpenIndex(index)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cloudinaryUrl(cloudName, item.publicId, GRID_WIDTH)}
              srcSet={cloudinarySrcSet(cloudName, item.publicId)}
              sizes="(max-width: 715px) 50vw, (max-width: 1118px) 33vw, 25vw"
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {visibleCount < items.length && (
        <div className="mt-10 flex justify-center">
          <Button
            type="button"
            test="gallery-load-more"
            className="px-8"
            onClick={() => setVisibleCount(visibleCount + PAGE_SIZE)}
          >
            Load more
          </Button>
        </div>
      )}

      {openIndex !== null && (
        <Lightbox
          cloudName={cloudName}
          items={items}
          index={openIndex}
          onNavigate={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  );
}

export default Gallery;
