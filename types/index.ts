// Common types used across the application
export interface Speaker {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
}

export interface NavbarProps {
  // Add navbar specific props
}

export interface FooterProps {
  // Add footer specific props
} 