import React, { useState } from 'react'
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from './stepThree';
import StepFour from './stepFour';

const fields = [
  {
    title: "Your Information",
    description: "Your details",
    icon: "",
  },
  {
    title: "Session Information",
    description: "Session title and description",
    icon: "",
  },
  {
    title: "Session Format",
    description: "Session format and level",
    icon: "",
  },
  {
    title: "Additional Information",
    description: "Special request to organizers",
    icon: "",
  },
];



function Paper() {
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

  return (
    <div className="relative mt-10 sm:mt-0" id="forms">
      <h1 className="text-white font-bold text-5xl lg:text-3xl">
        Submit your talk
      </h1>
      <p className="mt-2 text-fainted-white text-lg">
        Fill up the form in other to help us make <br /> this event outstanding
      </p>
      <div
        className="mt-5"
        style={{
          borderBottom: "1px solid #333",
        }}
      />
      <div className="flex lg:flex-col">
        <div
          className="w-1/4 lg:hidden"
          style={{
            borderRight: "1px solid #333",
            minHeight: "50vh",
          }}
        >
          <div className="p-16 lg:p-0 lg:py-2 lg:pr-4 mt-12">
            {fields.map((field, i) => {
              const index = i ;
              return (
                <div
                      key={field.title}
                      className='h-[100px]'
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
                        className={`${index === 3 && "hidden"}`}
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
        <div className="p-10 lg:p-1">
          <p className="text-fainted-white">Step {step}/4</p>
          {view}
          <div
            className="absolute bottom-0 right-0 rotate-0 opacity-50 sm:hidden"
            style={{
              transform: "scaleX(-1)",
            }}
          >
          </div>
        </div>
      </div>
      </div>
  )
}

export default Paper