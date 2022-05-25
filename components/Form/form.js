import React, { useState } from "react";
import Image from "next/image";
import Avatar from "../illustrations/avatar";
import Invitation from "../illustrations/invite";
import Calendar from "../illustrations/calendar";
import Location from "../illustrations/location";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import StepFour from "./stepFour";
import pattern3 from "../illustrations/Group 3.svg";

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
    const [step, setStep] = useState(3);
    const [formData, setFormData] = useState({});
  const onStepUpdate = (e, step) => {
    if (e) {
              e.preventDefault();
      }
      setStep(step);
    };
  let view = <StepOne setStep={onStepUpdate} setForm={setFormData} data={formData} />;
  if (step === 2) {
    view = (
      <StepTwo setStep={onStepUpdate} setForm={setFormData} data={formData} />
    );
  }
    if (step === 3) {
      view = (
        <StepThree setStep={onStepUpdate} setForm={setFormData} data={formData} />
      );
    }
      if (step === 4) {
        view = (
          <StepFour
            setStep={onStepUpdate}
            setForm={setFormData}
            data={formData}
          />
        );
      }
  return (
    <div className="p-5 relative">
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
              const index = i + 1;
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
                          step === index || step > index
                            ? "bg-tetiary-pink"
                            : "bg-fainted-gray"
                        } flex items-center justify-center`}
                      >
                        {field.icon}
                      </div>
                      <div
                        className={`${index === 4 && "hidden"}`}
                        style={{
                          height: "100%",
                          borderRight: `1px solid ${
                            step === index || step > index ? "#E50E99" : "white"
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
          <div className="absolute bottom-0 right-0 opacity-50">
            <Image src={pattern3} alt="dots" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
