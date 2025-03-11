import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Ticket } from "lucide-react";
import tickets from "../../data/tickets.json";
import Button from "../Buttons/button";

const TicketCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTicket = () => {
    setCurrentIndex((prev) => (prev + 1) % tickets.length);
  };

  const prevTicket = () => {
    setCurrentIndex((prev) => (prev - 1 + tickets.length) % tickets.length);
  };

  return (
    <div className="relative max-w-2xl mx-auto p-6" data-test="ticket-cards">
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between z-20 px-4">
        <button
          onClick={prevTicket}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
          aria-label="Previous ticket"
          data-test="prev-ticket-button"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
        <button
          onClick={nextTicket}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
          aria-label="Next ticket"
          data-test="next-ticket-button"
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
            transform = "scale(1) translateX(0)";
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
              style={{ transform, opacity, zIndex }}
              data-test={`ticket-card-${index + 1}`}
            >
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900" data-test="ticket-title">
                        {ticket.type}
                      </h3>
                      <p className="text-gray-500 mt-1" data-test="ticket-description">
                        {ticket.description}
                      </p>
                    </div>
                    <div className="px-2 py-1 rounded-full text-sm font-medium" data-test="ticket-status">
                      {ticket.status}
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900" data-test="ticket-price">
                      ${ticket.price}
                    </span>
                    <span className="text-gray-500 ml-2">/person</span>
                  </div>

                  <ul className="mt-6 space-y-2">
                    {ticket.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-gray-600" data-test="ticket-benefit">
                        <Ticket className="h-4 w-4 mr-2 text-blue-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {ticket.url ? (
                    <a href={ticket.url} target="_blank" rel="noreferrer">
                      <Button className="mt-8 w-full" data-test="ticket-button">
                        Get a Ticket
                      </Button>
                    </a>
                  ) : (
                    <Button disabled className="mt-8 w-full bg-gray-300" data-test="ticket-not-available">
                      Not Available
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {tickets.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-6 bg-blue-400" : "w-2 bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to ticket ${index + 1}`}
            data-test={`ticket-indicator-${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketCards;
