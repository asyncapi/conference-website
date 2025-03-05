/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Button from "../../Buttons/button";

type StepOneProps = {
  setStep: (e: React.FormEvent<HTMLFormElement>, step: number) => void;
  setForm: (formData: Record<string, any>) => void;
  data: {
    Fullname?: string;
    Email?: string;
    Bio?: string;
    Social?: string;
  };
};

function StepOne({ setStep, setForm, data }: StepOneProps) {
  return (
    <form
      className="mt-3 w-[30rem] lg:w-[auto]"
      onSubmit={(e) => setStep(e, 2)}
      data-test="step-one"
    >
      <h1 className="text-white font-bold text-4xl lg:text-3xl">
        Let's start with your name
      </h1>
      <p className="mt-3 text-dark-600">
        Please fill the details below with your full name
      </p>
      <div className="mt-3 border w-full border-solid border-dark-400 divide-y" />
      <div className="mt-10">
        <label className="text-dark-600 text-lg" htmlFor="fullname">
          Full name
        </label>
        <input
          id="fullname"
          required
          className="mt-3 w-full p-4 rounded-md focus:outline-none"
          style={{ border: "1px solid #E50E99" }}
          onChange={(e) => setForm({ ...data, Fullname: e.target.value })}
          data-test="step-one-name"
        />

        <label className="text-dark-600 text-lg mt-5 block" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          required
          type="email"
          className="mt-3 w-full p-4 rounded-md focus:outline-none"
          style={{ border: "1px solid #E50E99" }}
          onChange={(e) => setForm({ ...data, Email: e.target.value })}
          data-test="step-one-email"
        />

        <label className="text-dark-600 text-lg mt-5 block" htmlFor="bio">
          Bio
        </label>
        <textarea
          id="bio"
          required
          className="mt-3 w-full p-4 rounded-md focus:outline-none"
          style={{ border: "1px solid #E50E99" }}
          onChange={(e) => setForm({ ...data, Bio: e.target.value })}
          data-test="step-one-bio"
        />

        <label
          className="text-dark-600 text-lg mt-5 block"
          htmlFor="social"
        >
          Github/LinkedIn/Twitter
        </label>
        <input
          id="social"
          required
          type="url"
          className="mt-3 w-full p-4 rounded-md focus:outline-none"
          style={{ border: "1px solid #E50E99" }}
          onChange={(e) => setForm({ ...data, Social: e.target.value })}
          data-test="step-one-social"
        />

        <Button
          type="submit"
          className="bg-tetiary-pink p-3 rounded-md text-white mt-6 float-right w-36 lg:w-full lg:mt-8"
          disabled={!data.Fullname}
          test="step-one-next"
        >
          Next
        </Button>
      </div>
    </form>
  );
}

export default StepOne;
