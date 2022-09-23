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
    title: "Become a sponsor",
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
];

function Header() {
  return (
    <div>
      <div>
        <div className="mobile-headerbg lg:hidden"></div>
        <div className="mt-10 flex justify-center relative z-50 h-[43vh] md:absolute md:w-full">
          <div className="absolute flex flex-col items-center text-white w-2/4 md:w-full md:relative">
            <Logo className="w-[72px] h-[72px] lg:w-[112px] lg:h-[112px]" />
            <div className="text-center leading-[7rem]">
              <h1 className="mt-5 text-[100px] md:text-5xl font-black">
                AsyncAPI
              </h1>
              <h1 className="mt-5 text-[100px] md:text-5xl -mt-1 font-black">
                {" "}
                Conf 2022
              </h1>
            </div>
            <h4 className="mt-4 text-[30px] font-[500] md:text-[20px]">
              A Virtual Tech Conference
            </h4>
            <h4 className="mt-1 text-dark-400 text-center font-[400] text-[28px] md:text-[19px]">
              Nov 3-5 * Online via live stream
            </h4>
            <div className="flex mt-4">
              <Button
                text="View Schedule"
                link="/schedule"
                className="text-[21px] px-[26px] backdrop-blur-xl md:text-[14px] md:px-[10px]"
              />
              <Button
                text="Register for free"
                link="https://cvent.me/R5G740"
                className="text-[21px] py-[14px] px-[26px] ml-4 btn-gradient md:py-[10px] md:text-[14px]"
              />
            </div>
          </div>
        </div>
        <img
          src="/img/architecture.svg"
          alt="architecture"
          className="mt-[60px] w-[100%]"
        />
      </div>
      <div className="container -mt-20 w-full flex justify-center items-center relative pb-[84px] md:mt-[200px]">
        <div className="w-full relative lg:h-[100vh]">
          <div className="absolute w-full h-full">
            <div className="top-[270px] right-[20%] absolute md:hidden">
              <Stroke1 className="mt-0 ml-[70px] w-[320px] h-[222px]" />
              <Stroke2 className="-mt-[240px] w-[320px] h-[222px] absolute z-[99]" />
            </div>
            <div className="w-full md:hidden">
              <Step className="absolute right-0 bottom-0" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 text-white">
            {data.map((list, i) => (
              <div
                key={i}
                className="h-fit bg-[rgba(36, 30, 49, 0.8)] backdrop-blur-sm border rounded-lg border-dark-600 p-14 md:p-8"
              >
                <h1 className="font-bold text-[32px] mb-4 md:text-[20px]">
                  {list.title}
                </h1>
                <p className="text-[18px] md:text-[16px] text-dark-500 leading-[29px] font-[300]">
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
