import React, { useState } from 'react';
import Button from '../Buttons/button';
import Arrows from '../illustration/arrows';
import Ticket from '../illustration/ticket';

const Tickets = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const today = new Date();

  const tickets = [
    {
      id: 1,
      type: 'Singapore',
      price: 0,
      url: 'https://ticket.apidays.global/event/apidays-singapore-2025/4c745e62-0e52-4c4a-9221-29f47bc57128/cart?coupon=ASYNCAPICOMMUNITY',
      description: 'Access to all conference talks and workshops',
      status: 'Get Your Free Ticket',
      available: 50,
      eventDate: new Date('2025-01-20'),
      benefits: ['AsyncAPI Track', 'Workshop access', 'Lunch included', 'All talks']
    },
    {
      id: 2,
      type: 'Munich, Germany',
      price: 0,
      url: false,
      description: 'Access to all conference talks and workshops',
      status: 'Opening Soon',
      available: 50,
      eventDate: new Date('2025-07-2'),
      benefits: ['All talks', 'Workshop access', 'Lunch included', 'API Standards booth']
    },
    {
      id: 3,
      type: 'Lagos, Nigeria',
      price: 0,
      url: false,
      description: 'Access to all conference talks and workshops',
      status: 'Not Yet Available',
      available: 50,
      eventDate: new Date('2025-07-18'),
      benefits: ['All talks', 'Workshop access', 'Lunch included']
    },
    {
      id: 4,
      type: 'London, UK',
      price: 0,
      url: false,
      description: 'Access to all conference talks and workshops',
      status: 'Not Yet Available',
      available: 100,
      eventDate: new Date('2025-09-22'),
      benefits: ['AsyncAPI Track', 'All talks', 'Networking', 'Lunch included']
    },
    {
      id: 5,
      type: 'Bangalore, India',
      price: 0,
      url: false,
      description: 'Access to all conference talks and workshops',
      status: 'Not Yet Available',
      available: 80,
      eventDate: new Date('2025-09-15'),
      benefits: ['All talks', 'AsyncAPI Track', 'Workshop access', 'Lunch included']
    },
    {
      id: 6,
      type: 'Online',
      price: 0,
      url: false,
      description: 'Access to all conference talks and workshops',
      status: 'Not Yet Available',
      available: 100,
      eventDate: new Date('2025-09-15'),
      benefits: ['AsyncAPI Track', 'All talks', 'Networking']
    },
    {
      id: 7,
      type: 'Paris, France',
      price: 0,
      url: false,
      description: 'Access to all conference talks and workshops',
      status: 'Not Yet Available',
      available: 100,
      eventDate: new Date('2025-12-9'),
      benefits: ['AsyncAPI Track', 'All talks', 'Networking']
    },
  ];

  const availableTickets = tickets.filter(ticket => ticket.eventDate > today);

  const nextTicket = () => {
    setCurrentIndex((prev) => (prev + 1) % availableTickets.length);
  };

  const prevTicket = () => {
    setCurrentIndex((prev) => (prev - 1 + availableTickets.length) % availableTickets.length);
  };

  return (
    <div className="relative max-w-2xl mx-auto p-6">
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between z-20 px-4">
        <button
          onClick={prevTicket}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Previous ticket"
        >
          <Arrows direction="left" className="w-6 h-6" fill="#4B5563" />
        </button>
        <button
          onClick={nextTicket}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Next ticket"
        >
          <Arrows direction="right" className="w-6 h-6" fill="#4B5563" />
        </button>
      </div>

      <div className="relative h-96">
        {availableTickets.map((ticket, index) => {
          const isCurrentCard = index === currentIndex;
          const isPrevCard = index === (currentIndex - 1 + availableTickets.length) % availableTickets.length;
          const isNextCard = index === (currentIndex + 1) % availableTickets.length;
          const isEnded = today > ticket.eventDate;

          let zIndex = 0;
          let transform = 'scale(0.9) translateX(-100%) rotate(-5deg)';
          let opacity = '0';

          if (isCurrentCard) {
            zIndex = 10;
            transform = 'scale(1) translateX(0)';
            opacity = '1';
          } else if (isPrevCard) {
            zIndex = 5;
            transform = 'scale(0.9) translateX(-60%) rotate(-5deg)';
            opacity = '0.7';
          } else if (isNextCard) {
            zIndex = 5;
            transform = 'scale(0.9) translateX(60%) rotate(5deg)';
            opacity = '0.7';
          }

          return (
            <div
              key={ticket.id}
              className="absolute top-0 left-0 right-0 transition-all duration-500 ease-in-out"
              style={{
                transform,
                opacity,
                zIndex
              }}
            >
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{ticket.type}</h3>
                      <p className="text-gray-500 mt-1">{ticket.description}</p>
                    </div>
                    <div className="px-2 py-1 rounded-full text-sm font-medium text-gradient">
                      {isEnded ? 'Ended' : ticket.status}
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">${ticket.price}</span>
                    <span className="text-gray-500 ml-2">/person</span>
                  </div>

                  <ul className="mt-6 space-y-2">
                    {ticket.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <Ticket className="h-4 w-4 mr-2 text-blue-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {ticket.url && !isEnded ? (
                    <a href={ticket.url} target="_blank" rel="noreferrer">
                      <Button className="mt-8 w-full">Get a Ticket</Button>
                    </a>
                  ) : (
                    <Button disabled={true} overlay={true} className="mt-8 w-full bg-gray-300">
                      {isEnded ? 'Event Ended' : 'Get a Ticket'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {availableTickets.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-6 bg-blue-400' : 'w-2 bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to ticket ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Tickets;
