/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, JSX } from 'react';
import Select from '../../Select/select';
import Button from '../../Buttons/button';
import { CfpStepProps, SelectOptions } from '../../../types/types';

const options1: SelectOptions[] = [
  {
    value: 'Session',
    label: 'Session(20 - 25mins)',
  },
];

const options2: SelectOptions[] = [
  {
    value: 'Introductory and overview',
    label: 'Introductory and overview',
  },
  {
    value: 'Intermediate',
    label: 'Intermediate',
  },
  {
    value: 'Advance',
    label: 'Advance',
  },
  {
    value: 'Expert',
    label: 'Expert',
  },
];

function StepThree({ setStep, setForm, data }: CfpStepProps): JSX.Element {
  const [value, setValue] = useState<Record<string, string>>({});

  useEffect(() => {
    setForm({ ...data, ...value });
  }, [value]);

  return (
    <form className="mt-3" onSubmit={(e) => setStep(e, 4)}>
      <h1 className="text-white font-bold text-4xl lg:text-3xl">
        Session Info
      </h1>
      <p className="mt-3 text-dark-600">
        Please provide your session title and description.
      </p>
      <p className="mt-4 text-sm text-dark-600">
        The sessions are expected to feature in-person presentations.
      </p>
      <div className="mt-3 border w-full border-solid border-y-dark-600 divide-y" />
      <div className="mt-10">
        <div className="text-dark-600 text-lg mb-4">Session Format</div>
        <Select
          options={options1}
          setValue={(val: string) => setValue({ ...value, Format: val })}
          multi={undefined}
          dataTest="step-three-format"
        />
        <div className="text-dark-600 text-lg mt-4 mb-4">Session Level</div>
        <Select
          options={options2}
          setValue={(val) => setValue({ ...value, Level: val })}
          multi={undefined}
          dataTest="step-three-level"
        />
        <div className="float-right mt-3 flex lg:flex-col-reverse lg:w-full">
          <a
            className="mr-10 text-dark-600 cursor-pointer lg:text-center lg:pl-10 lg:mt-5"
            onClick={() => setStep(null, 2)}
          >
            Back
          </a>
          <Button
            type="submit"
            disabled={!data.Description || (!data.Title && true)}
            className="bg-tetiary-pink p-3 rounded-md text-white mt-3 w-36 lg:w-full lg:mt-5"
            test="step-three-next"
          >
            Next
          </Button>
        </div>
      </div>
    </form>
  );
}

export default StepThree;
