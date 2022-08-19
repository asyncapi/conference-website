/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Button from '../Button/button';
import Card from '../Cards/card';
import CardSlider from '../Cards/slider';

function Recordings() {
  return (
    <div className="container mx-auto w-full">
      <div className="pt-[184px] text-white">
        <h1 className="text-[84px]">Last year's conference recordings</h1>
        <p className="pt-[16px] text-[26px] text-dark-500">
          Check out the talks from the AsyncAPI Conference 2021
        </p>
        <div className="mt-[53px]">
          <CardSlider dotPosition='center'>
            {Array(6)
              .fill()
              .map((i) => (
                <div key={i}>
                  <Card
                    title=""
                    alt="missy"
                    summary="GSoC: Generating diffs using AsyncAPI Diff - Aayush Sahu, Individual Contributor"
                    img="/img/banner.png"
                    optional = {<Button text='Watch Video' className='w-[229px] h-[56px] mt-[70px]' />}
                  />
                </div>
              ))}
          </CardSlider>
        </div>
      </div>
    </div>
  );
}

export default Recordings