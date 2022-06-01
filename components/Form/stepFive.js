/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ActivityLoader from "../illustrations/activityLoader";

function StepFive({ setStep, setForm, data }) {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setStep(e, null);
    setSubmitting(true);
    axios
      .post(
        "https://sheet.best/api/sheets/cca4be2c-87b7-4151-88f8-cde4ce78ed06",
        data
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Feedback submitted successfully!");
          setStep(null, 1);
        } else {
          toast.error("Ooops! Something went wrong");
        }
      })
      .catch((err) => {
        toast.error("Failed to submit feedback. Try again");
      });
  };
  return (
    <form className="mt-3 w-[30rem] md:w-fit" onSubmit={(e) => onSubmit(e)}>
      <h1 className="text-white font-bold text-4xl sm:text-3xl">
        Let's keep you updated
      </h1>
      <p className="mt-3 text-fainted-white">
        Please fill the details below with your email
      </p>
      <div className="mt-3 border w-full border-solid border-y-fainted-gray divide-y" />
      <div className="mt-10">
        <div className="text-fainted-white text-lg">Enter email address</div>
        <input
          required
          type="email"
          className="mt-3 w-full p-4 rounded-md bg-dark-paint text-white focus:outline-none"
          style={{
            border: "2px solid #E50E99",
          }}
          onChange={(e) => setForm({ ...data, Email: e.target.value })}
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
            disabled={submitting || (!data.Email && true)}
          >
            {submitting ? <ActivityLoader /> : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default StepFive;
