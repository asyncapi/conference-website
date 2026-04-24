import { ImageResponse } from 'next/og';
import cities from '../../../config/city-lists.json';

export const alt = 'AsyncAPI Conference Venue';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const city = cities.find((c) => c.name === id);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#1a1a2e',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 32, color: '#875ae0', marginBottom: 16 }}>
          AsyncAPI Conference 2026
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            textAlign: 'center',
            display: 'flex',
          }}
        >
          {city ? `${city.name}, ${city.country}` : id}
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 20,
            color: '#aaa',
            display: 'flex',
          }}
        >
          {city?.date}
        </div>
        <div
          style={{
            fontSize: 22,
            marginTop: 24,
            textAlign: 'center',
            maxWidth: 800,
            color: '#ccc',
            display: 'flex',
          }}
        >
          {city?.description}
        </div>
      </div>
    ),
    { ...size },
  );
}
