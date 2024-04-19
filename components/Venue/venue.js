/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';

function Venue({ className, city }) {
	return (
		<Link href={`/venue/${city.name}`}>
            <div
                style={{ '--image-url': `url(${city.img})` }}
                className="relative w-[300px] h-[400px] sm:w-[250px] sm:h-[350px] card-bg bg-[image:var(--image-url)] flex items-center justify-center p-4 cursor-pointer"
            >
                <div className="absolute inset-0 bg-black opacity-50 rounded-3xl"></div>
                <div className="relative flex justify-between flex-col w-full h-full">
                    <div className="flex justify-between items-center">
                        <div>
                            <div
                                className={`bg-[#3d4555] shadow-[#16191e] text-white w-[85px] h-[30px] text-center pt-[6px] rounded-[87px] gap-[10px] font-inter font-normal text-xs leading-tight ${
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
                    <div className="text-white pb-4">
                        <div>
                            <span className="text-lg font-bold">
                                {city.country}, {city.name}
                            </span>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="border border-gray-400 rounded-[22px] p-1 text-center mt-2 bg-[#EDEEFD] text-blue text-md">
								<span className='text-blue-600'>{city.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Venue;