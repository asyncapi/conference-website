import React from 'react'
import Button from '../Buttons/button'

function TicketCards({ className, city }) {
  // Hide the card if the event has ended

  // Determine card style based on ticket availability
  const isCardActive = city.ticket;
  const cardOpacity = isCardActive && 'card-opacity'
  const buttonEnabled = isCardActive && city.ticket;

  return (
    <div className={`w-[300px] lg:w-full ${cardOpacity} opacity-40 hoverEffect h-[400px] cursor-pointer flex flex-col text-white justify-between rounded-lg card bg-white ${className}`}>
      <div className='p-4'>
        <div className='text-xl font-bold text-gradient'>{city.name}, {city.country}</div>
        <div className='mt-2 text-lg'>{city.date}</div>
      </div>
      <div className='border-t h-20 border-dashed p-4 text-center'>
        {
          city.ended || !city.ticket ? <Button disabled overlay={true} className='w-[200px] bg-gray-400'>
          {city.ended ? 'Ended' : 'Coming soon'}
        </Button> :
        <Button className='w-[200px]'>
          {city.isFree ? 'Get Your Ticket' : 'Buy Now'}
        </Button> 
        }
        {/* {city.ticket ? (
          <a href={city.ticket} target='_blank' rel='noreferrer'>
            <Button disabled={!buttonEnabled} className={`w-[200px] ${buttonEnabled ? '' : 'cursor-not-allowed'}`}>
              {city.isFree ? 'Get Your Ticket' : 'Buy Now'}
            </Button>
          </a>
        ) : (
          <Button disabled className='w-[200px] cursor-not-allowed'>
            Coming Soon
          </Button>
        )} */}
      </div>
    </div>
  )
}

export default TicketCards;
