/* eslint-disable react/no-unescaped-entities */
import React, { JSX } from 'react';
import Button from '../../Buttons/button';
import { CfpStepProps } from '../../../types/types';
import { useTranslation } from 'next-i18next';

function StepOne({ setStep, setForm, data }: CfpStepProps): JSX.Element {
  const { t } = useTranslation('common');
  return (
    <form className="mt-3" onSubmit={(e) => setStep(e, 2)} data-test="step-one">
      <h1 className="text-white font-bold text-4xl lg:text-3xl">
        {t('cfp.stepOne.title')}
      </h1>
      <p className="mt-3 text-dark-600">
        {t('cfp.stepOne.subtitle')}
      </p>
      <div className="mt-3 border w-full border-solid border-dark-400 divide-y" />
      <div className="mt-10">
        <div className="text-dark-600 text-lg">{t('cfp.stepOne.fullName')}</div>
        <input
          required
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          onChange={(e) => setForm({ ...data, Fullname: e.target.value })}
          data-test="step-one-name"
        />
        <div className="text-dark-600 text-lg mt-5">{t('cfp.stepOne.emailAddress')}</div>
        <input
          required
          type="email"
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          onChange={(e) => setForm({ ...data, Email: e.target.value })}
          data-test="step-one-email"
        />
        <div className="text-dark-600 text-lg mt-5">{t('cfp.stepOne.bio')}</div>
        <textarea
          required
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          onChange={(e) => setForm({ ...data, Bio: e.target.value })}
          data-test="step-one-bio"
        />
        <div className="text-dark-600 text-lg mt-5">
          {t('cfp.stepOne.socialLinks')}
        </div>
        <input
          required
          type="url"
          className="mt-3 w-full p-4 rounded-md focus:outline-none border border-[#E50E99]"
          onChange={(e) => setForm({ ...data, Social: e.target.value })}
          data-test="step-one-social"
        />
        <Button
          type="submit"
          className="bg-tetiary-pink p-3 rounded-md text-white mt-6 float-right w-36 lg:w-full lg:mt-8"
          disabled={!data.Fullname && true}
          test="step-one-next"
        >
          {t('cfp.steps.next')}
        </Button>
      </div>
    </form>
  );
}

export default StepOne;
