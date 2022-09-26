import React from 'react';
import ConfLogo from "../illustrations/confLogo";
// import Button from '../Button/button';
import Link from 'next/link';

function Navbar() {
  return (
    <div className="flex justify-between p-5 border border-0 border-b border-dark-gray h-[84px] sticky top-0 w-full navbar">
      <div className="flex items-center sm:justify-between text-white sm:w-full">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <ConfLogo className="w-[210px] height-[44px] md:w-[152px] md:h-[32px]"/>
            <h4 className='ml-5 text-[16px] tracking-[0.03em] text-dark-400 font-secondary font-[400] md:hidden'>Virtual Conference</h4>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-end text-white w-[50%]">
        <span className="font-secondary text-dark-400 text-[16px] tracking-[0.03em] mr-4">Nov 3-5</span>
        {/* <Button
          text="Add to Calendar"
          className="text-[16px] py-[8px] px-[14px]"
        /> */}
      </div>
    </div>
  );
}

export default Navbar