import React from 'react';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';
import Image from 'next/image';

function Speakers({ speakers }) {
  return (
    <div className='container'>
      {/* <div className='flex flex-col items-center'>
        <Heading typeStyle='heading-md' className='text-gradient'>
          Speakers
        </Heading>
        <div className='mt-6 grid grid-cols-3 gap-6'>
          {speakers.map((speaker) => (
            <div key={speaker.name} className='flex flex-col items-center'>
              <Image src={speaker.image} alt={speaker.name} width={150} height={150} className='rounded-full' />
              <Heading typeStyle='heading-sm' className='mt-4'>
                {speaker.name}
              </Heading>
              <Paragraph typeStyle='body-sm' className='mt-2' textColor='text-gray-200'>
                {speaker.title}
              </Paragraph>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default Speakers;
