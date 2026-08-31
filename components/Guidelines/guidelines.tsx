'use client';

import React, { useState } from 'react';
import Plus from '../illustration/plus';
import Heading from '../Typography/heading';
import Button from '../Buttons/button';
import faqs from '../../config/faqs.json';

interface GuidelinesProps {
  talkDeadLine: string;
  virtual: boolean;
  name: string;
  cfp: string;
  cfpDeadlinePassed?: boolean;
}

function Guidelines({
  talkDeadLine,
  virtual,
  name,
  cfp,
  cfpDeadlinePassed = false,
}: GuidelinesProps) {
  const [show, setShow] = useState<number | null>(null);
  return (
    <div className="z-[9]" data-test="guideline-com">
      <div className="flex flex-col justify-center">
        <Heading className="text-3xl text-white text-center">
          Speakers Guideline
        </Heading>
        <div className="mt-20">
          {faqs.map((faq, i) => {
            if (i == 2) {
              return (
                <div
                  key={faq.q}
                  onClick={() => {
                    if (show === i) {
                      setShow(null);
                    } else {
                      setShow(i);
                    }
                  }}
                >
                  <div className="pb-4 cursor-pointer mt-4 border-b border-b-charcoal">
                    <div
                      className={`flex justify-between ${show === i ? 'text-white' : 'text-gray-400'} hover:text-white`}
                    >
                      <h2 className="text-xl w-11/12">{faq.q}</h2>
                      <Button
                        outline={true}
                        type="button"
                        className="pointer h-8 border-white mr-5 rounded-3xl p-1"
                        icon={
                          <Plus
                            className={`w-5 transition-transform  duration-700 ${show === i ? 'rotate-45' : 'rotate-90'}`}
                          />
                        }
                        iconPosition="left"
                      />
                    </div>

                    <p
                      className={`text-md text-white overflow-hidden transition-all duration-500 ease-in-out transform ${show === i ? 'mt-8 max-h-[1000px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}`}
                    >
                      {faq.a1 + talkDeadLine + faq.a2}
                    </p>
                  </div>
                </div>
              );
            }

            if (i == 5) {
              return (
                <div
                  key={faq.q}
                  onClick={() => {
                    if (show === i) {
                      setShow(null);
                    } else {
                      setShow(i);
                    }
                  }}
                >
                  <div className="pb-4 cursor-pointer mt-4 border-b border-b-charcoal">
                    <div
                      className={`flex justify-between ${show === i ? 'text-white' : 'text-gray-400'} hover:text-white`}
                    >
                      <h2 className="text-xl w-11/12">{faq.q}</h2>
                      <Button
                        type="button"
                        outline={true}
                        className="pointer h-8 border-white mr-5 rounded-3xl p-1"
                        icon={
                          <Plus
                            className={`w-5 transition-transform  duration-700 ${show === i ? 'rotate-45' : 'rotate-90'}`}
                          />
                        }
                        iconPosition="left"
                      />
                    </div>
                    {virtual ? (
                      <p
                        className={`text-md text-white overflow-hidden transition-all duration-500 ease-in-out transform ${show === i ? 'mt-8 max-h-[1000px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}`}
                      >
                        {faq.av}
                      </p>
                    ) : (
                      <p
                        className={`text-md text-white overflow-hidden transition-all duration-500 ease-in-out transform ${show === i ? 'mt-8 max-h-[1000px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}`}
                      >
                        {faq.ai}
                      </p>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={faq.q}
                onClick={() => {
                  if (show === i) {
                    setShow(null);
                  } else {
                    setShow(i);
                  }
                }}
              >
                <div className="pb-4 cursor-pointer mt-4 border-b border-b-charcoal">
                  <div
                    className={`flex justify-between ${show === i ? 'text-white' : 'text-gray-400'} hover:text-white`}
                  >
                    <h2 className="text-xl w-11/12">{faq.q}</h2>
                    <Button
                      type="button"
                      outline={true}
                      className="pointer h-8 border-white mr-5 rounded-3xl p-1"
                      icon={
                        <Plus
                          className={`w-5 transition-transform  duration-700 ${show === i ? 'rotate-45' : 'rotate-90'}`}
                        />
                      }
                      iconPosition="left"
                    />
                  </div>
                  {
                    <p
                      className={`text-md text-white overflow-hidden transition-all duration-500 ease-in-out transform ${show === i ? 'mt-8 max-h-[1000px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}`}
                    >
                      {faq.a}
                    </p>
                  }
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center text-center mt-20">
          {cfp &&
            (cfpDeadlinePassed ? (
              <Button
                type="button"
                disabled
                className="x-8 m-2 w-64 text-center opacity-60 text-sm"
                text="CFP deadline has passed"
              />
            ) : (
              <a href={cfp} target="_blank" rel="noreferrer">
                <Button
                  type="button"
                  className="x-8 m-2 w-64 text-center"
                  text="Submit Talk Proposal"
                />
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Guidelines;
