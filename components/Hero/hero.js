import React from 'react'
import {FiCalendar,} from 'react-icons/fi'
import {MdOutlineLocationOn} from 'react-icons/md'
import dynamic from 'next/dynamic';

const GlobeComponent = dynamic(() => import('./Globe'), {
  loading: () => <Loader />,
  ssr: false
});

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-10 h-10 border-4 border-t-0 border-b-0 border-blue-500 rounded-full animate-spin"></div>
      <div className="mt-4 text-gray-600"></div>
    </div>
  );
};

const Hero = () => {
    return (
        <div className="flex flex-col justify-center  lg:flex-row h-screen bg-gradientToRight -mt-20 pl-6 bg-blend-soft-light">

          {/* Left Side */}
          <div className="flex flex-col justify-center items-start w-full lg:w-1/2  text-white p-10">
            <h1 className=" text-7xl font-extrabold mb-1">AsyncAPI Conf</h1>
            <h2 className="text-7xl font-extrabold mb-6">On Tour 2023</h2>
            <p className="text-sm mb-6">Join us for the first-ever AsyncAPI Conference on <br/> Tour, bringing the latest in async API technology to <br/> locations worldwide!</p>
            <div className="flex items-center mb-6">
              
              <div className="rounded-full bg-purple-500 p-2 mr-2 text-xl">
                <FiCalendar/>
              </div>
                <p className="text-white text-base pr-5">5-6 Nov, 2023</p>

              <div className="rounded-full bg-purple-500 p-2 mr-2 text-2xl ">
                <MdOutlineLocationOn/>
              </div>
                <p className="text-white text-base">5 Global Locations</p>
            </div>
            <div>
              <button className=" bg-buttonGradient text-white text-sm w-40 h-12 font-semibold rounded-sm py-2 px-4 mr-11">Buy Tickets</button>
              <button className=" bg-buttonGradient text-white text-sm w-40 h-12 font-semibold rounded-sm py-2 px-4">OR Register</button>
            </div>
          </div>
    
          {/* Right Side */}
          <div className="w-full lg:w-1/2 hidden lg:block">
            {/* Place your three.js code here to render the rotating globe */}
            <GlobeComponent />
          </div>

        </div>
      );
}

export default Hero

