/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";
import Scrollspy from "react-scrollspy";
import pattern1 from "../illustrations/pattern1.svg";
import dots from "../illustrations/dots.svg";
import pattern2 from "../illustrations/Group 1.svg";

function Header() {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <div className="absolute">
        <Image src={dots} alt="dots" />
      </div>
      <div className="absolute right-0">
        <Image src={pattern1} alt="pattern" />
      </div>
      <div className="absolute flex justify-center flex-col items-center mt-20 w-full">
        <div>
          <h1 className="text-white text-7xl text-center font-bold leading-tight">
            Building the future of <br /> APIs Together.
          </h1>
          <p className="text-center mt-6 text-fainted-white text-lg">
            Celebrate 3 years of AsyncAPI at our 2nd Global Community <br />
            Conference. October 26, 2021 9am-1pm PT / Online.
          </p>
          <div className="text-center mt-16">
            <div className="flex items-center justify-center">
              <h3 className="text-fainted-paint text-xl">
                Semptember 22, 2022
              </h3>
              <span className="ml-2 text-fainted-white">|</span>
              <h3 className="ml-2 text-fainted-paint font-bold text-xl">
                ONLINE & OFFLINE
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-center mt-12">
            <div className="w-96 h-12 p-2 bg-dark-paint rounded-md flex items-center justify-between">
              <input
                disabled={true}
                placeholder="Click the button to start survey"
                className="h-full bg-transparent outline-none text-white w-5/6"
              />
              <Scrollspy items={["forms"]}>
                <a href="#forms">
                  <button className="bg-tetiary-pink p-2 rounded-md text-white">
                    Register
                  </button>
                </a>
              </Scrollspy>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 opacity-50">
        <Image src={pattern2} alt="pattern" />
      </div>
    </div>
  );
}

export default Header;
