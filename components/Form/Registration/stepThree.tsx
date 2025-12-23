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
        <div className="text-dark-600 text-lg">Dietary / Accessibility needs</div>
        <textarea
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

        <div className="text-dark-600 text-lg mt-5">Notes (optional)</div>
        <textarea
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          value={notes}
          onChange={(e) => setForm((prev: any) => ({ ...prev, notes: e.target.value }))}
          data-test="reg-step-three-notes"
        />

        <div className="float-right mt-3 flex lg:flex-col-reverse lg:w-full">
          <a className="mr-10 text-dark-600 cursor-pointer lg:text-center lg:pl-10 lg:mt-5" onClick={() => setStep(null, 2)}>
            Back
          </a>
          <Button type="submit" className="bg-tetiary-pink p-3 rounded-md text-white mt-3 w-36 lg:w-full lg:mt-5" test="reg-step-three-next">
            Next
          </Button>
        </div>
      </div>
    </form>
  );
}

export default StepThreeRegistration;
