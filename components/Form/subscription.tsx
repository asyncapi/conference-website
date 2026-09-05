import React, { JSX } from 'react';
import Button from '../Buttons/button';

function Subscription(): JSX.Element {
  return (
    <div className="mt-0 md:mt-28 subscription container flex justify-center">
      <div className="mt-28 lg:mt-0 w-content-md min-h-64 lg:py-10 lg:w-full flex flex-col items-center">
        <h3 className="text-3xl text-white lg:text-center">
          Subscribe for AsyncAPI Conference updates!
        </h3>
        <a
          href="https://www.asyncapi.com/newsletter"
          target="_blank"
          rel="noreferrer"
          className="sm:w-full"
          data-test="subscribe-button"
        >
          <Button
            type="submit"
            className="w-full md:w-50 mt-8 px-10"
            text="Subscribe"
          />
        </a>
      </div>
    </div>
  );
}
export default Subscription;
