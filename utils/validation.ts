/**
 * Checks if the email format is valid.
 * Uses a regex that requires non-whitespace characters, an @ symbol, more non-whitespace, a dot, and more non-whitespace.
 *
 * @param email The email string to validate
 * @returns true if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
