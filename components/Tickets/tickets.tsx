import React, { JSX, useState } from 'react';
import Button from '../Buttons/button';
import Arrows from '../illustration/arrows';
import TicketIcon from '../illustration/ticket';
import tickets from '../../config/tickets.json';
import { Ticket as ITicket } from '../../types/types';

const Tickets = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const today = new Date();

  const availableTickets: ITicket[] = tickets.sort((a, b) => {
    const aEnded = new Date(a.eventDate) < today;
    const bEnded = new Date(b.eventDate) < today;
    if (aEnded === bEnded) return 0;
    return aEnded ? 1 : -1;
  });

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
      {/* Decorative background elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>

      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between z-20 px-4">
        < Button
          type="button"
          onClick={prevTicket}
          className="bg-white p-2 shadow-lg transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-400 hover:to-purple-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-400/50"
          aria-label="Previous ticket"
          outline={true}
          icon={<Arrows direction="left" className="w-6 h-6 transition-transform duration-300 hover:scale-110" fill="#4B5563" />}
          iconPosition="left"
        />

        < Button
          type="button"
          onClick={nextTicket}
          className="bg-white p-2 shadow-lg transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-400 hover:to-purple-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-400/50"
          aria-label="Next ticket"
          outline={true}
          icon={<Arrows direction="right" className="w-6 h-6 transition-transform duration-300 hover:scale-110" fill="#4B5563" />}
          iconPosition="left"
        />

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
              className="absolute top-0 left-0 right-0 transition-all duration-700 ease-out"
              style={{
                transform,
                opacity,
                zIndex,
              }}
            >
              <div className="relative bg-white shadow-2xl rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-blue-400 transition-all duration-500 hover:shadow-blue-400/30 group">
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"></div>

                {/* Subtle decorative gradient - top corner only */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-transparent rounded-bl-full"></div>

                <div className="relative p-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:text-blue-600">
                        {ticket.type}
                      </h3>
                      <p className="text-gray-600 mt-2 font-medium">{ticket.description}</p>
                    </div>
                    <div
                      className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-300 shadow-lg ${isEnded
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-110 hover:shadow-purple-500/50'
                        }`}
                    >
                      {isEnded ? 'Closed' : ticket.status}
                    </div>
                  </div>

                  <div className="mt-6 flex items-baseline">
                    <span className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ${ticket.price}
                    </span>
                    <span className="text-gray-600 ml-3 text-lg font-semibold">/person</span>
                  </div>

                  <div className="mt-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                  <ul className="mt-8 space-y-3">
                    {ticket.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start text-gray-800 transition-all duration-300 hover:text-gray-900 hover:translate-x-2 group/item">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3 mt-0.5 group-hover/item:scale-110 transition-transform duration-300 shadow-sm">
                          <TicketIcon className="h-3 w-3 text-white" />
                        </div>
                        <span className="font-semibold leading-tight">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {ticket.url && !isEnded ? (
                    <a href={ticket.url} target="_blank" rel="noreferrer">
                      <Button type="button" className="mt-10 w-full shadow-xl hover:shadow-2xl" text="Get a Free Ticket" />
                    </a>
                  ) : (
                    <Button
                      type="button"
                      disabled={true}
                      outline={true}
                      className="mt-10 w-full bg-gray-200 text-gray-500 cursor-not-allowed opacity-60"
                    >
                      {isEnded ? 'Event Closed' : 'Get a Ticket'}
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
              className={`h-2 rounded-full transition-all duration-500 hover:scale-125 hover:bg-blue-500 ${index === currentIndex ? 'w-6 bg-blue-400 shadow-lg shadow-blue-400/50' : 'w-2 bg-gray-300'
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
