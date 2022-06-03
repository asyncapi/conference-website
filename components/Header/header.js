/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Scrollspy from "react-scrollspy";
import Pattern1 from "../illustrations/pattern1";
import Polygon from "../illustrations/polygon"

function Header() {
  return (
    <div
      style={{
        position: "relative",
        height: "70vh",
      }}
    >
      <div className="absolute">
        <img src="dots.svg" alt="dots"/>
      </div>
      <div className="absolute right-0">
        <Pattern1 className="w-72 sm:w-32" />
      </div>
      <div className="absolute flex justify-center flex-col items-center mt-20 w-full sm:px-32">
        <div>
          <h1 className="text-white text-7xl sm:text-4xl text-center font-bold leading-tight">
            Building the future of <br /> Event-Driven APIs <br /> Together.
          </h1>
          <p className="text-center mt-6 text-fainted-white text-lg sm:text-base">
            Celebrate 5 years of AsyncAPI at our Conference.
          </p>
          <div className="text-center mt-16">
            <div className="flex items-center justify-center">
              <h3 className="text-fainted-paint text-xl sm:text-lg">
                November, 2022
              </h3>
              <span className="ml-2 text-fainted-white">|</span>
              <h3 className="ml-2 text-fainted-paint font-bold text-xl  sm:text-lg">
                In-person & Virtual
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
                    Start
                  </button>
                </a>
              </Scrollspy>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 opacity-50 sm:hidden">
       <Polygon className="w-72" />
      </div>
    </div>
  );
}

export default Header;
