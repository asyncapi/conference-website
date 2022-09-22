/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Navbar from '../../components/Navbar/navbar'
import Script from "next/script";

function index() {
  return (
    <div>
      <Navbar />
      <div className="h-[450px] flex flex-col justify-between relative overflow-hidden">
        <div className="schedule-bg" />
        <div className='relative'>
          <div className="absolute w-full flex justify-center z-[9]">
            <div className="container text-white text-center w-[1200px]">
              <h1 className="mt-5 text-[100px] sm:text-4xl font-black">
                Schedule
              </h1>
              <p className="mt-4 text-dark-400 text-[28px]">
                This schedule is automatically displayed in Coordinated
                Universal Time (UTC). To see the schedule in your preferred
                timezone, please select it from the Timezone drop-down menu to
                the right, above "Filter by Date."
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between overflow-hidden">
          <img
            src="/img/scheduleArcLeft.svg"
            alt="architect"
            className="w-[700px]"
          />
          <img
            src="/img/scheduleArcRight.svg"
            alt="architect"
            className="w-[700px]"
          />
        </div>
        {/* <div className="flex justify-between relative mt-60 overflow-hidden">
          <img
            src="/img/scheduleArcLeft.svg"
            alt="architect"
            className="w-[100%]"
          />
          <img
            src="/img/scheduleArcRight.svg"
            alt="architect"
            className="w-[100%]"
          />
          <div className="absolute w-full -top-[230px] flex justify-center">
            <div className="container text-white text-center w-[1200px]">
              <h1 className="mt-5 text-[100px] sm:text-4xl font-black">
                Schedule
              </h1>
              <p className="mt-4 text-dark-400 text-[28px]">
                This schedule is automatically displayed in Coordinated
                Universal Time (UTC). To see the schedule in your preferred
                timezone, please select it from the Timezone drop-down menu to
                the right, above "Filter by Date."
              </p>
            </div>
          </div>
        </div> */}
      </div>
      <div className="bg-white">
        <a id="sched-embed" href="//asyncapi2022.sched.com/"></a>
      </div>
      <Script
        type="text/javascript"
        src="//asyncapi2022.sched.com/js/embed.js"
      />
    </div>
  );
}

export default index