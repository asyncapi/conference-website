# Navbar Component

The Navbar component provides the main navigation for the AsyncAPI Conference website, with support for both desktop and mobile views.

## Features

- Responsive design (desktop and mobile)
- Dropdown menus for sub-navigation
- Sticky navbar with scroll-based background
- Smooth animations and transitions
- Accessibility support (ARIA labels, keyboard navigation)

## Usage

```tsx
import Navbar from '@/components/Navbar/navbar'

<Navbar />
```

## Props

The Navbar component doesn't accept props - it uses the navigation structure from `config/links.json`.

## Structure

```
Navbar/
├── navbar.tsx    # Main navbar component
└── navDrop.tsx   # Mobile dropdown menu
```

## Behavior

### Desktop View

- Horizontal navigation bar
- Dropdown menus on hover
- Smooth transitions
- Scroll-based background (appears after 50px scroll)

### Mobile View

- Hamburger menu icon
- Full-screen overlay menu
- Touch-friendly targets
- Smooth slide animations

## Styling

The navbar uses dynamic styling based on state:

- **Default**: Transparent background
- **Scrolled**: Dark background (`bg-[#1B1130]/95`) with shadow
- **Dropdown**: Dark background with purple accents

## Customization

### Changing Navigation Links

Edit `config/links.json`:

```json
[
  {
    "title": "About",
    "ref": "#about"
  },
  {
    "title": "Venue",
    "ref": "#venue",
    "subMenu": [
      {
        "title": "California, USA",
        "ref": "/california"
      }
    ]
  }
]
```

### Styling

Main styling classes are in `navbar.tsx`. Key classes:

- `.container` - Main navbar container
- `.subMenu` - Dropdown menu styling
- Mobile menu styles in `navDrop.tsx`

## Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management
- Screen reader friendly

## Known Issues

- TODO: Refactor Navbar Code (see line 23 in navbar.tsx)
- Consider extracting dropdown logic into custom hook (✅ Done: `useDropdownMenu`)

## Testing

Unit tests are in `__tests__/components/Navbar.test.tsx`:

```bash
npm test Navbar.test.tsx
```

## Related

- [useDropdownMenu hook](../../hooks/useDropdownMenu.ts)
- [Navigation Links Config](../../config/links.json)
