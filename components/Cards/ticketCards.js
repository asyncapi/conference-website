import React from "react";
import Button from "../Buttons/button";

function TicketCards({ className, city }) {
  return (
    <div
      className={`w-[300px] lg:w-full opacity-20 h-[400px] flex flex-col text-white justify-between rounded-lg card bg-white ${className}`}
    >
      <div className="p-4">
        <div className="text-xl font-bold text-gradient">
          {city.name}, {city.country}
        </div>
        <div className="mt-2 text-lg">{city.date}</div>
      </div>
      <div className="border-t h-20 border-dashed p-4 text-center">
        <Button disabled={true} className="w-[200px]">
          Buy now
        </Button>
      </div>
    </div>
  );
}

export default TicketCards;
