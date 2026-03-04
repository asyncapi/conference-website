import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar/navbar'

// Mock useMediaQuery hook
jest.mock('react-responsive', () => ({
    useMediaQuery: jest.fn(() => true), // Mobile view by default
}))

describe('Navbar Component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders logo', () => {
        render(<Navbar />)
        const logo = screen.getByAltText('conference logo')
        expect(logo).toBeInTheDocument()
    })

    it('renders hamburger menu button on mobile', () => {
        const { container } = render(<Navbar />)
        // Query by data-test attribute directly
        const hamburger = container.querySelector('[data-test="nav-Hamberger"]')
        expect(hamburger).toBeInTheDocument()
    })

    it('has transparent background by default', () => {
        const { container } = render(<Navbar />)
        const navbar = container.querySelector('.bg-transparent')
        expect(navbar).toBeInTheDocument()
    })
})
