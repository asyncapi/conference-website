/* eslint-disable react/no-unescaped-entities */
import React, { JSX } from 'react';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';
import Button from '../Buttons/button';
import Image from 'next/image';
import Download from '../illustration/download';

function About(): JSX.Element {
  return (
    <div
      className="p-24 lg:pt-8 container flex items-center justify-center w-full"
      data-test="about-section"
    >
      <div className="w-[1120px] lg:w-full flex lg:flex-col-reverse items-center justify-between">
        <div className="lg:mt-16 bg-[url('/img/about.jpeg')]  bg-center bg-cover w-[450px] h-[550px] sm:w-[100%] sm:h-[500px] rounded-[30px]"></div>
        <div className="w-[600px] ml-10 lg:ml-0 lg:w-full lg:text-center">
          <div className="flex items-center lg:justify-center">
            <div className="text-lg sm:text-sm text-white font-semi-bold border-b-2 border-blue-400 mb-1">
              About The Event
            </div>
          </div>
          <Heading typeStyle="heading-md" className="text-gradient lg:mt-10">
            AsyncAPI Conference
          </Heading>
          <Paragraph
            typeStyle="body-lg"
            className="mt-6"
            textColor="text-gray-200"
          >
            The AsyncAPI Conference is an official event created by the AsyncAPI
            Initiative. This conference is aimed primarily at the community to
            share and exchange experiences between existing users and new
            members. We plan to integrate new members into the community and
            expand their knowledge about the project.
          </Paragraph>
          <Paragraph
            typeStyle="body-lg"
            className="mt-6"
            textColor="text-gray-200"
          >
            We are currently looking for sponsors, for more details please read
            our Sponsorship Prospectus.
          </Paragraph>
          <div
            className="mt-10 flex gap-4 sm:flex-col lg:justify-center"
            data-test="prospectus-download"
          >
            <a
              className="flex justify-center"
              href="https://opencollective.com/asyncapi/events/asyncapi-conference-e9fd5b06"
              target="_blank"
              rel="noreferrer"
            >
              <Button type="button" className="w-[200px]" text="Become a sponsor now"/>
            </a>
            <a
              className="flex justify-center "
              href="/pdf/conf-2025.pdf"
              download={`conf ${new Date().getFullYear()}.pdf`}
            >
              <Button 
                type="button" 
                outline={true} 
                className="w-[240px] border"
                text="Sponsorship prospectus"
                icon={<Download />}
                iconPosition="left"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
