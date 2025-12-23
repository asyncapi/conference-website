/* eslint-disable react/no-unescaped-entities */
import React, { FormEvent, useState, JSX } from 'react';
import Button from '../../Buttons/button';
import { CfpStepProps } from '../../../types/types';

function StepFourRegistration({ setStep, setForm, data }: CfpStepProps) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // No API integration yet — simulate submission
    setTimeout(() => {
      setSubmitting(false);
      setDisabled(true);
      setStep(e, 0);
    }, 600);
  };

  return (
    <form className="mt-3" onSubmit={(e) => onSubmit(e)}>
      <h1 className="text-white font-bold text-4xl lg:text-3xl">Review & Submit</h1>
      <p className="mt-3 text-dark-600">Review your details and submit your registration.</p>
      <div className="mt-3 border w-full border-solid border-y-dark-600 divide-y" />
      <div className="mt-10">
        <div className="text-dark-600 text-lg">Notes</div>
        <textarea
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          onChange={(e) => setForm({ ...data, notes: e.target.value })}
          data-test="reg-step-four-notes"
        />

        <div className="mt-6 text-dark-600 text-md">
          By clicking submit, you confirm the information is correct.
        </div>
        <div className="float-right mt-3 flex lg:flex-col-reverse lg:w-full">
          <a
            className="mr-10 text-dark-600 cursor-pointer lg:text-center lg:pl-10 lg:mt-5"
            onClick={() => !disabled && setStep(null, 3)}
          >
            Back
          </a>
          <Button
            type="submit"
            disabled={submitting || disabled}
            className="bg-tetiary-pink p-3 rounded-md text-white mt-3 w-36 lg:w-full lg:mt-5"
            test="reg-step-four-next"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default StepFourRegistration;
