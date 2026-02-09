/* eslint-disable react/no-unescaped-entities */
import React, { JSX, useState } from 'react';
import Button from '../../Buttons/button';
import { CfpStepProps } from '../../../types/types';

import { isValidEmail } from '../../../utils/validation';

function StepOneRegistration({ setStep, setForm, data }: CfpStepProps): JSX.Element {
  const [touched, setTouched] = useState(false);

  const fullName = data.fullName ?? '';
  const email = data.email ?? '';

  const isValid = fullName.trim().length > 0 && isValidEmail(email.trim());

  return (
    <form
      className="mt-3"
      onSubmit={(e) => setStep(e, 2)}
      data-test="reg-step-one"
      onBlur={() => setTouched(true)}
    >
      <h1 id="step-one-heading" className="text-white font-bold text-4xl lg:text-3xl">Personal Info</h1>
      <p className="mt-3 text-dark-600">Tell us who you are so we can prepare your ticket.</p>
      <div className="mt-3 border w-full border-solid border-dark-400 divide-y" />
      <div className="mt-10" role="group" aria-labelledby="step-one-heading">
        <label htmlFor="fullName" className="text-dark-600 text-lg">
          Full name <span aria-hidden="true">*</span>
        </label>
        <input
          id="fullName"
          required
          aria-required="true"
          aria-invalid={touched && fullName.trim().length === 0}
          aria-describedby={touched && fullName.trim().length === 0 ? "fullName-error" : undefined}
          value={fullName}
          className="mt-3 w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50E99] focus:ring-offset-2 focus:ring-offset-gray-900 border border-[#E50E99]"
          onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
          data-test="reg-step-one-name"
        />
        {touched && fullName.trim().length === 0 && (
          <p id="fullName-error" className="text-red-400 text-sm mt-1" role="alert">
            Full name is required
          </p>
        )}

        <label htmlFor="email" className="text-dark-600 text-lg mt-6 block">
          Email address <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          required
          type="email"
          aria-required="true"
          aria-invalid={touched && !isValidEmail(email.trim())}
          aria-describedby={touched && !isValidEmail(email.trim()) ? "email-error" : undefined}
          value={email}
          className="mt-3 w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50E99] focus:ring-offset-2 focus:ring-offset-gray-900 border border-[#E50E99]"
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          data-test="reg-step-one-email"
        />
        {touched && !isValidEmail(email.trim()) && (
          <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">
            Please enter a valid email address
          </p>
        )}

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
