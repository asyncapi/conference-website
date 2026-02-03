/* eslint-disable react/no-unescaped-entities */
import React, { JSX, useState } from 'react';
import Button from '../../Buttons/button';
import { CfpStepProps } from '../../../types/types';

import { isValidEmail } from '../../../utils/validation';

function StepOneRegistration({ setStep, setForm, data }: CfpStepProps): JSX.Element {
  const [touched, setTouched] = useState(false);

  const fullName = (data as any).fullName || (data as any).Fullname || '';
  const email = (data as any).email || (data as any).Email || '';

  const isValid = fullName.trim().length > 0 && isValidEmail(email.trim());

  return (
    <form
      className="mt-3"
      onSubmit={(e) => setStep(e, 2)}
      data-test="reg-step-one"
      onBlur={() => setTouched(true)}
    >
      <h1 className="text-white font-bold text-4xl lg:text-3xl">Personal Info</h1>
      <p className="mt-3 text-dark-600">Tell us who you are so we can prepare your ticket.</p>
      <div className="mt-3 border w-full border-solid border-dark-400 divide-y" />
      <div className="mt-10">
        <div className="text-dark-600 text-lg">Full name</div>
        <input
          required
          value={fullName}
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          onChange={(e) => setForm((prev: any) => ({ ...prev, fullName: e.target.value }))}
          data-test="reg-step-one-name"
        />
        <div className="text-dark-600 text-lg mt-5">Email address</div>
        <input
          required
          type="email"
          value={email}
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          onChange={(e) => setForm((prev: any) => ({ ...prev, email: e.target.value }))}
          data-test="reg-step-one-email"
        />

        <div className="mt-6">
          <Button
            type="submit"
            className="bg-tetiary-pink p-3 rounded-md text-white mt-6 float-right w-36 lg:w-full lg:mt-8"
            disabled={!isValid}
            test="reg-step-one-next"
          >
            Next
          </Button>
        </div>
      </div>
    </form>
  );
}

export default StepOneRegistration;
