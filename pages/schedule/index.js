/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Script from "next/script";

function index() {
  return (
    <div>
      <div className="h-[450px] flex flex-col justify-between relative overflow-hidden">
        <div className="schedule-bg" />
        <div className='relative'>
          <div className="absolute w-full flex justify-center z-[9] mt-10">
            <div className="container text-white text-center w-[1200px]">
              <h2 className="mt-5 text-[70px] md:text-4xl font-[400]">
                Conference Schedule
              </h2>
              <h4 className="mt-4 text-dark-400 font-[400] text-[22px] md:text-[15px]">
                This schedule is automatically displayed in Coordinated
                Universal Time (UTC). To see the schedule in your preferred
                timezone, please select it from the Timezone drop-down menu to
                the right, above "Filter by Date."
              </h4>
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