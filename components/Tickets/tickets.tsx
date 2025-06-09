import React, { useState } from 'react';
import Button from '../Buttons/button';
import Arrows from '../illustration/arrows';
import TicketIcon from '../illustration/ticket';
import tickets from '../../config/tickets.json';
import { Ticket as ITicket } from '../../types/types';

const Tickets = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const today = new Date();

  const availableTickets: ITicket[] = tickets.filter(
    (ticket: ITicket) => new Date(ticket.eventDate) > today
  );

  const nextTicket = (): void => {
    setCurrentIndex((prev) => (prev + 1) % availableTickets.length);
  };

  const prevTicket = (): void => {
    setCurrentIndex(
      (prev) => (prev - 1 + availableTickets.length) % availableTickets.length
    );
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
          const isCurrentCard: boolean = index === currentIndex;
          const isPrevCard: boolean =
            index ===
            (currentIndex - 1 + availableTickets.length) %
              availableTickets.length;
          const isNextCard: boolean =
            index === (currentIndex + 1) % availableTickets.length;
          const isEnded: boolean = today > new Date(ticket.eventDate);

          let zIndex: number = 0;
          let transform: string = 'scale(0.9) translateX(-100%) rotate(-5deg)';
          let opacity: string = '0';

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
                zIndex,
              }}
            >
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {ticket.type}
                      </h3>
                      <p className="text-gray-500 mt-1">{ticket.description}</p>
                    </div>
                    <div className="px-2 py-1 rounded-full text-sm font-medium text-gradient">
                      {isEnded ? 'Ended' : ticket.status}
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">
                      ${ticket.price}
                    </span>
                    <span className="text-gray-500 ml-2">/person</span>
                  </div>

                  <ul className="mt-6 space-y-2">
                    {ticket.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <TicketIcon className="h-4 w-4 mr-2 text-blue-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {ticket.url && !isEnded ? (
                    <a href={ticket.url} target="_blank" rel="noreferrer">
                      <Button type="button" className="mt-8 w-full">
                        Get a Ticket
                      </Button>
                    </a>
                  ) : (
                    <Button
                      type="button"
                      disabled={true}
                      overlay={true}
                      className="mt-8 w-full bg-gray-300"
                    >
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
        {availableTickets.map((_, index: number) => {
          return (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-blue-400' : 'w-2 bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to ticket ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Tickets;
