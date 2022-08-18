/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Button from "../Button/button";
import Logo from "../illustrations/logo";
import Stroke1 from "../illustrations/stroke1";
import Stroke2 from "../illustrations/stroke2";
import Step from "../illustrations/stepLike";

function Header() {
  return (
    <div>
      <div className="mt-10 flex justify-center relative z-50 h-[43vh]">
        <div className="absolute flex flex-col items-center text-white w-2/4 sm:w-full">
          <Logo className="" height="112px" width="112px" />
          <h1 className="mt-5 text-7xl sm:text-4xl font-black"> AsyncAPI</h1>
          <h1 className="mt-5 text-7xl sm:text-4xl -mt-1 font-black">
            {" "}
            Conf 2022
          </h1>
          <p className="mt-4 text-lg">
            An In-person and Virtual Tech Conference
          </p>
          <p className="mt-1 text-dark-400">Nov 6-8 * Barcelona, Spain</p>
          <div className="flex mt-4">
            <Button text="More Info" className="text-sm p-2" />
            <Button
              text="Become a speaker"
              className="text-sm p-2 ml-4 btn-gradient"
            />
          </div>
        </div>
      </div>
      <img src="/img/architecture.svg" alt='architecture' className="-mt-10 w-[100%]" />
      <div className="container mx-auto -mt-20 w-full flex justify-center items-center relative">
        <div className="w-full relative">
          <div className="absolute bg-red w-full">
            <div className="right-[15rem] top-[120px] absolute">
              <Stroke1 className="mt-0 ml-[50px] mr-[40px] w-[160px] h-[200px]" />
              <Stroke2 className="-mt-[220px] w-[160px] h-[200px] absolute z-50" />
            </div>
            <div className="w-full">
              <Step className="absolute w-[220px] right-0 top-[12rem]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-white">
            <div className="h-fit bg-[rgba(36, 30, 49, 0.8)] backdrop-blur-sm border rounded-lg border-dark-600 p-14">
              <h1 className="font-bold text-lg mb-4">
                What is the AsyncAPI Conference?
              </h1>
              <p className="text-xs text-dark-500 leading-4">
                At the 2022 AsyncAPI Conference, speakers from all around the
                world will take the stage in Barcelona, Spain where they will
                have the opportunity to present how they are using the AsyncAPI
                Specification in their real-world use cases, how they use
                tooling to support the specification, and how they have
                contributed to the project.
              </p>
              <Button
                text="Visit the AsyncAPI Website"
                className="text-sm p-2 mt-4"
              />
            </div>
            <div className="h-fit bg-[rgba(36, 30, 49, 0.8)] backdrop-blur-sm border rounded-lg border-dark-600 p-14">
              <h1 className="font-bold text-lg mb-4">Apply to be a speaker</h1>
              <p className="text-xs text-dark-500 leading-4">
                We are in the process of looking for those interested in giving
                a talk at the upcoming AsyncAPI Conference.
              </p>
              <Button
                text="Submit a proposal"
                className="text-sm p-2 mt-4 btn-gradient"
              />
            </div>
            <div className="h-fit bg-[rgba(36, 30, 49, 0.8)] backdrop-blur-sm border rounded-lg border-dark-600 p-14">
              <h1 className="font-bold text-lg mb-4">Sign up for updates</h1>
              <p className="text-xs text-dark-500 leading-4">
                Subscribe to email notifications to receive updates on events
                like: when the official conference schedule is posted, virtual
                and in-person event details, and more.
              </p>
              <div className="flex mt-4 items-center h-10 rounded-sm border border-dark-600">
                <input
                  type="email"
                  className="bg-transparent h-full w-3/4 text-sm focus:outline-none indent-3"
                  placeholder="Your email address"
                />
                <Button
                  text="Subscribe"
                  className="text-sm h-full w-1/4 border-none rounded-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
