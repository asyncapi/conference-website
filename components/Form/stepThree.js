/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import Select from "../Select/select";

const options1 = [
  {
    value: "Lightning talk",
    label: "Lightning talk(5mins)",
  },
  {
    value: "Session",
    label: "Session(45mins)",
  },
    {
    value: "Workshop",
    label: "Workshop(2h)",
  },
  {
    value: "Keynote",
    label: "Keynote(45mins)",
  },
];

const options2= [
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

function StepThree({ setStep, setForm, data }) {
  const [value, setValue] = useState({});
  useEffect(() => {
    setForm({ ...data, ...value});
  }, [value]);
  console.log(data)
  return (
    <form className="mt-3 w-[30rem] lg:w-[auto]" onSubmit={(e) => setStep(e, 4)}>
      <h1 className="text-white font-bold text-4xl lg:text-3xl">
        Session Info
      </h1>
      <p className="mt-3 text-fainted-white">
       Please provide your session title and description
      </p>
      <div className="mt-3 border w-full border-solid border-y-fainted-gray divide-y" />
          <div className="mt-10">
        <div className="text-fainted-white text-lg mb-4">Session Format</div>
        <Select
          options={options1}
          title="Select session format"
          setValue={(val) => setValue({...value, Format: val})}
          multi={false}
        />
        <div className="text-fainted-white text-lg mt-4 mb-4">Session Level</div>
        <Select
          options={options2}
          title="Select session level"
          setValue={(val) => setValue({...value, Level: val})}
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
            disabled={!data.Format || !data.Level && true}
            className="bg-tetiary-pink p-3 rounded-md text-white mt-3 w-36"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
}

export default StepThree;