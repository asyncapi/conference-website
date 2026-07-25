import React, { JSX } from 'react';
import Button from '../../Buttons/button';
import Arrows from '../../illustration/arrows';
import TicketIcon from '../../illustration/ticket';
import { Ticket as ITicket } from '../../../types/types';

interface TicketCardProps {
  availableTickets: ITicket[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  nextTicket: () => void;
  prevTicket: () => void;
  today: Date;
}

const TicketCard = ({
  availableTickets,
  currentIndex,
  setCurrentIndex,
  nextTicket,
  prevTicket,
  today,
}: TicketCardProps): JSX.Element => {
  return (
    <div className="relative mx-auto max-w-2xl p-6 sm:overflow-x-clip sm:px-2">
      <div className="absolute left-0 right-0 top-1/2 z-20 flex -translate-y-1/2 justify-between px-2 sm:px-0">
        <Button
          type="button"
          onClick={prevTicket}
          className="h-11 w-11 border border-white/20 bg-[#382855] p-0 shadow-lg shadow-black/20 transition-colors hover:bg-[#49346d] !justify-center"
          aria-label="Previous ticket"
          outline={true}
          icon={<Arrows direction="left" className="h-6 w-6" fill="#ffffff" />}
          iconPosition="left"
        />

        <Button
          type="button"
          onClick={nextTicket}
          className="h-11 w-11 border border-white/20 bg-[#382855] p-0 shadow-lg shadow-black/20 transition-colors hover:bg-[#49346d] !justify-center"
          aria-label="Next ticket"
          outline={true}
          icon={<Arrows direction="right" className="h-6 w-6" fill="#ffffff" />}
          iconPosition="left"
        />
      </div>

      <div className="relative h-[410px] sm:h-[480px]">
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
              <div className="overflow-hidden rounded-lg border border-white/15 bg-[#25163d] shadow-2xl shadow-black/25">
                <div className="relative p-7 sm:p-6">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2dccfd] to-[#ad20e2]" />
                  <div className="flex items-start justify-between gap-4 sm:flex-col">
                    <div>
                      <p className="text-sm font-medium uppercase text-cyan-200">
                        Conference pass
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">
                        {ticket.type}
                      </h3>
                      <p className="mt-2 leading-6 text-gray-200">
                        {ticket.description}
                      </p>
                    </div>
                    <div
                      className={`shrink-0 rounded-md border px-3 py-1 text-sm font-medium ${
                        isEnded
                          ? 'border-red-300/50 bg-red-500/20 text-red-100'
                          : 'border-cyan-300/50 bg-cyan-300/10 text-cyan-100'
                      }`}
                    >
                      {isEnded ? 'Closed' : ticket.status}
                    </div>
                  </div>

                  <div className="mt-6 flex items-end">
                    <span className="text-4xl font-bold text-white">
                      ${ticket.price}
                    </span>
                    <span className="ml-2 pb-1 text-gray-300">/person</span>
                  </div>

                  <ul className="mt-6 grid gap-3">
                    {ticket.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-white">
                        <span className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#35264f]">
                          <TicketIcon className="h-4 w-4 text-cyan-200" />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {ticket.url && !isEnded ? (
                    <a href={ticket.url} target="_blank" rel="noreferrer">
                      <Button
                        type="button"
                        className="mt-8 w-full"
                        text="Get a Free Ticket"
                      />
                    </a>
                  ) : (
                    <Button
                      type="button"
                      disabled={true}
                      outline={true}
                      className="mt-8 w-full border border-white/20 bg-[#34234f] text-gray-200"
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
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-cyan-200' : 'w-2 bg-white/40'
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

export default TicketCard;
