/* eslint-disable react/no-unescaped-entities */
import React from "react";

function StepFour({ setStep, setForm, data }) {
  return (
    <form className="mt-3 w-[30rem] lg:w-[auto]" onSubmit={(e) => setStep(e, 2)}>
      <h1 className="text-white font-bold text-4xl lg:text-3xl">
        Additional Information
      </h1>
      <p className="mt-3 text-fainted-white">
        Please add special request, comments, ideas, notes to organizers
      </p>
      <div className="mt-3 border w-full border-solid border-y-fainted-gray divide-y" />
      <div className="mt-10">
        <div className="text-fainted-white text-lg">Additional Information</div>
        <input
          required
          className="mt-3 w-full p-4 rounded-md bg-dark-paint text-white focus:outline-none"
          style={{
            border: "2px solid #E50E99",
          }}
          onChange={(e) => setForm({ ...data, additionalInfo: e.target.value })}
              />
        <button
          type="submit"
          className="bg-tetiary-pink p-3 rounded-md text-white mt-3 float-right w-36"
          disabled={!data.additionalInfo && true}
        >
          Next
        </button>
      </div>
    </form>
  );
}

export default StepFour;