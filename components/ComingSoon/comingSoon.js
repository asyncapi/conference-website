import React from 'react';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';
import { Nav } from './tempNav';
import NotificationForm from '../Form/notification';
import Image from 'next/image';

function ComingSoon() {
  return (
    <div className='container'>
      <Nav />
      <div className='text-center flex flex-col items-center justify-center h-full mt-24'>
      {/* <Heading typeStyle='heading-lg' className='text-gradient'>
        AsyncAPI Conf 2025
      </Heading> */}
      <div className='lg:w-full w-[50%]'>
        <Heading typeStyle='heading-lg' className='text-gradient text-8xl'>
        Coming Soon!
      </Heading>
      <Paragraph typeStyle='body-lg' className='mt-10 text-center' textColor='text-gray-200'>
        Join us for the AsyncAPI Conference, which brings the latest AsyncAPI technology to locations worldwide!
      </Paragraph>
      <NotificationForm />
      </div>
    </div>
    <div className='w-full h-[450px] mt-16 flex justify-center items-center overflow-hidden'>
     <Image src='/img/conf-illustration.png' alt='test' width={1200} height={100} className='mt-[200px]' />
    </div>
    </div>
  );
}

export default ComingSoon;
