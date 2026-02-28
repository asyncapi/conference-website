import React, { JSX, useState } from 'react';
import tickets from '../../config/tickets.json';
import { Ticket as ITicket } from '../../types/types';
import TicketCard from '../Cards/TicketsCard/TicketCard';

const Ticket = (): JSX.Element => {
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
        <TicketCard
            availableTickets={availableTickets}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            nextTicket={nextTicket}
            prevTicket={prevTicket}
            today={today}
        />
    );
};

export default Ticket;