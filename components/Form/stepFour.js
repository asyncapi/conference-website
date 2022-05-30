/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import Select from "../Select/select";

const options = [
  "3-5 (Thursday-Saturday) November",
  "6-8 (Sunday-Tuesday) November",
  "7-9 (Monday-Wednesday) November",
  "9-11 (Wednesday-Friday) November",
  "10-12 (Thursday-Saturday) November",
  "13-15 (Sunday-Tuesday) November",
  "14-16 (Monday-Wednesday) November",
  "16-18 (Wednesday-Friday) November",
  "17-19 (Thursday-Saturday) November",
];

function StepThree({ setStep, setForm, data }) {
  const [value, setValue] = useState(null);
  useEffect(() => {
    setForm({ ...data, type: value });
  }, [value]);
  return (
    <form className="mt-3 w-[30rem]" onSubmit={(e) => setStep(e, 4)}>
      <h1 className="text-white font-bold text-4xl">Conference Date</h1>
      <p className="mt-3 text-fainted-white">
        Which month do you think is preferable?
      </p>
      <div className="mt-3 border w-full border-solid border-y-fainted-gray divide-y" />
      <div className="mt-10">
        <Select
          options={options}
          title="Select conference date"
          setValue={setValue}
        />
        <div className="float-right">
          <a
            className="mr-10 text-fainted-white cursor-pointer"
            onClick={() => setStep(null, 3)}
          >
            Back
          </a>
          <button
            type="submit"
            className="bg-tetiary-pink p-3 rounded-md text-white mt-3 w-36"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default StepThree;
