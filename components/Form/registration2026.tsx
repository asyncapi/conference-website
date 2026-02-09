import React, { useState, useEffect, useRef, FormEvent, JSX } from 'react';
import Confetti from 'react-confetti';
import Link from 'next/link';
import Button from '../Buttons/button';
import StepOne from './Registration/stepOne';
import StepTwo from './Registration/stepTwo';
import StepThree from './Registration/stepThree';
import StepFourRegistration from './Registration/stepFour';
import { CfpForm } from '../../types/types';

type Field = {
  title: string;
  description: string;
  icon: string;
};

const fields: Field[] = [
  { title: 'Personal Info', description: 'Your details', icon: '' },
  { title: 'Event Details', description: 'Event & ticket info', icon: '' },
  { title: 'Consents & Notes', description: 'Permissions and notes', icon: '' },
  { title: 'Review & Submit', description: 'Confirm and submit', icon: '' },
];

export default function Registration2026(): JSX.Element {
  const [step, setStep] = useState<number>(1);
  const confetiRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [formData, setFormData] = useState<Partial<CfpForm>>({});

  const onStepUpdate = (e: FormEvent<HTMLFormElement> | null, step: number): void => {
    if (e) e.preventDefault();
    setStep(step);
  };

  useEffect(() => {
    if (confetiRef.current) {
      setHeight(confetiRef.current.clientHeight);
      setWidth(confetiRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (stepHeadingRef.current && step !== 0) {
      stepHeadingRef.current.focus();
    }
  }, [step]);

  const stepOne = <StepOne setStep={onStepUpdate} setForm={setFormData} data={formData} />;
  let view: JSX.Element = stepOne;
  if (step === 1) view = stepOne;
  if (step === 2) view = <StepTwo setStep={onStepUpdate} setForm={setFormData} data={formData} />;
  if (step === 3) view = <StepThree setStep={onStepUpdate} setForm={setFormData} data={formData} />;
  if (step === 4) view = <StepFourRegistration setStep={onStepUpdate} setForm={setFormData} data={formData} />;
  if (step === 0)
    view = (
      <div className="flex flex-col items-center h-full gap-6">
        <div>
          <h1 className="text-2xl text-white font-bold mt-6">Registration submitted successfully</h1>
        </div>
        <div aria-hidden="true">
          <Confetti numberOfPieces={50} width={width} height={height} tweenDuration={40} />
        </div>
        <div className="mt-4">
          <Link href="/">
            <Button className="bg-tetiary-pink p-3 rounded-md text-white" type="button">
              Back to Conference {new Date().getFullYear()}
            </Button>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="py-28 px-6" id="registration-2026" ref={confetiRef}>
      {/* Skip link for keyboard users */}
      <a
        href="#registration-form"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#E50E99] focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to registration form
      </a>

      <div className="lg:px-6 mt-5">
        <h1 className="text-white font-bold text-5xl lg:text-3xl">Conference 2026 Registration</h1>
        <p className="mt-2 text-dark-500 text-lg">Please provide your details to register for the event.</p>
        <div className="flex mt-8 justify-between sm:flex-col items-center sm:items-start text-dark-500 text-sm">
          <p>P.S. We will not post your data publicly.</p>
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
                      <h3 className={`font-bold text-lg ${(index <= step && 'text-[#E50E99]') || 'text-white'}`}>
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
        <div className="p-10 ml-24 lg:ml-0 w-full px-20 lg:px-0" id="registration-form">
          <p className="text-dark-400" aria-live="polite">{step !== 0 && `Step ${step}/4`}</p>
          <div ref={stepHeadingRef} tabIndex={-1} className="outline-none">
            {view}
          </div>
        </div>
      </div>
    </div>
  );
}
