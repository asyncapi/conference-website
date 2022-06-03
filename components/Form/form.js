import React, { useState } from "react";
import Avatar from "../illustrations/avatar";
import Message from "../illustrations/message";
import Invitation from "../illustrations/invite";
import Calendar from "../illustrations/calendar";
import Location from "../illustrations/location";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import StepFour from "./stepFour";
import StepFive from "./stepFive";
import Pattern2 from "../illustrations/pattern2";

const fields = [
  {
    title: "Your Name",
    description: "Your details",
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
    description: "Best date",
    icon: <Calendar />,
  },
  {
    title: "Email",
    description: "Email address",
    icon: <Message />,
  }
];

function Form() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const onStepUpdate = (e, step) => {
    if (e) {
      e.preventDefault();
    }
    setStep(step);
  };
  let view = (
    <StepOne setStep={onStepUpdate} setForm={setFormData} data={formData} />
  );
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
      <StepFour setStep={onStepUpdate} setForm={setFormData} data={formData} />
    );
  }
    if (step === 5) {
      view = (
        <StepFive
          setStep={onStepUpdate}
          setForm={setFormData}
          data={formData}
        />
      );
    }
  return (
    <div className="p-5 relative mt-40 sm:mt-0" id="forms">
      <h1 className="text-white font-bold text-5xl sm:text-4xl">
        Share your opinion
      </h1>
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
          <div className="p-16 lg:p-0 lg:py-2 lg:pr-4">
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
                    <div className="md:hidden">
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
                        className={`${index === 5 && "hidden"}`}
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
        <div className="p-16 sm:p-4">
          <p className="text-fainted-white">Step {step}/5</p>
          {view}
          <div
            className="absolute bottom-0 right-0 rotate-0 opacity-50 sm:hidden"
            style={{
              transform: "scaleX(-1)",
            }}
          >
            <Pattern2 className="w-full sm:w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
