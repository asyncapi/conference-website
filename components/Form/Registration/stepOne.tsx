import React, { JSX } from 'react';
import Button from '../../Buttons/button';
import { CfpStepProps } from '../../../types/types';

function StepOneRegistration({ setStep, setForm, data }: CfpStepProps): JSX.Element {
  const fullName = data.fullName ?? '';
  const email = data.email ?? '';

  return (
    <form onSubmit={(e) => setStep(e, 2)} data-test="reg-step-one">
      <h1 id="step-one-heading" className="text-white font-bold text-4xl lg:text-3xl">Personal Info</h1>
      <p className="text-dark-600 border-b border-dark-700 pb-2 mb-2">Tell us who you are so we can prepare your ticket.</p>
      <div className=" space-y-2 last:space-y-6" role="group" aria-labelledby="step-one-heading">
        <div className='space-y-1'>
          <label htmlFor="fullName" className="text-dark-600 text-lg">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            required
            value={fullName}
            className="w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50E99] focus:ring-offset-2 focus:ring-offset-gray-900 border border-[#E50E99]"
            onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
            data-test="reg-step-one-name"
          />

        </div>

        <div className='space-y-1'>
          <label htmlFor="email" className="text-dark-600 text-lg block">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            required
            type="email"
            value={email}
            className="w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50E99] focus:ring-offset-2 focus:ring-offset-gray-900 border border-[#E50E99]"
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            data-test="reg-step-one-email"
          />
        </div>
        <Button
          className='w-full'
          type="submit"
          test="reg-step-one-next"
        >
          Next
        </Button>
      </div>
    </form>
  );
}

export default StepOneRegistration;
