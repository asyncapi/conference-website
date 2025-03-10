import React from "react";
import Image from "next/image";
import ILink from "../illustration/link";

function Footer() {
  const socials = [
    {
      name: "Github",
      href: "https://github.com/asyncapi",
      imgUrl: "/img/Github.png",
    },
    {
      name: "Linkedin",
      href: "https://www.linkedin.com/company/asyncapi/",
      imgUrl: "/img/Linkedln.png",
    },
    {
      name: "Twitter(X)",
      href: "https://x.com/asyncapispec",
      imgUrl: "/img/twitter_new.png",
    },
  ];
  return (
    <div className="container" data-test="footer">
      <div
        className="w-full flex justify-between items-center p-4 sm:flex-col sm:gap-3"
        data-test="footer-asyncAPI-logo"
      >
        <div className="mt-2 text-[14px] text-gray-100">
          <a
            href="https://github.com/asyncapi/community/blob/master/CODE_OF_CONDUCT.md"
            target="_blank"
            rel="noreferrer"
            className="hover:underline text-white duration-200 ease-in-out flex items-center" 
            data-test="code-of-conduct"
          >
           <span> Code of Conduct </span><span><ILink className='w-4 ml-2' fill='white' /></span>
          </a>
        </div>
        // ... existing code ...
      </div>
    </div>
  );
}

export default Footer;