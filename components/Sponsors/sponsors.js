import React from 'react'
import Button from '../Button/button';

function Sponsors() {
  return (
    <div className="container mx-auto w-full bg-[#1c1234]">
      <div className="pt-[100px]  text-white">
        <h1 className="text-[84px] text-center">Sponsors for the 2023 Event </h1>
        <div className=" mt-20 mb-3 flex-col text-center w-[60rem] mx-auto">

          <h1 className=' text-2xl font-semibold'>Platinum</h1>
          <div className="bg-[rgba(36, 30, 49, 0.8)] backdrop-blur-sm rounded-lg p-14 flex justify-center">
            <img src="/img/postman.png" alt="postman" className=' block w-1/3 h-1/3 mx-10 -ml-10'/>
            <img src="/img/ably.png" alt="ably" className='w-1/3 h-1/3 '/>
          </div>

          <h1 className=' text-2xl font-semibold'>Gold</h1>
          <div className="bg-[rgba(36, 30, 49, 0.8)] backdrop-blur-sm rounded-lg p-14 flex justify-center">
            <img src="/img/postman.png" alt="postman" className=' block w-1/3 h-1/3  mx-10 -ml-10'/>
            <img src="/img/ably.png" alt="ably" className='w-1/3 h-1/3'/>
          </div>
        </div>
      </div>
      <h2 className=' text-center text-white text-2xl font-semibold'>Subscribe to our newsletter to receive news about <br/> AACoT’23.</h2>
      <div className=' flex justify-center mt-10 mb-10'>
        <div className=" flex">
          <input
            type="email"
            placeholder="Email Address"
            className="p-2 border border-gray-300 rounded-l w-[30rem]"
          />
          <button className="bg-purple-500 text-white w-[12rem] px-4 py-2 rounded-r">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sponsors