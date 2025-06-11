import React, { useState, useEffect, useRef, FormEvent } from 'react';
import Confetti from 'react-confetti';
import StepOne from './Cfp/stepOne';
import StepTwo from './Cfp/stepTwo';
import StepThree from './Cfp/stepThree';
import StepFour from './Cfp/stepFour';
import cfpData from '../../config/cfp-data.json';
import { CfpForm } from '../../types/types';

type Field = {
  title: string;
  description: string;
  icon: string;
};

const fields: Field[] = [
  {
    title: 'Your Information',
    description: 'Your details',
    icon: '',
  },
  {
    title: 'Session Information',
    description: 'Session title and description',
    icon: '',
  },
  {
    title: 'Session Format',
    description: 'Session format and level',
    icon: '',
  },
  {
    title: 'Additional Information',
    description: 'Special request to organizers',
    icon: '',
  },
];

function Paper(): JSX.Element {
  const [step, setStep] = useState<number>(1);
  const confetiRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [formData, setFormData] = useState<Partial<CfpForm>>({});

  const onStepUpdate = (
    e: FormEvent<HTMLFormElement> | null,
    step: number
  ): void => {
    if (e) {
      e.preventDefault();
    }
    setStep(step);
  };
  useEffect(() => {
    if (confetiRef.current) {
      setHeight(confetiRef.current.clientHeight);
      setWidth(confetiRef.current.clientWidth);
    }
  }, []);
  const stepOne = (
    <StepOne setStep={onStepUpdate} setForm={setFormData} data={formData} />
  );
  let view: JSX.Element = stepOne;
  if (step === 1) {
    view = stepOne;
  }
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
  if (step === 0) {
    view = (
      <div className="flex items-center h-full">
        <div>
          <h1 className="text-2xl text-white font-bold mt-6">
            Your talk have been submitted successfully
          </h1>
        </div>
        <Confetti
          numberOfPieces={50}
          width={width}
          height={height}
          tweenDuration={40}
        />
      </div>
    );
  }

  return (
    <div
      className="py-28 px-6"
      id="forms"
      ref={confetiRef}
      data-test="cfp-form"
    >
      <div>
        <div className="lg:px-6 mt-5">
          <h1 className="text-white font-bold text-5xl lg:text-3xl">
            Submit your talk!
          </h1>
          <p className="mt-2 text-dark-500 text-lg">
            We are actively accepting speaker applications, <br /> Fill up the
            form to apply as a speaker.
          </p>
          <div className="flex mt-8 justify-between sm:flex-col items-center sm:items-start text-dark-500 text-sm">
            <p>
              P.S. We do not offer travel scholarships or financial support.
            </p>
            <p className="sm:mt-4">
              Application closes on {cfpData.CallEndDate}
            </p>
          </div>
        </div>
        <div className="mt-5 border-b border-[#333]" />
        <div className="flex lg:flex-col">
          <div className="lg:hidden border-r w-[30rem] border-[#333] min-h-[50vh]">
            <div className="p-6 pr-14 lg:p-0 lg:py-2 lg:pr-4 mt-12">
              {fields.map((field, i) => {
                const index = i + 1;
                return (
                  <div key={field.title} className=" w-full">
                    <div className="flex justify-between">
                      <div className="sm:hidden my-4">
                        <h3
                          className={`font-bold text-lg ${(index <= step && 'text-[#E50E99]') || 'text-white'}`}
                        >
                          {field.title}
                        </h3>
                        <p className="text-dark-600">{field.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-10 ml-24 lg:ml-0 w-full px-20 lg:px-0">
            <p className="text-dark-400">{step !== 0 && `Step ${step}/4`}</p>
            {view}
            <div className="absolute bottom-0 right-0 rotate-0 opacity-50 sm:hidden scale-x-[-1]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paper;
