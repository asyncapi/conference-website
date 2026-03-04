import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';

import TicketCard from './TicketCard';
import { Ticket as ITicket } from '../../../types/types';

const meta: Meta<typeof TicketCard> = {
    title: 'Components/Card/TicketCard',
    component: TicketCard,
    decorators: [
        (Story) => (
            <div className="max-w-4xl mx-auto p-8">
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof TicketCard>;

const mockTickets: ITicket[] = [
    {
        id: 1,
        type: 'Singapore',
        price: 0,
        url: 'https://ticket.apidays.global/event/apidays-singapore-2025',
        description: 'Access to all conference talks and workshops',
        status: 'Get Your Free Ticket',
        available: 50,
        eventDate: '2025-12-20T00:00:00.000Z',
        benefits: [
            'AsyncAPI Track',
            'Workshop access',
            'Lunch included',
            'All talks',
        ],
    },
    {
        id: 2,
        type: 'Munich, Germany',
        price: 0,
        url: 'https://ticket.apidays.global/event/apidays-munich-2025',
        description: 'Access to all conference talks and workshops',
        status: 'Get Your Free Ticket',
        available: 50,
        eventDate: '2025-12-02T00:00:00.000Z',
        benefits: ["AsyncAPI Track", "All OPEN Talks", "Networking", "Expo Hall"],
    },
    {
        id: 3,
        type: "California, USA",
        price: 0,
        url: "https://link.devnetwork.com/1Uvd6FUb",
        description: "Access to the conference talks and Expo Hall",
        status: "Get a Free Open Pass",
        available: 50,
        eventDate: "2026-02-18T00:00:00.000Z",
        benefits: ["AsyncAPI Track", "All OPEN Talks", "Networking", "Expo Hall"]
    },
];

const DefaultWrapper = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const today = new Date();

    const nextTicket = () => {
        setCurrentIndex((prev) => (prev + 1) % mockTickets.length);
    };

    const prevTicket = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + mockTickets.length) % mockTickets.length
        );
    };

    return (
        <TicketCard
            availableTickets={mockTickets}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            nextTicket={nextTicket}
            prevTicket={prevTicket}
            today={today}
        />
    );
};

const SingleTicketWrapper = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const today = new Date();

    return (
        <TicketCard
            availableTickets={[mockTickets[0]]}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            nextTicket={() => { }}
            prevTicket={() => { }}
            today={today}
        />
    );
};

export const Default: Story = {
    render: () => <DefaultWrapper />,
};

export const SingleTicket: Story = {
    render: () => <SingleTicketWrapper />,
};
