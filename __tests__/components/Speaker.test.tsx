import { render, screen } from '@testing-library/react'
import Speaker from '@/components/Speaker/speaker'

describe('Speaker Component', () => {
    const mockSpeaker = {
        id: 1,
        name: 'John Doe',
        title: 'Senior Engineer at Tech Corp',
        img: '/img/speaker-images/john-doe.webp',
        city: ['California'],
    }

    it('renders speaker name', () => {
        render(<Speaker details={mockSpeaker} />)
        // Name might be shortened if > 20 chars, so just check it contains the name
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
    })

    it('renders speaker title', () => {
        render(<Speaker details={mockSpeaker} />)
        expect(screen.getByText('Senior Engineer at Tech Corp')).toBeInTheDocument()
    })

    it('renders speaker image with correct alt text', () => {
        render(<Speaker details={mockSpeaker} />)
        const image = screen.getByAltText('John Doe')
        expect(image).toBeInTheDocument()
    })
})
