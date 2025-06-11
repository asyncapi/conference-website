'use client'
import Heading from '../Typography/heading';
import Button from '../Buttons/button';
import { useState } from 'react';

const imageUrls = [
    "/img/gallery/1.webp",
    "/img/gallery/2.webp",
    "/img/gallery/3.webp",
    "/img/gallery/4.webp",
    "/img/gallery/5.webp",
    "/img/gallery/6.webp",
    "/img/gallery/7.webp",
    "/img/gallery/8.webp",
    "/img/gallery/9.webp",
    "/img/gallery/10.webp",
    "/img/gallery/11.webp",
    "/img/gallery/12.webp",
];

const imageDimensions = [
    { width: 3000, height: 4000 },
    { width: 4096, height: 3072 },
    { width: 1280, height: 960 },
    { width: 5184, height: 3888 },
    { width: 1536, height: 2048 },
    { width: 4096, height: 3072 },
    { width: 3072, height: 4069 },
    { width: 4096, height: 3072 },
    { width: 4000, height: 3000 },
    { width: 4096, height: 3072 },
    { width: 4096, height: 3072 },
    { width: 1957, height: 2610 },
  ];
  
export function Gallery() {
    const [loaded, setLoaded] = useState(Array(imageUrls.length).fill(false));

    function handleImageLoad(index) {
        setLoaded(prev => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
        });
    }

    return (
        <div className="flex flex-col items-center py-12">
            <div>
                <div className="text-lg capitalize sm:text-sm text-white font-semibold border-b-2 border-blue-400 mb-1">
                    gallery
                </div>
            </div>

            <Heading typeStyle="heading-md" className="capitalize text-gradient text-center lg:mt-10">
                our event gallery
            </Heading>

            <div className="w-full columns-4 sm:columns-2 space-y-5 justify-center my-4 p-4">
                {imageUrls.map((url, index) => (
                    <div key={index} className="relative w-full break-inside-avoid rounded-xl overflow-hidden mb-4">
                    {/* Skeleton */}
                    {!loaded[index] && (
                      <div
                        className="absolute inset-0 bg-gray-300 animate-pulse"
                        style={{
                          aspectRatio: `${imageDimensions[index].width} / ${imageDimensions[index].height}`,
                        }}
                      />
                    )}
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Gallery Image ${index + 1}`}
                      className={`rounded-xl w-full h-auto ${!loaded[index] ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(index)}
                    />
                  </div>
                  
                ))}
            </div>

            <a
                target="_blank"
                rel="noreferrer"
                href="https://drive.google.com/drive/folders/15QooKSy__jerOtLSkXzuKQh0hdlhZqo7?usp=drive_link"
            >
                <Button type="button" className="w-[200px] my-4 px-10">
                    Browse
                </Button>
            </a>
        </div>
    );
}
