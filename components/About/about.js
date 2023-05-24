import React from 'react'

const About = () => {
    return (
        <div className="flex justify-center items-center h-screen p-20 bg-[#1c1234]">
          <div className="bg-white w-1/2 h-1/2 rounded-lg border-2 border-white shadow-lg relative aspect-square bg-opacity-10">
            <div className="relative">
              <img
                src="/img/about-hall.png"
                alt="Image"
                className="rounded-lg absolute top-[-4rem] left-[-2rem]"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
            <h1 className="text-7xl font-bold text-center mb-8 text-white">
              About AsyncAPI
              <br />
              Conf2023
            </h1>
            <p className="text-xl text-center text-white">
              The AsyncAPI Conf2023 on Tour is planned to take the online event to the next level <br/> by hosting physical events in five different locations across the globe. Each location <br/> will feature its own keynote speakers, panels, and networking events, allowing <br/> attendees to experience the conference in person while still connecting with the <br/> larger global community.
            </p>
          </div>
        </div>
      );
}

export default About