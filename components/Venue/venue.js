/* eslint-disable react/no-unescaped-entities */
import React from 'react';

function Venue({ className, city }) {
    return (
        <div>
            <div
                style={{ '--image-url': `url(${city.img})` }}
                className="relative w-[300px] h-[400px] sm:w-[250px] sm:h-[350px] card-bg bg-[image:var(--image-url)] flex items-center justify-center p-4 cursor-pointer"
            >
                <div className="absolute inset-0 bg-black opacity-50 rounded-3xl"></div>
                <div className="relative flex justify-between flex-col w-full h-full">
                    <div className="flex justify-between items-center">
                        <div>
                            <div
                                className={`border text-white text-md rounded-lg p-1 text-center mt-2 ${
                                    city.cfp ? 'block' : 'hidden'
                                }`}
                            >
                                cfp is open
                            </div>
                        </div>
                        <a
                            href={city.map}
                            target="_blank"
                            className="w-8 h-8 bg-white rounded-xl flex items-center justify-center"
                            rel="noreferrer"
                        >
                            <img src="/img/mapIcon.svg" className="w-6" alt="Map Icon" />
                        </a>
                    </div>
                    <div></div>
                    <div className="text-white">
                        <div>
                            <span className="text-lg font-bold">
                                {city.country}, {city.name}
                            </span>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="border border-gray-400 rounded-lg p-1 text-center mt-2">
                                {city.date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Venue;