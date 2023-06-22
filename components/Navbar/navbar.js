import { React, useState } from "react";
import ConfLogo from "../illustrations/confLogo";
// import Button from '../Button/button';
import Link from "next/link";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const arrowClasses = `w-4 h-4 transition-transform text-white ${
    isOpen ? "transform rotate-180" : ""
  }`;

  return (
    <div className="flex justify-between p-5 border-0 border-b border-dark-gray h-[84px] sticky top-0 w-full navbar">
      <div className=" w-3/5 flex">
        <div className="flex sm:justify-between text-white sm:w-full">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <ConfLogo className="w-[210px] height-[44px] md:w-[152px] md:h-[32px]" />
              {/* <h4 className='ml-5 text-[16px] tracking-[0.03em] text-white font-secondary font-[400] md:hidden'>Virtual Conference</h4> */}
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-end text-white w-[50%] ml-auto ">
          <span className="font-secondary text-white text-[16px] tracking-[0.03em] mr-4 font-semibold">
            About
          </span>
          <button
            className="relative flex  justify-center items-center  mr-4"
            onClick={toggleDropdown}
          >
            <span className="font-secondary text-white text-[16px] tracking-[0.03em] mr-1 font-semibold">
              Venue
            </span>
            <span className=" ml-auto p-2 ">
              <svg
                width="11"
                height="7"
                viewBox="0 0 11 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={arrowClasses}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.707 6.45704C10.5194 6.64451 10.2651 6.74983 9.99997 6.74983C9.73481 6.74983 9.4805 6.64451 9.29297 6.45704L5.99997 3.16404L2.70697 6.45704C2.61472 6.55255 2.50438 6.62873 2.38237 6.68114C2.26037 6.73355 2.12915 6.76114 1.99637 6.76229C1.86359 6.76345 1.73191 6.73814 1.60902 6.68786C1.48612 6.63758 1.37447 6.56333 1.28057 6.46944C1.18668 6.37554 1.11243 6.26389 1.06215 6.14099C1.01187 6.0181 0.986565 5.88642 0.987719 5.75364C0.988873 5.62086 1.01646 5.48964 1.06887 5.36764C1.12128 5.24563 1.19746 5.13529 1.29297 5.04304L5.29297 1.04304C5.4805 0.85557 5.73481 0.750255 5.99997 0.750255C6.26513 0.750255 6.51944 0.85557 6.70697 1.04304L10.707 5.04304C10.8944 5.23057 10.9998 5.48488 10.9998 5.75004C10.9998 6.01521 10.8944 6.26951 10.707 6.45704Z"
                  fill="#F0F4F5"
                />
              </svg>
            </span>
            <div
              className={`absolute ${
                isOpen ? "block" : "hidden"
              } top-full min-w-full w-max  shadow-md mt-1 rounded-xl  transition`}
            >
              <ul className="text-left rounded-md bg-buttonGradient">
                <li>
                  <div
                    className=" px-4 py-2 h-10text-white font-semibold"
                  >
                    Bengaluru, India
                  </div>
                </li>
                <li>
                  <div
                    className=" px-4 py-2 h-10 text-white font-semibold "
                  >
                    Berlin, Germany
                  </div>
                </li>
                <li>
                  <div
                    className=" px-4 py-2 h-10 text-white font-semibold "
                  >
                    Lagos, Nigeria
                  </div>
                </li>
                <li>
                  <Link href="/locations/madrid">
                    <div
                      className=" px-4 py-2 h-10 text-white font-semibold "
                    >
                      Madrid, Spain
                    </div>
                  </Link>
                </li>
                <li>
                  <div
                    className=" px-4 py-2 h-10 text-white font-semibold "
                  >
                    London, England
                  </div>
                </li>
              </ul>
            </div>
          </button>
          <span className="font-secondary text-white text-[16px] tracking-[0.03em] mr-4 font-semibold">
            Speakers
          </span>
          <span className="font-secondary text-white text-[16px] tracking-[0.03em] font-semibold">
            Sponsors
          </span>
          {/* <Button
            text="Add to Calendar"
            className="text-[16px] py-[8px] px-[14px]"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
