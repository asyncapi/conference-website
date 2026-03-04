# Component Documentation

This directory contains detailed documentation for all components in the AsyncAPI Conference website.

## Component Categories

### Layout Components

- **[Navbar](navbar.md)** - Navigation bar with dropdown menus
- **Footer** - Site footer with links and social media
- **Header** - Page headers and hero sections

### Feature Components

- **Speakers** - Speaker cards and listing
- **Tickets** - Ticket carousel and registration
- **Venue** - Venue information and location cards
- **Agenda** - Schedule and session information
- **About** - About section with team information
- **Sponsors** - Sponsor showcase

### UI Components

- **Buttons** - Button variants and styles
- **Forms** - Form components and validation
- **Dropdown** - Dropdown menus
- **Typography** - Text styles and headings

## Component Structure

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx    # Main component file
├── index.ts            # Export file
└── README.md           # Component documentation (optional)
```

## Using Components

All components support TypeScript and use Tailwind CSS for styling.

### Example Usage

```tsx
import Speaker from '@/components/Speaker/speaker'
import { Speaker as SpeakerType } from '@/types/config'

const speaker: SpeakerType = {
  id: 1,
  name: 'John Doe',
  title: 'Senior Engineer',
  img: '/img/speaker.webp',
  city: ['California']
}

<Speaker {...speaker} />
```

## Best Practices

1. **Type Safety**: Always use TypeScript interfaces from `@/types/config`
2. **Styling**: Use Tailwind CSS utility classes
3. **Accessibility**: Include ARIA labels and semantic HTML
4. **Performance**: Optimize images and lazy load when appropriate
5. **Testing**: Write unit tests for all components

## Component Guidelines

- Keep components small and focused
- Use props for configuration
- Implement proper error handling
- Add loading and empty states
- Follow responsive design principles

## Contributing

When adding a new component:

1. Create component directory in `components/`
2. Add TypeScript interface in `types/config.ts`
3. Write unit tests in `__tests__/components/`
4. Add Storybook story
5. Document usage in this directory
6. Update this README

For detailed guidelines, see the [Contributing Guide](../../CONTRIBUTING.md).
