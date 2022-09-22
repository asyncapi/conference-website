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
    href: "ttps://twitter.com/AsyncAPISpec",
    icon: <Twitter />,
  },
  {
    href: "https://www.linkedin.com/company/asyncapi/",
    icon: <Linkedin />,
  },
];

function Footer() {
  return (
    <div className="mt-[123px] border border-0 border-t border-dark-500">
      <div className="container mx-auto w-full  h-[303px] flex items-center">
        <div className="flex justify-between w-full sm:flex-col sm:items-center">
          <div className="sm:mt-40 text-center w-full sm:flex sm:flex-col sm:items-center">
            <ConfLogo width="210px" height="44px" />
            <h4 className="mt-5 lg:hidden text-dark-400 text-[14px]">
              Virtual Tech Conference
            </h4>
            <div className="mt-20 border border-0 border-t border-dark-500 w-full" />
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
          <div>
            <div className="flex items-center text-white mt-[80px] sm:mt-[20px] sm:w-full sm:items-center sm:mb-10">
              <h4 className="text-[16px] mr-4">Follow us</h4>
              <div className="flex">
                {links.map((link, i) => (
                  <a key={i} href={link.href} target="_blank" rel="noreferrer">
                    <button className="p-[8px] bg-dark-600 rounded-lg ml-[12px] backdrop-blur-xl border border-dark-500">
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