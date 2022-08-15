import React from 'react';
import Logo from '../illustrations/logo';
import Button from '../Button/button';

function Navbar() {
  return (
    <div
      className="flex justify-between p-3"
      style={{
        borderBottom: "1px solid #2b2146",
      }}
    >
      <div className="flex items-center sm:justify-between text-white sm:w-full">
        <div className="flex items-center">
          <Logo width='40px' height='40px' />
          <div className="ml-3 text-xl">
            <span className="font-black">Conf </span>{" "}
            <span className="font-light text-dark-paint">2022</span>
          </div>
        </div>
        <span className="ml-5 text-sm text-dark-400">Barcelona, spain</span>
      </div>
      <div className="flex items-center text-white sm:hidden">
        <span className='text-xs mr-4'>Nov 6-8</span>
        <Button text='Add to Calendar' className='text-xs' />
      </div>
    </div>
  );
}

export default Navbar