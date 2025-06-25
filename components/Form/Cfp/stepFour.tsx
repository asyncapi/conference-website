/* eslint-disable react/no-unescaped-entities */
import React, { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import ActivityLoader from '../../illustration/activityLoader';
import Button from '../../Buttons/button';
import { CfpStepProps } from '../../../types/types';

function StepFour({ setStep, setForm, data }: CfpStepProps) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post(`/api/speakers/register`, data)
      .then((res) => {
        setSubmitting(false);
        if (res.status === 200) {
          setDisabled(true);
          setStep(e, 0);
        }
      })
      .catch((err) => {
        setSubmitting(false);
        toast.error('Failed to submit feedback. Try again', {
          duration: 5600,
        });
      });
  };
  return (
    <form className="mt-3" onSubmit={(e) => onSubmit(e)}>
      <h1 className="text-white font-bold text-4xl lg:text-3xl">
        Additional Information
      </h1>
      <p className="mt-3 text-dark-600">
        Notes will only be seen by reviewers during the CFP process. Therefore,
        it is important to use this space to explain any technical requirements
        or why you are best suited to speak on the subject, etc...
      </p>
      <div className="mt-3 border w-full border-solid border-y-dark-600 divide-y" />
      <div className="mt-10">
        <div className="text-dark-600 text-lg">Additional Information</div>
        <textarea
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          onChange={(e) => setForm({ ...data, AdditionalInfo: e.target.value })}
          data-test="step-four-additional"
        />

        <div className="mt-6 text-dark-600 text-md">
          By clicking submit, this means you agree to follow the{' '}
          <a
            className="underline"
            href="https://github.com/asyncapi/spec/blob/master/CODE_OF_CONDUCT.md"
            target="_blank"
            rel="noreferrer"
          >
            AsyncAPI Initiative Code of Conduct
          </a>
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
            test="step-four-next"
          >
            {submitting ? <ActivityLoader /> : 'Submit'}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default StepFour;
