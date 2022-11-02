import React from 'react'
import Logo from "../illustrations/logo";
import ConfLogo from '../illustrations/confLogo';
import Github from "../illustrations/github";
import Linkedin from "../illustrations/linkedIn";
import Twitter from "../illustrations/twitter";
// import Link from 'next/link';

const links = [
  {
    href: "https://github.com/asyncapi",
    icon: <Github />,
  },
  {
    href: "https://twitter.com/AsyncAPISpec",
    icon: <Twitter />,
  },
  {
    href: "https://www.linkedin.com/company/asyncapi/",
    icon: <Linkedin />,
  },
];

function Footer() {
  return (
    <div className="border border-0 border-t border-dark-gray">
      <div className="container mx-auto w-full  h-[303px] flex items-center">
        <div className="flex justify-between w-full md:flex-col sm:items-center">
          <div className="md:mt-40 md:text-center sm:text-left w-full md:flex md:flex-col md:items-center">
            <ConfLogo className="w-[210px] height-[44px] md:w-[152px] md:h-[32px]" />
            <h4 className="mt-5 lg:hidden text-dark-400 text-[14px]">
              Virtual Tech Conference
            </h4>
            <div className="lg:hidden mt-20 border border-0 border-t border-dark-500 w-full lg:hidden" />
            <div className="mt-[76px] sm:mt-[40px] text-dark-500 text-[14px]">
              <a
                href="https://events.linuxfoundation.org/about/code-of-conduct/"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Code of Conduct
              </a>
            </div>
          </div>
          <div className='lg:w-[50%] lg:flex lg:justify-end'>
            <div className="flex items-center text-white mt-[80px] md:mt-[20px] md:w-full md:items-center md:mb-10 md:justify-center">
              <h4 className="font-secondary text-dark-400 font-[700] text-[16px] mr-4">Follow us</h4>
              <div className="flex">
                {links.map((link, i) => (
                  <a key={i} href={link.href} target="_blank" rel="noreferrer">
                    <button className="p-[8px] bg-default-btn/10 hover:bg-default-btn/30 transition ease-in-out duration-150 rounded-lg ml-[12px] backdrop-blur-xl border border-dark-600">
                      {link.icon}
                    </button>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer