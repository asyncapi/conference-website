import React from 'react';
import ConfLogo from "../illustrations/confLogo";
// import Button from '../Button/button';
import Link from 'next/link';

function Navbar() {
  return (
    <div className="flex justify-between p-3 border border-0 border-b border-dark-600 h-[84px] sticky top-0 w-full navbar">
      <div className="flex items-center sm:justify-between text-white sm:w-full">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <ConfLogo className="w-[210px] height-[44px] md:w-[152px] md:h-[32px]"/>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-end text-white w-[50%]">
        <span className="text-[16px] mr-4">Nov 3-5</span>
        {/* <Button
          text="Add to Calendar"
          className="text-[16px] py-[8px] px-[14px]"
        /> */}
      </div>
    </div>
  );
}

export default Navbar