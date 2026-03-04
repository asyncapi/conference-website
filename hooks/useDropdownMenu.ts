import { useState, useEffect, useRef, useCallback } from 'react'

interface UseDropdownMenuReturn {
    show: string | null
    isSubMenuHovered: boolean
    focusedSubMenuItem: number
    subMenuRefs: React.MutableRefObject<(HTMLAnchorElement | null)[]>
    closeTimeout: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
    handleMouseEnter: (title: string) => void
    handleMouseLeave: () => void
    handleSubMenuEnter: () => void
    handleSubMenuLeave: () => void
    setShow: React.Dispatch<React.SetStateAction<string | null>>
    setFocusedSubMenuItem: React.Dispatch<React.SetStateAction<number>>
}

/**
 * Custom hook for managing dropdown menu state and interactions
 * Extracted from Navbar component for better reusability and testability
 */
export function useDropdownMenu(): UseDropdownMenuReturn {
    const [show, setShow] = useState<string | null>(null)
    const [isSubMenuHovered, setIsSubMenuHovered] = useState<boolean>(false)
    const [focusedSubMenuItem, setFocusedSubMenuItem] = useState<number>(-1)
    const subMenuRefs = useRef<(HTMLAnchorElement | null)[]>([])
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleMouseEnter = useCallback((title: string): void => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current)
        }
        setShow(title)
    }, [])

    const handleMouseLeave = useCallback((): void => {
        closeTimeout.current = setTimeout(() => {
            if (!isSubMenuHovered) {
                setShow(null)
                setFocusedSubMenuItem(-1)
            }
        }, 300)
    }, [isSubMenuHovered])

    const handleSubMenuEnter = useCallback((): void => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current)
        }
        setIsSubMenuHovered(true)
    }, [])

    const handleSubMenuLeave = useCallback((): void => {
        setIsSubMenuHovered(false)
        setShow(null)
        setFocusedSubMenuItem(-1)
    }, [])

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (closeTimeout.current) {
                clearTimeout(closeTimeout.current)
            }
        }
    }, [])

    return {
        show,
        isSubMenuHovered,
        focusedSubMenuItem,
        subMenuRefs,
        closeTimeout,
        handleMouseEnter,
        handleMouseLeave,
        handleSubMenuEnter,
        handleSubMenuLeave,
        setShow,
        setFocusedSubMenuItem,
    }
}
