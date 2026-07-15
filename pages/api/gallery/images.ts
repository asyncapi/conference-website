import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await cloudinary.search
      .expression('folder:asyncapi')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    const resources = result?.resources || [];
    const images = resources.map((img: any) => ({
      url: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto,w_800/${img.public_id}.${img.format}`,
      width: img.width,
      height: img.height,
    }));

    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
}
