import React from "react";
import Image from 'next/image';
import Link from "next/link";

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
      name: "Tweeter(X)",
      href: "https://twitter.com/asyncapispec",
      imgUrl: "/img/twitter_new.png",
    },
  ];
  return (
    <div className="container">
      <div className="w-full flex justify-between items-center p-4 sm:flex-col sm:gap-3">
          <Link href='/'>
            <Image className="cursor-pointer" src="/img/logo.png" alt="company logo" height={0} width={0} style={{width:'150px', height: "auto" }}/>
          </Link>
            <div className="sm:hidden"> 
              {/* This div helps keep the text centered */}
            </div>
      <div className="mt-2 text-[14px] text-gray-100 underline">
        <a
        href="https://github.com/asyncapi/.github/blob/master/CODE_OF_CONDUCT.md"
        target="_blank"
        rel="noreferrer"
        className="hover:text-sky-500 text-white duration-200 ease-in-out"
        >
              Code of Conduct
            </a>
          </div>
      <div>
      </div>
        <div className="flex items-center justify-between sm:flex-col sm:items-start">
          <div className="flex flex-col justify-between items-start gap-2 sm:items-center">
            <div className="flex justify-between items-center gap-3">
              {socials.map((social, index) => {
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-lg border-[1.5px] border-[#556061] flex items-center justify-center hover:border-[#AD20E2] duration-150 ease-in-out"
                  >
                    <Image src={social.imgUrl} alt={social.name} height={32} width={32} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
    </div>
    </div>
  );
}

export default Footer;
