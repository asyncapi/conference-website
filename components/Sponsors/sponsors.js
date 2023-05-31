import React from "react";
import Button from "../Button/button";

function Sponsors() {
  return (
    <>
      <div className="container mx-auto w-full bg-[#1c1234]">
        <div className=" container mx-auto w-full ">
          <div className="pt-[100px]  text-white">
            <h1 className="text-[84px] ">Event Sponsors </h1>
            <div className=" mt-20 mb-3 flex-col w-[60rem] ">
              <div className="flex items-center">
                <h1 className="text-2xl font-semibold mr-4 w-32">Platinum</h1>
                <div
                  className="flex-1 border border-gray-400 opacity-50"
                  style={{
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    borderImage:
                      "repeating-linear-gradient(to right, transparent, transparent 5px, rgba(169, 169, 169, 0.5) 5px, rgba(169, 169, 169, 0.5) 10px) 1",
                  }}
                ></div>
              </div>

              <div className="bg-[rgba(36, 30, 49, 0.8)] backdrop-blur-sm rounded-lg p-14 flex">
                <img
                  src="/img/postman.png"
                  alt="postman"
                  className=" block w-1/3 h-1/3 mx-10 -ml-14"
                />
                <img src="/img/ably.png" alt="ably" className="w-1/3 h-1/3 " />
              </div>

              <div className="flex items-center">
                <h1 className=" text-2xl font-semibold mr-4 w-32">Gold</h1>
                <div
                  className="flex-1 border border-gray-400 opacity-50"
                  style={{
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    borderImage:
                      "repeating-linear-gradient(to right, transparent, transparent 5px, rgba(169, 169, 169, 0.5) 5px, rgba(169, 169, 169, 0.5) 10px) 1",
                  }}
                ></div>
              </div>

              <div className="bg-[rgba(36, 30, 49, 0.8)] backdrop-blur-sm rounded-lg p-14 flex">
                <img
                  src="/img/postman.png"
                  alt="postman"
                  className=" block w-1/3 h-1/3  mx-10 -ml-14"
                />
                <img src="/img/ably.png" alt="ably" className="w-1/3 h-1/3" />
              </div>
            </div>
          </div>
        </div>
      </div>


      
      <div className=" flex flex-col items-center mt-10 mb-10 bg-white bg-opacity-10 h-[28vh] justify-center mb-20">
        <div className="flex mx-auto">
          <h2 className="text-center text-white text-2xl font-semibold">
            Subscribe to our newsletter to receive news about <br /> AACoT’23.
          </h2>
        </div>
        <div className="flex justify-center mt-10">
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
    </>
  );
}

export default Sponsors;
