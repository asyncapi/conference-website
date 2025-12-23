/* eslint-disable react/no-unescaped-entities */
import React, { FormEvent, useState, JSX } from 'react';
import Button from '../../Buttons/button';
import { CfpStepProps } from '../../../types/types';

type ApiResponse = { success?: boolean; error?: string };

function StepFourRegistration({ setStep, setForm, data }: CfpStepProps) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const payload = {
      fullName: (data as any).fullName || (data as any).Fullname || '',
      email: (data as any).email || (data as any).Email || '',
      company: (data as any).company || '',
      role: (data as any).role || '',
      preferredCity: (data as any).preferredCity || '',
      attendanceType: (data as any).attendanceType || '',
      timezone: (data as any).timezone || '',
      dietaryAccessibility: (data as any).dietaryAccessibility || '',
      updatesOptIn: Boolean((data as any).updatesOptIn),
      sponsorDataSharing: Boolean((data as any).sponsorDataSharing),
      notes: (data as any).notes || '',
    };

    fetch('/api/registration/2026', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const body: ApiResponse = await res.json().catch(() => ({}));
        if (!res.ok) {
          const message = body.error || `Submission failed (${res.status})`;
          throw new Error(message);
        }
        return body;
      })
      .then(() => {
        setSubmitting(false);
        setDisabled(true);
        setStep(e, 0);
      })
      .catch((err: Error) => {
        setSubmitting(false);
        setError(err.message || 'Submission failed');
      });
  };

  return (
    <form className="mt-3" onSubmit={(e) => onSubmit(e)}>
      <h1 className="text-white font-bold text-4xl lg:text-3xl">Review & Submit</h1>
      <p className="mt-3 text-dark-600">Review your details and submit your registration.</p>
      <div className="mt-3 border w-full border-solid border-y-dark-600 divide-y" />
      <div className="mt-10">
        <div className="text-dark-600 text-lg">Notes</div>
        <textarea
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          onChange={(e) => setForm((prev: any) => ({ ...prev, notes: e.target.value }))}
          data-test="reg-step-four-notes"
        />

        <div className="mt-6 text-dark-600 text-md">
          By clicking submit, you confirm the information is correct.
        </div>
        <div className="mt-3 w-full flex items-center justify-between lg:flex-col-reverse lg:items-start">
            <div className="mt-3 w-full flex items-center justify-end lg:flex-col-reverse lg:items-start gap-4">
                {/* Back button */}
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => !disabled && setStep(null, 3)}
                    className="text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                >
                    Back
                </button>

                {/* Submit button */}
                <Button
                    type="submit"
                    disabled={submitting || disabled}
                    className="bg-tetiary-pink px-6 py-3 rounded-md text-white w-36 lg:w-full"
                    test="reg-step-four-next"
                >
                    {submitting ? 'Submitting...' : 'Submit'}
                </Button>
</div>

            {error && <div className="text-red-400 mt-2">{error}</div>}
          </div>
        </div>
    </form>
  );
}

export default StepFourRegistration;
