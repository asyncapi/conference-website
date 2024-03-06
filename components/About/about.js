/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Heading from "../Typography/heading";
import Paragraph from "../Typography/paragraph";
import Button from "../Buttons/button";
import { CommonUtils } from "../../utils/common-utils";

function About({ year = CommonUtils.getCurrentYear(), isEnded = false }) {
  return (
    <div className="p-24 container flex items-center justify-center w-full">
      <div className="w-[1120px] lg:w-full flex lg:flex-col-reverse items-center justify-between">
        <div
          style={{ "--image-url": `url('/img/about.jpeg')` }}
          className="lg:mt-16 bg-[image:var(--image-url)] bg-center bg-cover w-[450px] h-[550px] sm:w-[100%] sm:h-[500px] rounded-[30px]"
        ></div>
        <div className="w-[600px] ml-10 lg:ml-0 lg:w-full lg:text-center">
          <div className="flex items-center lg:justify-center">
            <div className="w-[40px] h-[3px] bg-blue-400" />
            <div className="ml-4 text-lg sm:text-sm text-white font-semi-bold">
              About The Event
            </div>
          </div>
          <Heading typeStyle="heading-md" className="text-gradient lg:mt-10">
            AACoT'{year}
          </Heading>
          <Paragraph
            typeStyle="body-lg"
            className="mt-6"
            textColor="text-gray-200"
          >
            The AsyncAPI Conf on Tour is an official event created by the
            AsyncAPI Initiative. This conference is aimed primarily at the
            community to share and exchange experiences between existing users
            and new members. We plan to integrate new members into the community
            and expand their knowledge about the project.
          </Paragraph>
          {!isEnded?<Paragraph
            typeStyle="body-lg"
            className="mt-6"
            textColor="text-gray-200"
          >
            We are currently looking for sponsors, for more details please read
            our Sponsorship Prospectus.
          </Paragraph>:null}
          <div className="mt-10 flex">
            <a
              href="https://opencollective.com/asyncapi/events/asyncapi-conference-on-tour-6b3c0aa1"
              target="_blank"
              rel="noreferrer"
            >
              <Button className="w-[200px]">Become a sponsor now</Button>
            </a>
            <a
              href="https://drive.google.com/file/d/15rQ7cp-LLmxSCcAb2aBFitgJkGhYXBrd/view"
              target="_blank"
              rel="noreferrer"
            >
              <Button overlay={true} className="w-[200px] ml-4 border">
                Sponsorship prospectus
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
