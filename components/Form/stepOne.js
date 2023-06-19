/* eslint-disable react/no-unescaped-entities */
import React from "react";

function StepOne({ setStep, setForm, data }) {
  return (
    <form className="mt-3 w-[30rem] lg:w-[auto]" onSubmit={(e) => setStep(e, 2)}>
      <h1 className="text-white font-bold text-4xl lg:text-3xl">
        Let's start with your name
      </h1>
      <p className="mt-3 text-fainted-white">
        Please fill the details below with your full name
      </p>
      <div className="mt-3 border w-full border-solid border-y-fainted-gray divide-y" />
      <div className="mt-10">
        <div className="text-fainted-white text-lg">Full name</div>
        <input
          required
          className="mt-3 w-full p-4 rounded-md bg-dark-paint text-white focus:outline-none"
          style={{
            border: "2px solid #E50E99",
          }}
          onChange={(e) => setForm({ ...data, Name: e.target.value })}
        />
        <div className="text-fainted-white text-lg mt-5">Email address</div>
        <input
          required
          type="email"
          className="mt-3 w-full p-4 rounded-md bg-dark-paint text-white focus:outline-none"
          style={{
            border: "2px solid #E50E99",
          }}
          onChange={(e) => setForm({ ...data, Email: e.target.value })}
        />
         <div className="text-fainted-white text-lg mt-5">Bio</div>
        <textarea
          required
          type="text"
          className="mt-3 w-full p-4 rounded-md bg-dark-paint text-white focus:outline-none"
          style={{
            border: "2px solid #E50E99",
          }}
          onChange={(e) => setForm({ ...data, Tagline: e.target.value })}
        />
        <div className="text-fainted-white text-lg mt-5">LinkedIn Profile</div>
        <input
          required
          type="url"
          className="mt-3 w-full p-4 rounded-md bg-dark-paint text-white focus:outline-none"
          style={{
            border: "2px solid #E50E99",
          }}
          onChange={(e) => setForm({ ...data, Linkedin: e.target.value })}
        />
        <button
          type="submit"
          className="bg-tetiary-pink p-3 rounded-md text-white mt-3 float-right w-36"
          disabled={!data.Name && true}
        >
          Next
        </button>
      </div>
    </form>
  );
}

export default StepOne;