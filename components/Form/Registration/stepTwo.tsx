/* eslint-disable react/no-unescaped-entities */
import React, { JSX } from 'react';
import cityLists from '../../../config/city-lists.json';
import Button from '../../Buttons/button';
import { CfpStepProps } from '../../../types/types';

function StepTwoRegistration({ setStep, setForm, data }: CfpStepProps): JSX.Element {
  const company = data.company || '';
  const role = data.role || '';
  const preferredCity = data.preferredCity || '';
  const attendanceType = data.attendanceType || '';
  const timezone = data.timezone || '';

  const isValid = true; // no strictly required fields on this step

  return (
    <form className="mt-3" onSubmit={(e) => setStep(e, 3)} data-test="reg-step-two">
      <h1 id="step-two-heading" className="text-white font-bold text-4xl lg:text-3xl">Event Details</h1>
      <p className="mt-3 text-dark-600">Tell us how you'll attend so we can reserve your place.</p>
      <div className="mt-3 border w-full border-solid border-dark-400 divide-y" />
      <div className="mt-10" role="group" aria-labelledby="step-two-heading">
        <label htmlFor="company" className="text-dark-600 text-lg">Company</label>
        <input
          id="company"
          className="mt-3 w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50E99] focus:ring-offset-2 focus:ring-offset-gray-900 border border-[#E50E99]"
          value={company}
          onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
          data-test="reg-step-two-company"
        />

        <label htmlFor="role" className="text-dark-600 text-lg mt-6 block">Role</label>
        <input
          id="role"
          className="mt-3 w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50E99] focus:ring-offset-2 focus:ring-offset-gray-900 border border-[#E50E99]"
          value={role}
          onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
          data-test="reg-step-two-role"
        />

        <label htmlFor="preferredCity" className="text-dark-600 text-lg mt-6 block">Preferred city</label>
        <select
          id="preferredCity"
          className="mt-3 w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50E99] focus:ring-offset-2 focus:ring-offset-gray-900 border border-[#E50E99]"
          value={preferredCity}
          onChange={(e) => setForm((prev) => ({ ...prev, preferredCity: e.target.value }))}
          data-test="reg-step-two-city"
        >
          <option value="">Select (optional)</option>
          {((cityLists as any) || []).map((c: any) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <label htmlFor="attendanceType" className="text-dark-600 text-lg mt-6 block">Attendance type</label>
        <input
          id="attendanceType"
          className="mt-3 w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50E99] focus:ring-offset-2 focus:ring-offset-gray-900 border border-[#E50E99]"
          value={attendanceType}
          onChange={(e) => setForm((prev) => ({ ...prev, attendanceType: e.target.value }))}
          data-test="reg-step-two-attendance"
        />

        <label htmlFor="timezone" className="text-dark-600 text-lg mt-6 block">Timezone</label>
        <input
          id="timezone"
          className="mt-3 w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50E99] focus:ring-offset-2 focus:ring-offset-gray-900 border border-[#E50E99]"
          value={timezone}
          onChange={(e) => setForm((prev) => ({ ...prev, timezone: e.target.value }))}
          data-test="reg-step-two-timezone"
        />

        <div className="mt-3 flex items-center justify-end gap-6 lg:flex-col-reverse lg:w-full lg:items-stretch">
          {/* Back */}
          <Button
            type="button"
            onClick={() => setStep(null, 1)}
            className="text-gray-500 hover:text-gray-700 transition-colors lg:text-center w-36 lg:w-full"
          >
            Back
          </Button>

          {/* Next */}
          <Button
            type="submit"
            className="text-gray-500 hover:text-gray-700 transition-colors lg:text-center w-36 lg:w-full"
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
