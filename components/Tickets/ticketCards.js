import React, { useEffect, useState } from 'react';
import Button from '../Buttons/button';
import cityList from '../../config/city-lists.json'; // Adjust the path to your JSON file

function TicketCards({ className }) {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    // Set the event data from the imported JSON file
    setEventsData(cityList);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {eventsData.map((city) => {
        // Determine card style based on event status
        const isEndedOrUpcoming = city.ended || !city.ticket;
        const cardOpacity = isEndedOrUpcoming ? 'opacity-40' : 'opacity-100';
        const buttonText = city.isFree ? 'Get Your Ticket' : 'Buy Now';

        return (
          <div 
            key={city.name} 
            className={`w-[300px] lg:w-full ${cardOpacity} hoverEffect h-[400px] cursor-pointer flex flex-col text-white justify-between rounded-lg card bg-white ${className} transition-transform duration-300 ease-in-out transform hover:scale-105`} // Added hover scale effect
          >
            <div className='p-4'>
              <div className='text-xl font-bold text-gradient'>{city.name}, {city.country}</div>
              <div className='mt-2 text-lg'>{city.date}</div>
              <div className='mt-2 text-sm'>{city.description}</div> {/* Added description */}
            </div>
            <div className='border-t h-20 border-dashed p-4 text-center'>
              {/* Show a button based on the event status */}
              {isEndedOrUpcoming ? (
                <Button disabled overlay={true} className='w-[200px] bg-gray-400'>
                  {city.ended ? 'Ended' : 'Coming soon'}
                </Button>
              ) : (
                <a href={city.ticket} target='_blank' rel='noreferrer'>
                  <Button className='w-[200px]'>{buttonText}</Button>
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TicketCards;
