'use client';

import React, { JSX, useEffect, useRef } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import Button from '../Buttons/button';
import Arrow from '../illustration/arrow';
import Cancel from '../illustration/cancel';
import { GalleryItem } from '../../types/types';
import { cloudinaryUrl } from '../../utils/cloudinary';
import { BLUR_DATA_URL } from '../../utils/image-blur';

const LIGHTBOX_WIDTH = 1920;
const CONTROL_CLASSES =
  'absolute h-10 w-10 rounded-full border border-white/40 bg-black/60 focus:outline-none focus:ring-2 focus:ring-white';

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
      <Button
        type="button"
        variant="icon"
        ariaLabel="Close photo viewer"
        test="gallery-lightbox-close"
        className={`${CONTROL_CLASSES} top-4 right-4`}
        onClick={onClose}
      >
        <Cancel className="w-4" />
      </Button>

      {hasMultiple && (
        <>
          <Button
            type="button"
            variant="icon"
            ariaLabel="Previous photo"
            test="gallery-lightbox-previous"
            className={`${CONTROL_CLASSES} left-4 top-1/2 -translate-y-1/2`}
            onClick={(e) => {
              e.stopPropagation();
              showPrevious();
            }}
          >
            <Arrow className="w-4 rotate-180" />
          </Button>
          <Button
            type="button"
            variant="icon"
            ariaLabel="Next photo"
            test="gallery-lightbox-next"
            className={`${CONTROL_CLASSES} right-4 top-1/2 -translate-y-1/2`}
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            <Arrow className="w-4" />
          </Button>
        </>
      )}

      <Image
        key={item.publicId}
        src={cloudinaryUrl(cloudName, item.publicId, LIGHTBOX_WIDTH)}
        width={item.width}
        height={item.height}
        alt={item.alt}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
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

export default Lightbox;
