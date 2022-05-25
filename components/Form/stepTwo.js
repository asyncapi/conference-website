/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import Select from "../Select/select";

const options = ["Virtual", "In-person"];

function StepTwo({ setStep, setForm, data }) {
  const [value, setValue] = useState(null);
  useEffect(() => {
    setForm({ ...data, type: value });
  }, [value]);
  return (
    <form className="mt-3" onSubmit={(e) => setStep(e, 3)}>
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
        />
        <button
          type="submit"
          className="bg-tetiary-pink p-3 rounded-md text-white mt-3 float-right w-36"
        >
          Next
        </button>
      </div>
    </form>
  );
}

export default StepTwo;
