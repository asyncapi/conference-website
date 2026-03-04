import { z } from 'zod'
import { Speaker, Ticket, AgendaSession, Venue, NavigationLink, FAQ } from '@/types/config'

/**
 * Runtime validation schemas using Zod
 * Ensures data integrity for configuration files
 */

// Speaker validation schema
export const SpeakerSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1, 'Speaker name is required'),
    title: z.string().min(1, 'Speaker title is required'),
    img: z.string().url('Invalid image URL').or(z.string().startsWith('/img/')),
    city: z.array(z.string()).min(1, 'At least one city is required'),
})

// Ticket validation schema
export const TicketSchema = z.object({
    id: z.number().positive(),
    type: z.string().min(1, 'Ticket type is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.string().min(1, 'Price is required'),
    status: z.string().min(1, 'Status is required'),
    benefits: z.array(z.string()).min(1, 'At least one benefit is required'),
})

// Agenda session validation schema
export const AgendaSessionSchema = z.object({
    id: z.number().positive(),
    time: z.string().min(1, 'Time is required'),
    title: z.string().min(1, 'Title is required'),
    speaker: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(['keynote', 'talk', 'workshop', 'break', 'networking']),
})

// Venue validation schema
export const VenueSchema = z.object({
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required'),
    location: z.string().min(1, 'Location is required'),
    date: z.string().min(1, 'Date is required'),
    status: z.enum(['upcoming', 'past']),
    cfpOpen: z.boolean().optional(),
})

// Navigation link validation schema (recursive)
const NavigationLinkSchema: z.ZodType<NavigationLink> = z.lazy(() =>
    z.object({
        title: z.string().min(1, 'Link title is required'),
        ref: z.string().min(1, 'Link reference is required'),
        subMenu: z.array(NavigationLinkSchema).optional(),
    })
)

// FAQ validation schema
export const FAQSchema = z.object({
    id: z.number().positive(),
    question: z.string().min(1, 'Question is required'),
    answer: z.string().min(1, 'Answer is required'),
    category: z.string().optional(),
})

/**
 * Validate array of speakers
 */
export function validateSpeakers(data: unknown): Speaker[] {
    return z.array(SpeakerSchema).parse(data)
}

/**
 * Validate array of tickets
 */
export function validateTickets(data: unknown): Ticket[] {
    return z.array(TicketSchema).parse(data)
}

/**
 * Validate array of agenda sessions
 */
export function validateAgenda(data: unknown): AgendaSession[] {
    return z.array(AgendaSessionSchema).parse(data)
}

/**
 * Validate array of navigation links
 */
export function validateNavigationLinks(data: unknown): NavigationLink[] {
    return z.array(NavigationLinkSchema).parse(data)
}

/**
 * Validate array of FAQs
 */
export function validateFAQs(data: unknown): FAQ[] {
    return z.array(FAQSchema).parse(data)
}

/**
 * Safe validation that returns errors instead of throwing
 */
export function safeValidate<T>(
    schema: z.ZodType<T>,
    data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
    const result = schema.safeParse(data)
    if (result.success) {
        return { success: true, data: result.data }
    }
    return { success: false, errors: result.error }
}
