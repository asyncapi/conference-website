import React from 'react';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const MasonryGallery = ({ images }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((image, index) => (
        <div key={index} className="relative group">
          <img src={image.src} alt={image.alt} className="rounded-lg" />
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryGallery;