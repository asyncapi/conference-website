export const customImageLoader = ({ src }: { src: string }) => {
  // fallback if src is missing or invalid
  return src || '/img/placeholder.png';
};
