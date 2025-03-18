/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Button from "../../Buttons/button";


function StepTwo({ setStep, setForm, data }) {
  return (
    <form className="mt-3 w-[30rem] lg:w-[auto]" onSubmit={(e) => setStep(e, 3)} data-test="step-two">
      <h1 className="text-white font-bold text-4xl lg:text-3xl">
        Session Info
      </h1>
      <p className="mt-3 text-dark-600">
       Please provide your session title and description
      </p>
      <div className="mt-3 border w-full border-solid border-dark-400 divide-y" />
      <div className="mt-10">
        <div className="text-dark-600 text-lg">Session Title</div>
        <input
          required
          className="mt-3 w-full p-4 rounded-md focus:outline-none"
          style={{
            border: "1px solid #E50E99",
          }}
          onChange={(e) => setForm({ ...data, Title: e.target.value })} 
          data-test="step-two-title"
          />
        <div className="text-dark-600 text-lg mt-4">Session Description</div>
        <textarea
          required
          className="mt-3 w-full p-4 rounded-md focus:outline-none"
          style={{
            border: "1px solid #E50E99",
          }}
          onChange={(e) => setForm({ ...data, Description: e.target.value })} 
          data-test="step-two-description"
          />
        <div className="float-right mt-3 lg:flex lg:flex-col-reverse lg:w-full">
          <a
            className="mr-10 text-dark-600 cursor-pointer lg:text-center lg:pl-10 lg:mt-5"
            onClick={() => setStep(null, 1)}
          >
            Back
          </a>
          <Button
            type="submit"
            disabled={!data.Description || !data.Title && true}
            className="bg-tetiary-pink p-3 rounded-md text-white mt-3 w-36 lg:w-full lg:mt-3"
            test="step-two-next">
            Next
            </Button>
        </div>
      </div>
    </form>
  );
}

export default StepTwo;