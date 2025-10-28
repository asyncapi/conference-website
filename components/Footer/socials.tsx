import React, { JSX } from 'react';
import LinkedIn from '../illustration/Socials/LinkedIn';
import Github from '../illustration/Socials/Github';
import X from '../illustration/Socials/X';
import Youtube from '../illustration/Socials/Youtube';

function Socials(): JSX.Element {
  return (
    <div className="social-wrapper" data-test="social-wrapper">
      <ul className="inline-flex list-none justify-center font-['Poppins',sans-serif]">
        <li className="icon linkedin relative bg-white rounded-full m-[5px] w-[35px] h-[35px] text-lg flex justify-center items-center flex-col shadow-md cursor-pointer transition-all duration-200 hover:bg-[#0077b5] hover:text-white">
          <a
            href="https://www.linkedin.com/company/asyncapi"
            target="_blank"
            rel="noreferrer"
            className="w-full h-full flex justify-center items-center"
            data-test="footer-Linkedin"
          >
            <span className="tooltip absolute top-0 text-sm bg-white text-white py-[5px] px-[8px] rounded-md shadow-md opacity-0 pointer-events-none transition-all duration-300">
              LinkedIn
            </span>
            <LinkedIn className="h-[1em]" fill="currentColor" />
          </a>
        </li>
        <li className="icon github relative bg-white rounded-full m-[5px] w-[35px] h-[35px] text-lg flex justify-center items-center flex-col shadow-md cursor-pointer transition-all duration-200 hover:bg-[#333] hover:text-white">
          <a
            href="https://github.com/asyncapi"
            target="_blank"
            rel="noreferrer"
            className="w-full h-full flex justify-center items-center"
            data-test="footer-Github"
          >
            <span className="tooltip absolute top-0 text-sm bg-white text-white py-[5px] px-[8px] rounded-md shadow-md opacity-0 pointer-events-none transition-all duration-300">
              GitHub
            </span>
            <Github className="h-[1.4em]" fill="currentColor" />
          </a>
        </li>
        <li className="icon twitter relative bg-white rounded-full m-[5px] w-[35px] h-[35px] text-lg flex justify-center items-center flex-col shadow-md cursor-pointer transition-all duration-200 hover:bg-[#333] hover:text-white">
          <a
            href="https://twitter.com/asyncapispec"
            target="_blank"
            rel="noreferrer"
            className="w-full h-full flex justify-center items-center"
            data-test="footer-Twitter(X)"
          >
            <span className="tooltip absolute top-0 text-sm bg-white text-white py-[5px] px-[8px] rounded-md shadow-md opacity-0 pointer-events-none transition-all duration-300">
              Twitter
            </span>
            <X className="h-[1.4em]" fill="currentColor" />
          </a>
        </li>
        <li className="icon youtube relative bg-white rounded-full m-[5px] w-[35px] h-[35px] text-lg flex justify-center items-center flex-col shadow-md cursor-pointer transition-all duration-200 hover:bg-[#ff0000] hover:text-white">
          <a
            href="https://www.youtube.com/asyncapi"
            target="_blank"
            rel="noreferrer"
            className="w-full h-full flex justify-center items-center"
            data-test="footer-youtube"
          >
            <span className="tooltip absolute top-0 text-sm bg-white text-white py-[5px] px-[8px] rounded-md shadow-md opacity-0 pointer-events-none transition-all duration-300">
              YouTube
            </span>
            <Youtube className="h-[1.4em]" fill="currentColor" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Socials;
