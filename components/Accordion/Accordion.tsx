import React, { useState } from 'react';
import Button from '../Buttons/button';
import Plus from '../illustration/plus';
import { FaqTypes } from '../../types/types';

interface AccordionProps {
  faq: FaqTypes[];
}

function Accordion({ faq }: AccordionProps) {
  const [show, setShow] = useState<number | null>(null);
  return (
    <>
      {faq?.length > 0 &&
        faq.map((q, i) => {
          return (
            <div
              key={q.q}
              onClick={() => {
                if (show === i) {
                  setShow(null);
                } else {
                  setShow(i);
                }
              }}
            >
              <div className="pb-4 cursor-pointer mt-4 border border-[#333] p-4 rounded-xl">
                <div
                  className={`flex justify-between ${show === i ? 'text-white' : 'text-gray-400'} hover:text-white`}
                >
                  <h2 className={`text-xl w-[90%]`}>{q.q}</h2>
                  <Button
                    type="button"
                    outline={true}
                    className="pointer h-[30px] border-[#ffff] mr-[20px] rounded-3xl p-1"
                    icon={
                      <Plus
                        className={`w-[20px] transition-transform  duration-700 ${show === i ? 'rotate-45' : 'rotate-90'}`}
                      />
                    }
                    iconPosition="left"
                  />
                </div>
                {
                  <p
                    className={`text-md text-white overflow-hidden transition-all duration-500 ease-in-out transform ${show === i ? 'mt-2 max-h-[1000px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}`}
                  >
                    {q.a}
                  </p>
                }
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Accordion;
