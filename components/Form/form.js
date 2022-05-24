import React from 'react';
import Avatar from "../illustrations/avatar";
import Invitation from "../illustrations/invite";
import Calendar from "../illustrations/calendar";
import Location from "../illustrations/location";

const fields = [
  {
    title: "Your Name",
    description: "Your Details",
    icon: <Avatar />,
  },
  {
    title: "Preferable Type",
    description: "Choose the type peferable",
    icon: <Invitation />,
  },
  {
    title: "Location",
    description: "Desired location",
    icon: <Location />,
  },
  {
    title: "Date",
    description: "Best Date",
    icon: <Calendar />,
  },
];

function form() {
  return (
    <div className="p-5">
      <h1 className="text-white font-bold text-5xl ">Share your opinion</h1>
      <p className="mt-2 text-fainted-white text-lg">
        Fill up the form in other to help us make <br /> this event outstanding
      </p>
      <div
        className="mt-5"
        style={{
          borderBottom: "2px solid #2b2146",
        }}
      />
      <div className="flex">
        <div
          className="w-1/3"
          style={{
              borderRight: "2px solid #2b2146",
              minHeight: "50vh"
          }}
        >
          hello
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default form