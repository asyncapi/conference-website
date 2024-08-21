import React from 'react'
import Button from '../Buttons/button'

function TicketCards({ className, city }) {
  // Determine card style based on ticket availability and event status
  const isCardActive = city.ticket && !city.ended;
  const cardOpacity = isCardActive ? 'opacity-100' : 'opacity-40';
  const buttonEnabled = isCardActive;

  return (
    <div className={`w-[300px] lg:w-full ${cardOpacity} h-[400px] flex flex-col text-white justify-between rounded-lg card bg-white ${className}`}>
      <div className='p-4'>
        <div className='text-xl font-bold text-gradient'>{city.name}, {city.country}</div>
        <div className='mt-2 text-lg'>{city.date}</div>
      </div>
      <div className='border-t h-20 border-dashed p-4 text-center'>
        {city.ticket && (
          <a href={city.ticket} target='_blank' rel='noreferrer'>
            <Button disabled={!buttonEnabled} className={`w-[200px] ${buttonEnabled ? '' : 'cursor-not-allowed'}`}>
              {city.isFree ? 'Get Your Ticket' : 'Buy Now'}
            </Button>
          </a>
        )}
      </div>
    </div>
  )
}

export default TicketCards;