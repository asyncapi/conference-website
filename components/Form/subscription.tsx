import React, { JSX } from 'react';
import Button from '../Buttons/button';
import { useTranslation } from 'next-i18next';

function Subscription(): JSX.Element {
  const { t } = useTranslation('common');
  return (
    <div className="mt-0 md:mt-[106px] subscription container flex justify-center">
      <div className="mt-[106px] lg:mt-0 w-[1024px] min-h-[253px] lg:py-10 lg:w-full flex flex-col items-center">
        <h3 className="text-[32px] text-white lg:text-center">
          {t('subscription.title')}
        </h3>
        <a
          href="https://www.asyncapi.com/newsletter"
          target="_blank"
          rel="noreferrer"
          className="sm:w-full"
          data-test="subscribe-button"
        >
          <Button type="submit" className="w-full md:w-[200px] mt-8 px-10">
            {t('subscription.subscribe')}
          </Button>
        </a>
      </div>
    </div>
  );
}
export default Subscription;
