import React from 'react';
import Logo from '../illustrations/logo';
// import Button from '../Button/button';
import Link from 'next/link';

function Navbar() {
  return (
    <div className="flex justify-between p-3 border border-0 border-b border-dark-600 h-[84px] sticky top-0 w-full navbar">
      <div className="flex items-center sm:justify-between text-white sm:w-full">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Logo width="40px" height="40px" />
            <div className="ml-3 text-3xl">
              <span className="font-black">Conf </span>{" "}
              <span className="font-thin">2022</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center text-white sm:hidden">
        <span className="text-[16px] mr-4">Nov 6-8</span>
        {/* <Button
          text="Add to Calendar"
          className="text-[16px] py-[8px] px-[14px]"
        /> */}
      </div>
    </div>
  );
}

export default Navbar