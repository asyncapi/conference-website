import React from "react";
import ILink from "../illustration/link";
import Socials from "./socials";

function Footer(): JSX.Element {
  return (
    <div className="container" data-test="footer">
      <div
        className="w-full flex flex-row justify-between items-center p-2 md:p-4 gap-4 sm:flex-col sm:gap-3"
        data-test="footer-asyncAPI-logo"
      >
        {/* Code of Conduct Section */}
        <div className="text-[16px] md:text-[18px] text-gray-100 flex items-center flex-shrink-0 sm:hidden">
          <a
            href="https://github.com/asyncapi/community/blob/master/CODE_OF_CONDUCT.md"
            target="_blank"
            rel="noreferrer"
            className="hover:underline text-white duration-200 ease-in-out flex items-center"
            data-test="code-of-conduct"
          >
            <span>Code of Conduct</span>
            <ILink className="w-3 md:w-5 ml-1 md:ml-2" fill="white" />
          </a>
        </div>

        {/* "Made with ❤️" and Socials Section - Grouped together */}
        <div className="flex flex-row items-center gap-4 text-center sm:flex-col sm:items-center">
          <span className="text-white text-[16px] md:text-[18px] leading-tight">
            Made with ❤️ by AsyncAPI contributors. By the community for the community!
          </span>
          <div className="w-[1px] h-6 bg-white sm:hidden" />
          <div className="flex items-center gap-2 flex-shrink-0">
            <Socials />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
