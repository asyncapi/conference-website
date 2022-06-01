/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import Select from "../Select/select";

const options = [
  {
    value: "3-5 (Thursday-Saturday) November",
    label: "3-5 (Thursday-Saturday) November",
  },
  {
    value: "6-8 (Sunday-Tuesday) November",
    label: "6-8 (Sunday-Tuesday) November",
  },
  {
    value: "7-9 (Monday-Wednesday) November",
    label: "7-9 (Monday-Wednesday) November",
  },
  {
    value: "9-11 (Wednesday-Friday) November",
    label: "9-11 (Wednesday-Friday) November",
  },
  {
    value: "10-12 (Thursday-Saturday) November",
    label: "10-12 (Thursday-Saturday) November",
  },
  {
    value: "13-15 (Sunday-Tuesday) November",
    label: "13-15 (Sunday-Tuesday) November",
  },
  {
    value: "14-16 (Monday-Wednesday) November",
    label: "14-16 (Monday-Wednesday) November",
  },
  {
    value: "16-18 (Wednesday-Friday) November",
    label: "16-18 (Wednesday-Friday) November",
  },
  {
    value: "17-19 (Thursday-Saturday) November",
    label: "17-19 (Thursday-Saturday) November",
  },
];

function StepThree({ setStep, setForm, data }) {
  const [value, setValue] = useState(null);
  useEffect(() => {
    setForm({ ...data, Date: value });
  }, [value]);

  return (
    <form className="mt-3 w-[30rem] sm:w-fit" onSubmit={(e) => setStep(e, 5)}>
      <h1 className="text-white font-bold text-4xl sm:text-3xl">
        Conference Date
      </h1>
      <p className="mt-3 text-fainted-white">
        Which dates for 3 days event are best for you?
      </p>
      <div className="mt-3 border w-full border-solid border-y-fainted-gray divide-y" />
      <div className="mt-10">
        <div className="text-fainted-white text-lg mb-4">Choose preferred dates</div>
        <Select
          options={options}
          title="Select conference date"
          setValue={setValue}
          multi={true}
        />
        <div className="float-right flex items-center">
          <a
            className="mr-10 text-fainted-white cursor-pointer"
            onClick={() => setStep(null, 3)}
          >
            Back
          </a>
          <button
            type="submit"
            className="bg-tetiary-pink p-3 rounded-md text-white mt-3 float-right w-36"
            disabled={!data.Date && true}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
}

export default StepThree;
