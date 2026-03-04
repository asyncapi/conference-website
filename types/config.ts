/**
 * TypeScript interfaces for configuration data
 * Provides type safety for JSON config files
 */

export interface Speaker {
    id: number;
    name: string;
    title: string;
    img: string;
    city: string[];
}

export interface Ticket {
    id: number;
    type: string;
    description: string;
    price: string;
    status: string;
    benefits: string[];
}

export interface AgendaSession {
    id: number;
    time: string;
    title: string;
    speaker?: string;
    description?: string;
    type: 'keynote' | 'talk' | 'workshop' | 'break' | 'networking';
}

export interface Venue {
    city: string;
    country: string;
    location: string;
    date: string;
    status: 'upcoming' | 'past';
    cfpOpen?: boolean;
}

export interface City {
    name: string;
    country: string;
    image: string;
    description?: string;
}

export interface NavigationLink {
    title: string;
    ref: string;
    subMenu?: NavigationLink[];
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

export interface FAQ {
    id: number;
    question: string;
    answer: string;
    category?: string;
}

export interface CFPData {
    open: boolean;
    deadline?: string;
    submissionUrl?: string;
    guidelines?: string;
}

export interface Edition {
    year: number;
    city: string;
    date: string;
    attendees?: number;
    talks?: number;
    url?: string;
}
