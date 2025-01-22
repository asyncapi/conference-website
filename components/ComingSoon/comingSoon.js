import React from 'react';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';

function ComingSoon() {
  return (
    <div className='container text-center py-20 flex flex-col items-center'>
      <Heading typeStyle='heading-lg' className='text-gradient'>
        AsyncAPI Conf 2025
      </Heading>
      <Heading typeStyle='heading-lg' className='text-gradient'>
        Coming Soon!
      </Heading>
      <Paragraph typeStyle='body-lg' className='mt-4 text-center' textColor='text-gray-200'>
        Stay tuned for more updates!
      </Paragraph>
    </div>
  );
}

export default ComingSoon;
