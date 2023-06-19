/* eslint-disable react/no-unescaped-entities */
import React, {useState} from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import ActivityLoader from "../illustration/activityLoader";

function StepFour({ setStep, setForm, data }) {
  const [submitting, setSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post(
        "https://sheet.best/api/sheets/666a49d7-e284-48ff-a335-0030f20658f6",
        data
      )
      .then((res) => {
        setSubmitting(false);
        if (res.status === 200) {
          toast.success("Feedback submitted successfully!", {
            duration: '4000'
          });
          setDisabled(true);
          setStep(e, 1)
        }
      })
      .catch((err) => {
        setSubmitting(false);
        toast.error("Failed to submit feedback. Try again", {
            duration: '4000'
          });
      });
  };
  return (
    <form className="mt-3 w-[30rem] lg:w-[auto]" onSubmit={(e) => onSubmit(e)}>
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
          onChange={(e) => setForm({ ...data, AdditionalInfo: e.target.value })}
        />
        
        <div className="mt-6 text-fainted-white text-md">
          By clicking submit, this means you agree to follow the <a className="underline" href="https://github.com/asyncapi/spec/blob/master/CODE_OF_CONDUCT.md" target="_blank" rel="noreferrer">AsyncAPI Initiative Code of Conduct</a>
        </div>
        <div className="float-right">
          <a
            className="mr-10 text-fainted-white cursor-pointer"
            onClick={() => !disabled && setStep(null, 3)}
          >
            Back
          </a>
          <button
            type="submit"
            className="bg-tetiary-pink p-3 rounded-md text-white mt-3 w-36"
            disabled={submitting || disabled}
          >
            {submitting ? <ActivityLoader /> : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default StepFour;