const shimmerSvg = (w: number, h: number): string =>
  `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1B1130" />
      <stop offset="50%" stop-color="#2B1F52" />
      <stop offset="100%" stop-color="#1B1130" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)" />
</svg>`;

const toBase64 = (str: string): string =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);


export const getBlurDataURL = (w: number = 8, h: number = 5): string =>
  `data:image/svg+xml;base64,${toBase64(shimmerSvg(w, h))}`;

export const BLUR_DATA_URL: string = getBlurDataURL();
