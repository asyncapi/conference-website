/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Navbar from '../../components/Navbar/navbar'
import Script from "next/script";

function index() {
  return (
    <div>
      <Navbar />
      <div className=" container text-white">
        <h1 className="mt-5 text-[100px] sm:text-4xl font-black">Schedule</h1>
        <p className="mt-4 text-dark-400 text-[28px]">
          This schedule is automatically displayed in Irish Standard Time (UTC
          +1). To see the schedule in your preferred timezone, please select
          from the drop-down menu to the right, above "Filter by Date."
        </p>
      </div>
      <div className="mt-20 speakers-bg">
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