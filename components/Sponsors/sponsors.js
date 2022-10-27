import React from 'react'
import Button from '../Button/button';

function Sponsors() {
  return (
    <div className="container mx-auto w-full">
      <div className="pt-[100px] mb-20 text-white">
        <h1 className="text-[84px]">2022 Event Sponsors</h1>
        <div className="mt-[48px] grid grid-cols-2 gap-4">
          <div className="h-[304px] bg-[rgba(36, 30, 49, 0.8)] backdrop-blur-sm border rounded-lg border-dark-600 p-14 flex items-center justify-center relative">
            <div className="absolute top-1 left-1 btn-gradient rounded-lg p-2 min-w-[80px] height-[40px] text-center">
              Platinum sponsor
            </div>
            <img src="/img/postman.png" alt="postman" />{" "}
          </div>
        </div>
        <div className="mt-[32px] grid grid-cols-3 gap-4">
          <div className="h-[200px] bg-[rgba(36, 30, 49, 0.8)] backdrop-blur-sm border rounded-lg border-dark-600 p-14 flex items-center justify-center relative">
            <div className="absolute top-1 left-1 btn-gradient rounded-lg  p-2 min-w-[80px] height-[40px] text-center">
              Gold sponsor
            </div>
            <img src="/img/ably.png" alt="ably" className="w-[300px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sponsors