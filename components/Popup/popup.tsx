import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Cancel from '../illustration/cancel';
import Heading from '../Typography/heading';
import Paragraph from '../Typography/paragraph';
import Button from '../Buttons/button';

function Popup() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <>
      {isOpen &&
        createPortal(
          <div
            className={`fixed inset-0 bg-black flex items-center justify-center transition-opacity duration-300 ${
              isVisible ? 'bg-opacity-90 ' : 'bg-opacity-0'
            }`}
            onClick={handleClose}
          >
            <div
              className={`w-[600px] h-[700px] card p-4 transition-all duration-300 ease-out transform ${
                isVisible
                  ? 'translate-y-0 opacity-100 scale-100'
                  : 'translate-y-8 opacity-0 scale-95'
              }`}
              style={{
                position: 'fixed',
                top: '200px',
                left: '50%',
                transform: `translateX(-50%) ${isVisible ? 'translateY(0) scale(1)' : 'translateY(2rem) scale(0.95)'}`,
                zIndex: 51,
                borderRadius: '30px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-2 mb-8">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Image
                    src="/img/logos/2025-logo.png"
                    alt="conference logo"
                    width={150}
                    height={150}
                  />
                </div>
                <div
                  className="p-2 hover:bg-gray-400 cursor-pointer w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200"
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
                </div>
              </div>
              <div className="my-12">fff</div>
              <div className="flex flex-col items-center text-center space-y-6">
                <h1 className="text-[32px] font-bold text-white">
                  AsyncAPI Is Headed to
                  <br />
                  DeveloperWeek <span className="text-[#B31942]">U</span>
                  <span>S</span>
                  <span className="text-[#0A3161]">A</span> 2026!
                </h1>
                <Paragraph typeStyle="body-md">
                  For the first time ever, we're bringing the AsyncAPI community
                  to
                  <br />
                  DeveloperWeek USA in San Jose, CA
                </Paragraph>

                <Paragraph typeStyle="body-md" className="text-white font-bold">
                  Be a part of the journey as we build the future of
                  eveent-driven APIs!
                </Paragraph>

                <Button type="button" className="w-[200px]">
                  See What's Next
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Popup;
