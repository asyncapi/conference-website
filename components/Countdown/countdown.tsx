import React, { useEffect, useRef, useState } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';

type DateInfo = {
  name: string;
  date: string;
};

const dates: DateInfo[] = [
  { name: 'London, UK', date: 'September 20, 2023' },
  { name: 'Madrid, Spain', date: 'October 19, 2023' },
  { name: 'Bangalore, India', date: 'November 30, 2023' },
  { name: 'Paris, France', date: 'December 6, 2023' },
];

const Countdowns: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const locationRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (locationRef.current) {
        locationRef.current.classList.remove('hidden');
        locationRef.current.classList.add('home-title');
      }
      if (dateRef.current) {
        dateRef.current.classList.remove('hidden');
        dateRef.current.classList.add('home-title');
      }

      setSelectedIndex((prevIndex) => (prevIndex + 1) % dates.length);

      setTimeout(() => {
        locationRef.current?.classList.remove('home-title');
        locationRef.current?.classList.add('hidden');
        dateRef.current?.classList.remove('home-title');
        dateRef.current?.classList.add('hidden');
      }, 9900);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      return (
        <div className='home-title flex items-center w-[200px] sm:w-[100px] justify-between' ref={dateRef}>
          <span className='glitch text-white text-[30px] sm:text-[18px]'>Ended</span>
        </div>
      );
    } else {
      return (
        <div className='home-title flex items-center w-[200px] sm:w-[100px] justify-between' ref={dateRef}>
          <span className='glitch text-white text-[30px] sm:text-[18px]'>{days}:</span>
          <span className='glitch text-white text-[30px] sm:text-[18px]'>{hours}:</span>
          <span className='glitch text-white text-[30px] sm:text-[18px]'>{minutes}:</span>
          <span className='glitch text-white text-[30px] sm:text-[18px]'>{seconds}</span>
        </div>
      );
    }
  };

  return (
    <div className='mt-[400px] sm:mt-[150px] flex items-center justify-between'>
      <div className='h-[40px]'>
        <div className='home-title' ref={locationRef}>
          <span className='text-[25px] sm:text-[18px] text-white font-bold'>
            {dates[selectedIndex].name}
          </span>
        </div>
      </div>
      <div className='h-[40px]'>
        <Countdown date={new Date(dates[selectedIndex].date)} daysInHours={false} renderer={renderer} />
      </div>
    </div>
  );
};

export default Countdowns;
