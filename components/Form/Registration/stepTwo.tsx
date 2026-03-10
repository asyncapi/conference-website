/* eslint-disable react/no-unescaped-entities */
import React, { JSX } from 'react';
import cityLists from '../../../config/city-lists.json';
import Button from '../../Buttons/button';
import { CfpStepProps } from '../../../types/types';

function StepTwoRegistration({ setStep, setForm, data }: CfpStepProps): JSX.Element {
  const company = data.company || '';
  const role = data.role || '';
  const preferredCity = data.preferredCity || '';
  return (
    <form onSubmit={(e) => setStep(e, 3)} data-test="reg-step-two">
      <h1 id="step-two-heading" className="text-white font-bold text-4xl lg:text-3xl">Event Details</h1>
      <p className="text-dark-600 border-b border-dark-700 pb-2 mb-2">Tell us how you'll attend so we can reserve your place.</p>
      <div className='space-y-2 last:space-y-6' role="group" aria-labelledby="step-two-heading">
        <div className='space-y-1'>
          <label htmlFor="company" className="text-dark-600 text-lg">Company</label>
          <input
            id="company"
            className="w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50E99] focus:ring-offset-2 focus:ring-offset-gray-900 border border-[#E50E99]"
            value={company}
            onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
            data-test="reg-step-two-company"
          />
        </div>
        <div className='space-y-1'>
          <label htmlFor="role" className="text-dark-600 text-lg block">Role</label>
          <input
            id="role"
            className="w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50E99] focus:ring-offset-2 focus:ring-offset-gray-900 border border-[#E50E99]"
            value={role}
            onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
            data-test="reg-step-two-role"
          />
        </div>
        <div className='space-y-1'>
          <label htmlFor="preferredCity" className="text-dark-600 text-lg block">Preferred city</label>
          <select
            id="preferredCity"
            className="w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50E99] focus:ring-offset-2 focus:ring-offset-gray-900 border border-[#E50E99]"
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
        </div>
        <div className="flex items-center space-x-2 w-full">
          <Button
            type="button"
            onClick={() => setStep(null, 1)}
            className='flex-1'
          >
            Back
          </Button>

          {/* Next */}
          <Button
            type="submit"
            className='flex-1'
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
