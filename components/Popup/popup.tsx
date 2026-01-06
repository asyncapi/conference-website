/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Popup component code commented out for 2026 migration. Uncomment to restore in the future.
/*
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Paragraph from '../Typography/paragraph';
import Button from '../Buttons/button';
import Link from 'next/link';

function Popup() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem('popupShown');
    if (!hasShown) {
      setIsOpen(true);
      setIsVisible(true);
      sessionStorage.setItem('popupShown', 'true');
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 350);
  };

  return (
    <>
      {isOpen &&
        createPortal(
          <div
            data-testid="popup-container"
            className={`fixed inset-0 bg-black flex items-center justify-center transition-opacity duration-300 z-[100] p-4 overflow-y-auto ${
              isVisible ? 'bg-opacity-90 ' : 'bg-opacity-0'
            }`}
            onClick={handleClose}
          >
            <div
              className={`w-full max-w-[650px] sm:max-w-[400px] h-auto my-auto card p-6 transition-all duration-300 ease-out transform ${
                isVisible
                  ? 'translate-y-0 opacity-100 scale-100'
                  : 'translate-y-8 opacity-0 scale-95'
              }`}
              style={{
                borderRadius: '30px',
                minHeight: 'fit-content',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <img
                      src="/img/logos/2025-logo.png"
                      alt="conference logo"
                      className="w-[150px]"
                    />
                  </div>
                  <button
                    data-test="close-button"
                    className="p-2 hover:bg-gray-400 cursor-pointer w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 flex-shrink-0"
                    onClick={handleClose}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L17 17"
                        stroke="#E9EAEA"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M17 1L0.999999 17"
                        stroke="#E9EAEA"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="my-10 flex justify-center">
                  <Image
                    src="/img/rocket.gif"
                    alt="rocket"
                    width={0}
                    height={0}
                    className="w-[180px] h-[180px] sm:w-[150px] sm:h-[150px] max-w-full"
                  />
                </div>

                <div className="flex flex-col items-center text-center space-y-6 pb-4">
                  <h1 className=" text-[30px] sm:text-[25px] font-bold text-white leading-tight">
                    AsyncAPI Is Headed to
                    <br />
                    DeveloperWeek <span className="text-[#B31942]">U</span>
                    <span>S</span>
                    <span className="text-[#0A3161]">A</span> 2026!
                  </h1>
                  <Paragraph typeStyle="body-md">
                    For the first time ever, we&apos;re bringing the AsyncAPI
                    community to
                    <br className="hidden sm:block" />
                    DeveloperWeek USA in San Jose, CA
                  </Paragraph>

                  <Paragraph
                    typeStyle="body-md"
                    className="text-white font-bold"
                  >
                    Be a part of the journey as we build the future of
                    event-driven APIs!
                  </Paragraph>
                  <Link href="/venue/California">
                    <Button type="button" className="w-[200px]">
                      See What&apos;s Next
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Popup;
*/