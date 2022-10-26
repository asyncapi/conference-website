import React from "react";

function Sponsors() {
  return (
    <div className="container mx-auto w-full">
      <div className="pt-[100px] text-white mb-20">
        <h1 className="text-[84px] text-center text-white font-[400] tracking-tight md:text-[30px]">
          2022 Event Sponsors
        </h1>
        <div className="mt-[48px] grid grid-cols-2 md:grid-cols-1 gap-4">
          <div className="h-[304px] bg-[rgba(36, 30, 49, 0.8)] backdrop-blur-sm border rounded-lg border-dark-600 p-14 flex items-center justify-center">
            <img src="/img/postman.png" alt="postman" />
          </div>
          <div className="h-[304px] flex flex-col justify-center">
            <div className="h-[152px] bg-[rgba(36, 30, 49, 0.8)] backdrop-blur-sm border rounded-lg border-dark-600 p-14 flex items-center justify-center">
              <img src="/img/ably.png" alt="ably" className="w-[300px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
