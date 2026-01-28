/* eslint-disable react/no-unescaped-entities */
import React, { JSX } from 'react';
import cityLists from '../../../config/city-lists.json';
import Button from '../../Buttons/button';
import { CfpStepProps } from '../../../types/types';

function StepTwoRegistration({ setStep, setForm, data }: CfpStepProps): JSX.Element {
  const company = (data as any).company || '';
  const role = (data as any).role || '';
  const preferredCity = (data as any).preferredCity || '';
  const attendanceType = (data as any).attendanceType || '';
  const timezone = (data as any).timezone || '';

  const isValid = true; // no strictly required fields on this step

  return (
    <form className="mt-3" onSubmit={(e) => setStep(e, 3)} data-test="reg-step-two">
      <h1 className="text-white font-bold text-4xl lg:text-3xl">Event Details</h1>
      <p className="mt-3 text-dark-600">Tell us how you'll attend so we can reserve your place.</p>
      <div className="mt-3 border w-full border-solid border-dark-400 divide-y" />
      <div className="mt-10">
        <div className="text-dark-600 text-lg">Company</div>
        <input
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          value={company}
          onChange={(e) => setForm((prev: any) => ({ ...prev, company: e.target.value }))}
          data-test="reg-step-two-company"
        />

        <div className="text-dark-600 text-lg mt-5">Role</div>
        <input
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          value={role}
          onChange={(e) => setForm((prev: any) => ({ ...prev, role: e.target.value }))}
          data-test="reg-step-two-role"
        />

        <div className="text-dark-600 text-lg mt-5">Preferred city</div>
        <select
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          value={preferredCity}
          onChange={(e) => setForm((prev: any) => ({ ...prev, preferredCity: e.target.value }))}
          data-test="reg-step-two-city"
        >
          <option value="">Select (optional)</option>
          {((cityLists as any) || []).map((c: any) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="text-dark-600 text-lg mt-5">Attendance type</div>
        <input
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          value={attendanceType}
          onChange={(e) => setForm((prev: any) => ({ ...prev, attendanceType: e.target.value }))}
          data-test="reg-step-two-attendance"
        />

        <div className="text-dark-600 text-lg mt-5">Timezone</div>
        <input
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          value={timezone}
          onChange={(e) => setForm((prev: any) => ({ ...prev, timezone: e.target.value }))}
          data-test="reg-step-two-timezone"
        />

        <div className="mt-3 flex items-center justify-end gap-6 lg:flex-col-reverse lg:w-full lg:items-stretch">
        {/* Back */}
        <Button
            type="button"
            onClick={() => setStep(null, 1)}
            className="text-gray-500 hover:text-gray-700 transition-colors lg:text-center"
        >
            Back
        </Button>

        {/* Next */}
        <Button
            type="submit"
            className="bg-tetiary-pink px-6 py-3 rounded-md text-white w-36 lg:w-full"
            test="reg-step-three-next"
        >
            Next
        </Button>
        </div>

      </div>
    </form>
  );
}

export default StepTwoRegistration;
