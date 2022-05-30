import React from 'react';
import Image from "next/image";
import pattern3 from "../illustrations/pattern2.svg";

function NewsLetter() {
    return (
      <div className="p-20 bg-dark-paint text-center flex flex-col items-center">
        <h1 className="text-white text-4xl text-center font-bold leading-tight">
          Subscribe to our newsletter to receive news about AsyncAPI.
        </h1>
        <p className="mt-6 text-lg text-fainted-white">
          We respect your inbox. No spam, promise ✌️
        </p>
        <div className="w-4/5 mt-10">
          <form className="flex justify-between w-full">
            <input className="p-4 rounded-md  w-full" placeholder="Your name" />
            <input
              className="p-4 rounded-md  w-full ml-4"
              placeholder="Your email"
            />
            <button className="bg-tetiary-pink  w-full p-2 rounded-md text-white ml-4">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    );
}

export default NewsLetter
