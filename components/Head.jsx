import Head from 'next/head';
import { useContext } from 'react';
import AppContext from '../context/AppContext.jsx';




export function HeadComponent({
  title,
  description = `Join us for the AsyncAPI Conference, bringing the latest in AsyncAPI technology to locations worldwide!`,
  image = '/img/ogimage/home.jpg', //todo
}) {
  const url = process.env.NEXT_PUBLIC_DEPLOY_URL || 'http://localhost:3000';
  const appContext = useContext(AppContext);
  const { path = '' } = appContext || {};
  let currImage = image;

  const permalink = `${url}${path}`;
  let type = 'Conference Website';

  if (path.startsWith('/venue')) {
    type = 'Conference Venue';
  }

  if (!image.startsWith('http') && !image.startsWith('https')) {
    currImage = `${url}${image}`;
  }

  const permTitle = 'AsyncAPI Conference Website';

  const currTitle = title ? `${title} | ${permTitle}` : permTitle;



  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
      <meta name='description' content={description} />

      {/* Google / Search Engine Tags */}
      <meta itemProp='name' content={title} />
      <meta itemProp='description' content={description} />
      <meta itemProp='image' content={currImage} />

      {/* Twitter Card data */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={currImage} />

      {/* Open Graph data */}
      <meta property='og:title' content={title} />
      <meta property='og:type' content={type} />
      <meta property='og:url' content={permalink} />
      <meta property='og:image' content={currImage} />
      <meta property='og:description' content={description} />

      <title>{currTitle}</title>
    </Head>
  );
}
