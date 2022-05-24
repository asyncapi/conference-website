import React, { useState, useEffect } from "react";
import Avatar from "../illustrations/avatar";
import Invitation from "../illustrations/invite";
import Calendar from "../illustrations/calendar";
import Location from "../illustrations/location";
import StepOne from "./stepOne";

const fields = [
  {
    title: "Your Name",
    description: "Your Details",
    icon: <Avatar />,
  },
  {
    title: "Preferable Type",
    description: "Type peferable",
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

function Form() {
  const [active, setActive] = useState(0);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

  let view = <StepOne steStep={setStep} setForm={setFormData} data={formData} />;
  if (step === 2) {
    view = <h1>H</h1>;
  }
    useEffect(() => {
        console.log(formData);
    },[formData])
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
          className="w-1/4"
          style={{
            borderRight: "2px solid #2b2146",
            minHeight: "50vh",
          }}
        >
          <div className="p-16">
            {fields.map((field, i) => {
              return (
                <div
                  key={field.title}
                  style={{
                    height: "14vh",
                  }}
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        {field.title}
                      </h3>
                      <p className="text-fainted-white">{field.description}</p>
                    </div>
                    <div className="">
                      <div
                        className={`ml-3 w-12 h-12 rounded-full ${
                          active === i || active > i
                            ? "bg-tetiary-pink"
                            : "bg-fainted-gray"
                        } flex items-center justify-center`}
                      >
                        {field.icon}
                      </div>
                      <div
                        className={`${i === 3 && "hidden"}`}
                        style={{
                          height: "100%",
                          borderRight: `1px solid ${
                            active === i || active > i ? "#E50E99" : "white"
                          }`,
                          marginRight: "24px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-16">
          <p className="text-fainted-white">Step {step}/5</p>
          {view}
        </div>
      </div>
    </div>
  );
}

export default Form;
