// Every distinct width is a separate derived image that counts against
// Cloudinary's transformation quota, so only request these sizes.
export const GALLERY_WIDTHS = [480, 960, 1920];

export const cloudinaryUrl = (
  cloudName: string,
  publicId: string,
  width: number
): string => {
  const encodedId = publicId.split('/').map(encodeURIComponent).join('/');

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_limit,w_${width}/${encodedId}`;
};

export const cloudinarySrcSet = (
  cloudName: string,
  publicId: string,
  widths: number[] = GALLERY_WIDTHS
): string =>
  widths
    .map((width) => `${cloudinaryUrl(cloudName, publicId, width)} ${width}w`)
    .join(', ');
