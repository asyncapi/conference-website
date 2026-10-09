export const cloudinaryUrl = (
  cloudName: string,
  publicId: string,
  width: number
): string => {
  const encodedId = publicId.split('/').map(encodeURIComponent).join('/');

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_limit,w_${width}/${encodedId}`;
};
