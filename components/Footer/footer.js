import React from 'react'
import Logo from "../illustrations/logo";
import Button from "../Button/button";
import Github from "../illustrations/github";
import Linkedin from "../illustrations/linkedIn";
import Twitter from "../illustrations/twitter";

const links = [
  {
    href: "/",
    icon: <Github />,
  },
  {
    href: "/",
    icon: <Twitter />,
  },
  {
    href: "/",
    icon: <Linkedin />,
  },
];

function Footer() {
  return (
    <div className="mt-[123px] border border-0 border-t border-dark-500">
      <div className="container mx-auto w-full  h-[303px] flex items-center">
        <div className="flex justify-between w-full">
          <div>
            <div className="flex items-center">
              <Logo width="50px" height="50px" />
              <div className="ml-3 text-white flex">
                <div className="font-black text-3xl">Conf </div>{" "}
                <div className="font-thin text-3xl ml-2">2022</div>
              </div>
              <span className="ml-5 text-sm text-dark-400 text-[16px]">
                Barcelona, spain
              </span>
            </div>
            <div className="mt-[76px] text-dark-500 text-[14px]">
              <a href="" className="underline">
                Code of Conduct
              </a>
              <a href="" className="ml-[20px] underline">
                Link
              </a>
              <a href="" className="ml-[20px] underline">
                Link
              </a>
            </div>
          </div>
          <div>
            <div className="flex items-center text-white">
              <span className="text-[16px] mr-4">Nov 6-8</span>
              <Button
                text="Add to Calendar"
                className="text-[16px] py-[8px] px-[14px]"
              />
            </div>
            <div className="flex items-center text-white mt-[80px]">
              <span className="text-[16px] mr-4">Follow us</span>
              <div className="flex">
                {links.map((link, i) => (
                  <div
                    key={i}
                    className="p-[8px] bg-dark-600 rounded-lg ml-[12px] backdrop-blur-xl border border-dark-500"
                  >
                    {link.icon}
                  </div>
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