import React from 'react';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';

function PastEditions({ editions }) {
  return (
    <div className='container'>
      {/* <div className='flex flex-col items-center'>
        <Heading typeStyle='heading-md' className='text-gradient'>
          Past Editions
        </Heading>
        <div className='mt-6 grid grid-cols-3 gap-6'>
          {editions.map((edition) => (
            <div key={edition.year} className='flex flex-col items-center'>
              <Heading typeStyle='heading-sm' className='mt-4'>
                {edition.year}
              </Heading>
              <Paragraph typeStyle='body-sm' className='mt-2' textColor='text-gray-200'>
                {edition.description}
              </Paragraph>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default PastEditions;
