/* eslint-disable react/no-unescaped-entities */
import React, { JSX, useState } from 'react';
import Button from '../../Buttons/button';
import { CfpStepProps } from '../../../types/types';

function StepThreeRegistration({ setStep, setForm, data }: CfpStepProps): JSX.Element {

  const updatesOptIn = !!data.updatesOptIn;
  const sponsorDataSharing = !!data.sponsorDataSharing;
  const notes = data.notes || '';

  const [localUpdates, setLocalUpdates] = useState(updatesOptIn);
  const [localSponsor, setLocalSponsor] = useState(sponsorDataSharing);

  return (
    <form onSubmit={(e) => setStep(e, 4)} data-test="reg-step-three">
      <h1 id="step-three-heading" className="text-white font-bold text-4xl lg:text-3xl">Consents & Notes</h1>
      <p className=" text-dark-600 border-b border-dark-700 pb-2 mb-2">Tell us your consent preferences and any additional notes.</p>
      <div role="group" className='space-y-2' aria-labelledby="step-three-heading">
        <fieldset className='space-y-2'>
          <legend className="text-white text-lg">Communication Preferences</legend>
          <div className="text-white">
            <input
              type="checkbox"
              id="updatesOptIn"
              checked={localUpdates}
              onChange={(e) => {
                setLocalUpdates(e.target.checked);
                setForm((prev) => ({ ...prev, updatesOptIn: e.target.checked }));
              }}
              data-test="reg-step-three-updates"
              className="mr-2 focus:ring-2 focus:ring-[#E50E99]"
            />
            <label className="items-start">
              Subscribe to our newsletter and be notified when community tickets are available
            </label>
          </div>
          <div className='text-white'>
            <input
              type="checkbox"
              id="sponsorDataSharing"
              checked={localSponsor}
              onChange={(e) => {
                setLocalSponsor(e.target.checked);
                setForm((prev) => ({ ...prev, sponsorDataSharing: e.target.checked }));
              }}
              data-test="reg-step-three-sponsor"
              className="mr-2 focus:ring-2 focus:ring-[#E50E99]"
            />
            <label className="items-start">
              I understand my information will be shared with conference sponsors, but I can opt out anytime
            </label>
          </div>
        </fieldset>

        <div className="text-sm text-dark-400">
          By submitting you agree to the {''}
          <a
            href="https://github.com/asyncapi/community/blob/master/CODE_OF_CONDUCT.md"
            target="_blank"
            rel="noreferrer"
            className="underline"
            aria-label="Code of Conduct (opens in new tab)"
          >
            Code of Conduct
            <span className="sr-only"> (opens in new tab)</span>
          </a>.
        </div>

        <div className='space-y-1'>
          <label htmlFor="notes" className="text-dark-600  block">Notes (optional)</label>
          <textarea
            id="notes"
            className="mt-3 w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50E99] focus:ring-offset-2 focus:ring-offset-gray-900 border border-[#E50E99]"
            value={notes}
            onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
            data-test="reg-step-three-notes"
          />
        </div>

        <div className="flex items-center space-x-2 w-full">
          <Button
            type="button"
            onClick={() => setStep(null, 2)}
            className='flex-1'
          >
            Back
          </Button>
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

export default StepThreeRegistration;
