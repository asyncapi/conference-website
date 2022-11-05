/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import YouTube from 'react-youtube-embed'
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
        target="_blank"
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
        link="https://github.com/asyncapi/community/files/9616803/Sponsorship_Prospectus_2022_v4.pdf"
        className="text-[21px] py-[14px] px-[26px] mt-[32px] btn-gradient"
      />
    ),
  },
];

function getConferenceDetails() {
  const day = new Date().getUTCDate();
  const month = new Date().getUTCMonth();
  const year = new Date().getUTCFullYear();

  // month=10 is November
  if (year > 2022 || month !== 10) {
    return;
  }

  switch (day) {
    // 3rd November
    case 3: return { day: 1, ytId: 'NTHsezlKBh8' };
    // 4th November
    case 4: return { day: 2, ytId: '8khuAfL7TSE' };
    // 5th November
    case 5: return { day: 3, ytId: 'R8PYWXDDZbI' };
  }
}

function Header() {
  const details = getConferenceDetails();

  return (
    <div>
      <div className="overflow-hidden">
        <div className="pt-10 md:pt-0 relative z-50 w-full">
          <div className="md:pt-10 text-center w-full md:relative">
            {/* Mobile BG Gradient */}
            <div className="mobile-headerbg lg:hidden"></div>

            {/* Content Container */}
            <div className="relative z-10">
              <Logo className="w-[72px] h-[72px] m-auto lg:w-[112px] lg:h-[112px]" />
              <div className="text-center text-white">
                <h1 className="mt-5 text-[120px] md:text-5xl font-[700] leading-[0.91em] tracking-[-0.03em]">
                  AsyncAPI
                </h1>
                <h1 className="mt-5 text-[120px] md:text-5xl -mt-1 font-[700] leading-[0.91em] tracking-[-0.03em]">
                  {" "}
                  Conf 2022
                </h1>
              </div>
              <h4 className="mt-8 text-[30px] font-[500] md:text-[20px] tracking-[0.03em] text-white">
                A Virtual Tech Conference
              </h4>
              <h4 className="mt-1 text-dark-400 text-center font-[400] text-[28px] tracking-[0.03em] md:text-[19px]">
                {details ? (
                  <span>Nov 3-5 * Online via live stream. Day {details.day} is running!</span>
                ) : (
                  <div>
                    <span className="block">Nov 3-5 * Online via live stream.</span>
                    <span className="block">Conference has ended. Good news, you can still watch the recording!</span>
                  </div>
                )}
              </h4>
              <div className="flex justify-center mt-8">
                {details ? (
                  <>
                    <Button
                      text="View Schedule"
                      link="/schedule"
                      className="text-[21px] py-[14px] px-[26px] backdrop-blur-xl md:text-[14px] md:px-[10px]"
                    />
                    <Button
                      text="Comment in #conference2022"
                      link="https://asyncapi.slack.com/archives/C047CGM2D2N"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[21px] py-[14px] px-[26px] ml-4 btn-gradient md:py-[10px] md:text-[14px]"
                    />
                  </>
                ) : (
                  <Button
                    text="Check playlist"
                    link="https://www.youtube.com/playlist?list=PLbi1gRlP7pijRiA32SU36hD_FW-2qyPhl"
                    className="text-[21px] py-[14px] px-[26px] ml-4 btn-gradient md:py-[10px] md:text-[14px]"
                  />
                )}
              </div>
            </div>

            {details && (
              <div className="my-12">
                <div className='mx-auto mt-8 max-w-7xl'>
                  <YouTube id={details.ytId} />
                </div>
              </div>
            )}

            {/* Image Container */}
            <div className="w-full max-w-[1600px] mx-auto md:absolute md:top-[-10px] overflow-hidden md:h-full">
              <img
                src="/img/architecture.svg"
                alt="architecture"
                className="w-full mt-[60px] w-[100%] md:w-[150%] md:max-w-[150%] md:left-[50%] md:translate-x-[-50%] md:absolute"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto h-[700px] w-full md:h-auto flex justify-center relative py-10">
        <div className="w-full relative md:h-full">
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
                <h1 className="font-[700] text-[32px] leading-[1.54em] mb-4 md:text-[20px]">
                  {list.title}
                </h1>
                <p className="text-[18px] md:text-[16px] text-dark-500 leading-[1.625em] font-[400]">
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
