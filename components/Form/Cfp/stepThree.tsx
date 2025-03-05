/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import Select from "../select";
import Button from "../../Buttons/button";

type Option = {
  value: string;
  label: string;
};

type StepThreeProps = {
  setStep: (e: React.FormEvent<HTMLFormElement> | null, step: number) => void;
  setForm: (formData: Record<string, any>) => void;
  data: {
    Description?: string;
    Title?: string;
    Format?: Option;
    Level?: Option;
  };
};

const options1: Option[] = [
  {
    value: "Session",
    label: "Session(20 - 25mins)",
  },
];

const options2: Option[] = [
  {
    value: "Introductory and overview",
    label: "Introductory and overview",
  },
  {
    value: "Intermediate",
    label: "Intermediate",
  },
  {
    value: "Advance",
    label: "Advance",
  },
  {
    value: "Expert",
    label: "Expert",
  },
];

function StepThree({ setStep, setForm, data }: StepThreeProps) {
  const [value, setValue] = useState<Record<string, Option>>({});

  useEffect(() => {
    setForm({ ...data, ...value });
  }, [value, data, setForm]);

  return (
    <form
      className="mt-3 w-[30rem] lg:w-[auto]"
      onSubmit={(e) => {
        e.preventDefault();
        setStep(e, 4);
      }}
    >
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
        <label className="text-dark-600 text-lg mb-4 block">
          Session Format
        </label>
        <Select
          options={options1}
          title="Select session format"
          setValue={(val: Option) => setValue({ ...value, Format: val })}
          multi={false}
          dataTest="step-three-format"
        />

        <label className="text-dark-600 text-lg mt-4 mb-4 block">
          Session Level
        </label>
        <Select
          options={options2}
          title="Select session level"
          setValue={(val: Option) => setValue({ ...value, Level: val })}
          multi={false}
          dataTest="step-three-level"
        />

        <div className="float-right mt-3 lg:flex lg:flex-col-reverse lg:w-full">
          <a
            className="mr-10 text-dark-600 cursor-pointer lg:text-center lg:pl-10 lg:mt-5"
            onClick={() => setStep(null, 2)}
          >
            Back
          </a>
          <Button
            type="submit"
            disabled={!data.Description || !data.Title}
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
