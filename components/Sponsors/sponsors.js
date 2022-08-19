import React from 'react'
import Button from '../Button/button';

function Sponsors() {
  return (
    <div className="container mx-auto w-full">
      <div className="pt-[100px] text-white">
        <h1 className="text-[84px]">2022 Event Sponsors</h1>
        <div className="mt-[48px] grid grid-cols-2 gap-4">
          {Array(2)
            .fill()
            .map((i) => (
              <div
                key={i}
                className="h-[304px] bg-[rgba(36, 30, 49, 0.8)] backdrop-blur-sm border rounded-lg border-dark-600 p-14 flex items-center"
              >
                <img src="/img/postman.png" alt="postman" />
              </div>
            ))}
        </div>
        <div className="mt-[32px] grid grid-cols-4 gap-4">
          {Array(4)
            .fill()
            .map((i) => (
              <div
                key={i}
                className="h-[152px] bg-[rgba(36, 30, 49, 0.8)] backdrop-blur-sm border rounded-lg border-dark-600 p-14 flex items-center"
              >
                <img src="/img/ibm.png" alt="postman" />
              </div>
            ))}
        </div>
        <div className="mt-[48px] text-center">
          <Button text="Become a sponsor" className="px-[14px] py-[24px] w-[244px] text-[21px] btn-gradient" />
        </div>
      </div>
    </div>
  );
}

export default Sponsors