import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Ticket } from "lucide-react";
import Button from "../Buttons/button";

const Tickets = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const tickets = [
    {
      id: 1,
      type: 'Singapore',
      price: 0,
      url: false,
      description: 'Access to all conference talks and workshops',
      status: 'Check Back Later',
      available: 50,
      benefits: ['All talks', 'Workshop access', 'Lunch included', 'API Standards booth'],
    },
    {
      id: 2,
      type: 'Munich, Germany',
      price: 0,
      url: false,
      description: 'Access to all conference talks and workshops',
      status: 'Opening Soon',
      available: 50,
      benefits: ['All talks', 'Workshop access', 'Lunch included', 'API Standards booth'],
    },
    {
      id: 3,
      type: 'Lagos, Nigeria',
      price: 0,
      url: false,
      description: 'Access to all conference talks and workshops',
      status: 'Not Yet Available',
      available: 50,
      benefits: ['All talks', 'Workshop access', 'Lunch included'],
    },
  ];

  const nextTicket = () => {
    setCurrentIndex((prev) => (prev + 1) % tickets.length);
  };

  const prevTicket = () => {
    setCurrentIndex((prev) => (prev - 1 + tickets.length) % tickets.length);
  };

  return (
    <div className="relative max-w-2xl mx-auto p-6"
    data-test="tickets-carousel">

      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between z-20 px-4">
        <button
          onClick={prevTicket}
          data-test="prev-ticket"
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-xl"
          aria-label="Previous ticket"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
        <button
          onClick={nextTicket}
          data-test="next-ticket"
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-xl"
          aria-label="Next ticket"
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="relative h-96">
        {tickets.map((ticket, index) => {
          const isCurrent = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + tickets.length) % tickets.length;
          const isNext = index === (currentIndex + 1) % tickets.length;

          let zIndex = 0;
          let transform = "scale(0.9) translateX(-100%) rotate(-5deg)";
          let opacity = "0";

          if (isCurrent) {
            zIndex = 10;
            transform = "scale(1) translateX(0) rotate(0deg)";
            opacity = "1";
          } else if (isPrev) {
            zIndex = 5;
            transform = "scale(0.9) translateX(-60%) rotate(-5deg)";
            opacity = "0.7";
          } else if (isNext) {
            zIndex = 5;
            transform = "scale(0.9) translateX(60%) rotate(5deg)";
            opacity = "0.7";
          }

          return (
            <div
              key={ticket.id}
              className="absolute top-0 left-0 right-0 transition-all duration-500 ease-in-out"
              style={{
                transform,
                opacity,
                zIndex,
              }}
            >
              <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-300 relative transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 transform transition-transform duration-300 group-hover:translate-x-2"
                      data-test="ticket-location">
                        {ticket.type}
                      </h3>
                      <p className="text-gray-500 mt-1">{ticket.description}</p>
                    </div>
                    <div className="px-2 py-1 rounded-full text-sm text-gradient font-medium animate-pulse">
                      {ticket.status}
                    </div>
                  </div>

                  <div className="mt-4 transition-all duration-300 transform hover:scale-105">
                    <span className="text-3xl font-bold text-gray-900">${ticket.price}</span>
                    <span className="text-gray-500 ml-2">/person</span>
                  </div>

                  <ul className="mt-6 space-y-2">
                    {ticket.benefits.map((benefit, i) => (
                      <li 
                        key={i} 
                        className="flex items-center text-gray-600 transition-transform duration-300 hover:translate-x-2"
                      >
                        <Ticket className="h-4 w-4 mr-2 text-blue-500 transition-colors duration-300 group-hover:text-blue-700" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {ticket.url ? (
                    <a href={ticket.url} target="_blank" rel="noreferrer">
                      <Button className="mt-8 w-full transition-all duration-300 hover:bg-blue-600">
                        Get a Ticket
                      </Button>
                    </a>
                  ) : (
                    <Button 
                      disabled={true} 
                      overlay={true} 
                      className="mt-8 w-full bg-gray-300 cursor-not-allowed opacity-70"
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

      <div className="flex justify-center mt-6 gap-2"
       data-test="pagination-dots">
        
        {tickets.map((_, index) => (
          <button
            key={index}
            data-test={`pagination-dot-${index}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-6 bg-blue-400 scale-125' 
                : 'w-2 bg-gray-300 hover:bg-blue-200'
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