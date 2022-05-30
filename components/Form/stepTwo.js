/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import Select from "../Select/select";

const options = [
  {
    value: "Virtual",
    label: "Virtual",
  },
  {
    value: "In-person",
    label: "In-person",
  },
];

function StepTwo({ setStep, setForm, data }) {
  const [value, setValue] = useState(null);
  useEffect(() => {
    setForm({ ...data, Type: value });
  }, [value]);
  return (
    <form className="mt-3 w-[30rem]" onSubmit={(e) => setStep(e, 3)}>
      <h1 className="text-white font-bold text-4xl">Preferable Conf type</h1>
      <p className="mt-3 text-fainted-white">
        Please select how you'd love to attend the conference
      </p>
      <div className="mt-3 border w-full border-solid border-y-fainted-gray divide-y" />
      <div className="mt-10">
        <Select
          options={options}
          title="Select conference type"
          setValue={setValue}
          multi={false}
        />
        <div className="float-right">
          <a
            className="mr-10 text-fainted-white cursor-pointer"
            onClick={() => setStep(null, 1)}
          >
            Back
          </a>
          <button
            type="submit"
            className="bg-tetiary-pink p-3 rounded-md text-white mt-3 w-36"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
}

export default StepTwo;
