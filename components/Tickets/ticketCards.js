import React from "react";
import Button from "../Buttons/button";

function TicketCards({ className, city }) {
  // Determine card style and status based on event status
  const isEnded = city.ended;
  const isUpcoming = !city.ticket;
  const cardOpacity = isEnded ? "opacity-60" : "opacity-100";
  const buttonText = city.isFree ? "Get Your Ticket" : "Buy Now";
  const statusLabel = isEnded
    ? "Ended"
    : isUpcoming
    ? "Coming Soon"
    : "Available";

  return (
    <div
      className={`w-[300px] lg:w-full ${cardOpacity} hoverEffect h-[400px] cursor-pointer flex flex-col text-white justify-between rounded-lg card bg-white ${className}`}
    >
      <div className="p-4">
        <div className="text-xl font-bold text-gradient">
          {city.name}, {city.country}
        </div>
        <div className="mt-2 text-lg">{city.date}</div>
        <div className="mt-1 text-sm italic">{statusLabel}</div>
      </div>
      <div className="flex justify-center border-t h-20 border-dashed p-4 text-center">
        {/* Show a button based on the event status */}
        {isEnded ? (
          <Button disabled overlay={true} className="w-[200px] bg-gray-400">
            Ended
          </Button>
        ) : isUpcoming ? (
          <Button disabled overlay={true} className="w-[200px] bg-gray-400">
            Coming Soon
          </Button>
        ) : (
          <a href={city.ticket} target="_blank" rel="noreferrer">
            <Button className="w-[200px]">{buttonText}</Button>
          </a>
        )}
      </div>
    </div>
  );
}

export default TicketCards;
