/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Button from "../Button/button";
import Logo from "../illustrations/logo";
import Stroke1 from "../illustrations/stroke1";
import Stroke2 from "../illustrations/stroke2";
import Step from "../illustrations/stepLike";

const data = [
  {
    title: "What is the AsyncAPI Conference?",
    description:
      "At the 2022 AsyncAPI Conference, speakers from all around the world will join us online to present how they are using the AsyncAPI Specification in their real-world use cases, how they use tooling to support the specification, and how they have contributed to the project.",
    button: (
      <Button
        text="Visit the AsyncAPI Website"
        link="https://www.asyncapi.com/"
        className="text-[21px] py-[14px] px-[26px] mt-[32px]"
      />
    ),
  },
  {
    title: "Apply to be a sponsor",
    description:
      "We are in the process of looking for those interested in sponsoring the upcoming AsyncAPI Conference.",
    button: (
      <Button
        text="Become a sponsor"
        link="https://github.com/asyncapi/community/files/9568764/Sponsorship_Prospectus_2022_v2.pdf"
        className="text-[21px] py-[14px] px-[26px] mt-4 btn-gradient"
      />
    ),
  },
  {
    title: "Sign up for updates",
    description:
      "Subscribe to email notifications to receive updates on events like: when the official conference schedule is posted, virtual and in-person event details, and more.",
    button: (
      <div className="flex h-[56px] mt-[26px] items-center rounded-lg border border-dark-600">
        <input
          type="email"
          className="bg-transparent py-[14px] px-[26px] h-full w-3/4 text-[18px] focus:outline-none indent-3"
          placeholder="Your email address"
        />
        <Button
          text="Subscribe"
          className="text-sm h-full w-1/4 border-none rounded-none"
        />
      </div>
    ),
  },
];

function Header() {
  return (
    <div>
      <div className="mt-10 flex justify-center relative z-50 h-[43vh]">
        <div className="absolute flex flex-col items-center text-white w-2/4 sm:w-full">
          <Logo className="" height="112px" width="112px" />
          <div className="text-center leading-[7rem]">
            <h1 className="mt-5 text-[100px] sm:text-4xl font-black">
              AsyncAPI
            </h1>
            <h1 className="mt-5 text-[100px] sm:text-4xl -mt-1 font-black">
              {" "}
              Conf 2022
            </h1>
          </div>
          <p className="mt-4 text-[30px]">Virtual Tech Conference</p>
          <p className="mt-1 text-dark-400 text-[28px]">Nov 3-5</p>
          <div className="flex mt-4">
            <Button
              text="View Schedule"
              link="/schedule"
              className="text-[21px] py-[14px] px-[26px] backdrop-blur-xl"
            />
            <Button
              text="Register for free"
              link="https://cvent.me/R5G740"
              className="text-[21px] py-[14px] px-[26px] ml-4 btn-gradient"
            />
          </div>
        </div>
      </div>
      <img
        src="/img/architecture.svg"
        alt="architecture"
        className="mt-[60px] w-[100%]"
      />
      <div className="container mx-auto -mt-20 w-full flex justify-center items-center relative pb-[84px]">
        <div className="w-full relative">
          <div className="absolute w-full h-full">
            <div className="top-[270px] right-[20%] absolute">
              <Stroke1 className="mt-0 ml-[70px] w-[320px] h-[222px]" />
              <Stroke2 className="-mt-[240px] w-[320px] h-[222px] absolute z-[99]" />
            </div>
            <div className="w-full">
              <Step className="absolute right-0 bottom-0" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-white">
            {data.map((list, i) => (
              <div
                key={i}
                className="h-fit bg-[rgba(36, 30, 49, 0.8)] backdrop-blur-sm border rounded-lg border-dark-600 p-14"
              >
                <h1 className="font-bold text-[32px] mb-4">{list.title}</h1>
                <p className="text-[18px] text-dark-500 leading-[29px]">
                  {list.description}
                </p>
                {list.button}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
