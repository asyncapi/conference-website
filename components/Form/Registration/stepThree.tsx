/* eslint-disable react/no-unescaped-entities */
import React, { JSX, useState } from 'react';
import Button from '../../Buttons/button';
import { CfpStepProps } from '../../../types/types';

function StepThreeRegistration({ setStep, setForm, data }: CfpStepProps): JSX.Element {
  const dietary = (data as any).dietaryAccessibility || '';
  const updatesOptIn = !!(data as any).updatesOptIn;
  const sponsorDataSharing = !!(data as any).sponsorDataSharing;
  const notes = (data as any).notes || '';

  const [localUpdates, setLocalUpdates] = useState(updatesOptIn);
  const [localSponsor, setLocalSponsor] = useState(sponsorDataSharing);

  return (
    <form className="mt-3" onSubmit={(e) => setStep(e, 4)} data-test="reg-step-three">
      <h1 className="text-white font-bold text-4xl lg:text-3xl">Consents & Notes</h1>
      <p className="mt-3 text-dark-600">Tell us any dietary or accessibility needs and consent preferences.</p>
      <div className="mt-3 border w-full border-solid border-dark-400 divide-y" />
      <div className="mt-10">
        <label htmlFor="dietaryAccessibility" className="text-dark-600 text-lg">Dietary / Accessibility needs</label>
        <textarea
          id="dietaryAccessibility"
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          value={dietary}
          onChange={(e) => setForm((prev: any) => ({ ...prev, dietaryAccessibility: e.target.value }))}
          data-test="reg-step-three-dietary"
        />

        <div className="mt-5 text-dark-600">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={localUpdates}
              onChange={(e) => {
                setLocalUpdates(e.target.checked);
                setForm((prev: any) => ({ ...prev, updatesOptIn: e.target.checked }));
              }}
              data-test="reg-step-three-updates"
              className="mr-2"
            />
            Receive occasional updates about the event
          </label>
        </div>

        <div className="mt-3 text-dark-600">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={localSponsor}
              onChange={(e) => {
                setLocalSponsor(e.target.checked);
                setForm((prev: any) => ({ ...prev, sponsorDataSharing: e.target.checked }));
              }}
              data-test="reg-step-three-sponsor"
              className="mr-2"
            />
            Share my contact with sponsors (optional)
          </label>
        </div>

        <div className="mt-3 text-sm text-dark-600">
          We process your data according to our <a href="/privacy" className="underline">Privacy Policy</a>. By submitting you agree to the <a href="https://github.com/asyncapi/community/blob/master/CODE_OF_CONDUCT.md" target="_blank" rel="noreferrer" className="underline">Code of Conduct</a> and Privacy Policy.
        </div>

        <label htmlFor="notes" className="text-dark-600 text-lg mt-5">Notes (optional)</label>
        <textarea
          id="notes"
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          value={notes}
          onChange={(e) => setForm((prev: any) => ({ ...prev, notes: e.target.value }))}
          data-test="reg-step-three-notes"
        />

        <div className="mt-3 flex items-center justify-end gap-6 lg:flex-col-reverse lg:w-full lg:items-stretch">
          {/* Back */}
          <Button
            type="button"
            onClick={() => setStep(null, 2)}
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

export default StepThreeRegistration;
