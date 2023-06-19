/* eslint-disable react/no-unescaped-entities */
import React from "react";

function StepFour({ setStep, setForm, data }) {
  return (
    <form className="mt-3 w-[30rem] lg:w-[auto]" onSubmit={(e) => setStep(e, 2)}>
      <h1 className="text-white font-bold text-4xl lg:text-3xl">
        Additional Information
      </h1>
      <p className="mt-3 text-fainted-white">
        Notes will only be seen by reviewers during the CFP process. Therefore, it is important to use this space to explain any technical requirements or why you are best suited to speak on the subject, etc...  
      </p>
      <div className="mt-3 border w-full border-solid border-y-fainted-gray divide-y" />
      <div className="mt-10">
        <div className="text-fainted-white text-lg">Additional Information</div>
        <textarea
          required
          className="mt-3 w-full p-4 rounded-md bg-dark-paint text-white focus:outline-none"
          style={{
            border: "2px solid #E50E99",
          }}
          onChange={(e) => setForm({ ...data, additionalInfo: e.target.value })}
        />
        
        <div className="mt-6 text-fainted-white text-md">
          By clicking submit, this means you agree to follow the <a className="underline" href="https://github.com/asyncapi/spec/blob/master/CODE_OF_CONDUCT.md" target="_blank" rel="noreferrer">AsyncAPI Initiative Code of Conduct</a>
        </div>
        <button
          type="submit"
          className="bg-tetiary-pink p-3 rounded-md text-white mt-3 float-right w-36"
          disabled={!data.additionalInfo && true}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default StepFour;