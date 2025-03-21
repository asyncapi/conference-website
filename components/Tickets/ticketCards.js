import React, { useState, useCallback } from 'react';
import { Ticket, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../Buttons/button';


const TICKETS = [
  {
    id: 1,
    type: 'Singapore',
    price: 0,
    url: false,
    description: 'Access to all conference talks and workshops',
    status: 'Check Back Later',
    available: 50,
    benefits: ['All talks', 'Workshop access', 'Lunch included', 'API Standards booth']
  },
  {
    id: 2,
    type: 'Munich, Germany',
    price: 0,
    url: false,
    description: 'Access to all conference talks and workshops',
    status: 'Opening Soon',
    available: 50,
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
    benefits: ['All talks', 'Workshop access', 'Lunch included']
  },
];

const Tickets = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTicket = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % TICKETS.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating]);

  const prevTicket = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + TICKETS.length) % TICKETS.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating]);

  return (
    <div className="relative max-w-2xl p-6 mx-auto">
      <div className="absolute left-0 right-0 z-20 flex justify-between px-4 -translate-y-1/2 top-1/2">
        <button
          onClick={prevTicket}
          className="p-3 transition-colors bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Previous ticket"
          disabled={isAnimating}
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={nextTicket}
          className="p-3 transition-colors bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Next ticket"
          disabled={isAnimating}
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="relative h-96" role="region" aria-label="Ticket carousel">
        {TICKETS.map((ticket, index) => {
          const isCurrentCard = index === currentIndex;
          const isPrevCard = index === (currentIndex - 1 + TICKETS.length) % TICKETS.length;
          const isNextCard = index === (currentIndex + 1) % TICKETS.length;

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
              className="absolute top-0 left-0 right-0 transition-all duration-300 ease-in-out"
              style={{
                transform,
                opacity,
                zIndex
              }}
              role="group"
              aria-label={`Ticket for ${ticket.type}`}
              aria-hidden={!isCurrentCard}
            >
              <div className="overflow-hidden transition-colors duration-200 bg-white border border-gray-200 rounded-lg shadow-lg hover:border-blue-400">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{ticket.type}</h3>
                      <p className="mt-1 text-gray-600">{ticket.description}</p>
                    </div>
                    <div className="px-3 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r from-pink-100 to-pink-50 text-gradient">
                      {ticket.status}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">${ticket.price}</span>
                    <span className="ml-2 text-gray-600">/person</span>
                  </div>

                  <ul className="mt-6 space-y-3" role="list">
                    {ticket.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <Ticket className="flex-shrink-0 w-5 h-5 mr-3 text-blue-500" aria-hidden="true" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {ticket.url ? (
                    <a 
                      href={ticket.url} 
                      target='_blank' 
                      rel="noreferrer"
                      className="block mt-8"
                    >
                      <Button className="w-full">Get a Ticket</Button>
                    </a>
                  ) : (
                    <Button 
                      disabled={true} 
                      overlay={true} 
                      className="w-full mt-8 bg-gray-300"
                      aria-label={`${ticket.type} tickets not available yet`}
                    >
                      Get a Ticket
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-6" role="tablist">
        {TICKETS.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${index === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
            onClick={() => !isAnimating && setCurrentIndex(index)}
            aria-label={`Go to ticket ${index + 1}`}
            role="tab"
            aria-selected={index === currentIndex}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  );
};

export default Tickets;