# Developer Onboarding Guide - AsyncAPI Conference Website

Welcome to the AsyncAPI Conference website project! This guide will help you get up and running quickly.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18 or higher (check with `node --version`)
- **npm**: v9 or higher (check with `npm --version`)
- **Git**: Latest version (check with `git --version`)
- **Code Editor**: VS Code recommended

## Quick Start

### 1. Fork and Clone

```bash
# Fork the repository on GitHub first, then clone your fork
git clone https://github.com/YOUR_USERNAME/conference-website.git
cd conference-website
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages. The installation should take 2-3 minutes.

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the conference homepage.

### 4. Make Your First Change

Try editing `pages/index.tsx` - the page will auto-reload when you save!

## Project Structure

```
conference-website/
├── components/          # React components
│   ├── About/          # About section component
│   ├── Navbar/         # Navigation bar
│   ├── Speakers/       # Speaker cards and list
│   ├── Tickets/        # Ticket carousel
│   ├── Venue/          # Venue information
│   └── ...             # Other components
├── config/             # Configuration files (JSON)
│   ├── speakers.json   # Speaker data
│   ├── tickets.json    # Ticket information
│   ├── agenda.json     # Schedule data
│   └── ...             # Other config files
├── pages/              # Next.js pages (routes)
│   ├── index.tsx       # Homepage
│   ├── _app.tsx        # App wrapper
│   └── api/            # API routes
├── public/             # Static assets
│   └── img/            # Images
├── styles/             # CSS files
│   └── globals.css     # Global styles
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Development Workflow

### Making Changes

1. **Create a Branch**

   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make Your Changes**
   - Edit files in your code editor
   - Save and see changes live at <http://localhost:3000>

3. **Test Your Changes**

   ```bash
   # Run linter
   npm run lint
   
   # Format code
   npm run format
   
   # Run E2E tests (optional)
   npm run cy:open
   ```

4. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "feat: add new speaker card animation"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests

5. **Push and Create PR**

   ```bash
   git push origin feat/your-feature-name
   ```

   Then create a Pull Request on GitHub.

## Common Tasks

### Adding a New Speaker

1. Open `config/speakers.json`
2. Add a new entry:

   ```json
   {
     "id": 10,
     "name": "Jane Doe",
     "title": "Senior Engineer at Company",
     "img": "/img/speaker-images/city/jane-doe.webp",
     "city": ["California"]
   }
   ```

3. Add speaker image to `public/img/speaker-images/city/`
4. Save and check <http://localhost:3000>

### Updating Ticket Information

1. Open `config/tickets.json`
2. Modify ticket details:

   ```json
   {
     "id": 1,
     "type": "Early Bird",
     "description": "Limited time offer",
     "price": "$99",
     "status": "Available",
     "benefits": ["Access to all sessions", "Lunch included"]
   }
   ```

3. Save and verify changes

### Creating a New Component

1. Create component directory:

   ```bash
   mkdir components/MyComponent
   ```

2. Create component file:

   ```tsx
   // components/MyComponent/MyComponent.tsx
   import React from 'react';
   
   interface MyComponentProps {
     title: string;
     description?: string;
   }
   
   export default function MyComponent({ title, description }: MyComponentProps) {
     return (
       <div className="p-4">
         <h2 className="text-2xl font-bold">{title}</h2>
         {description && <p className="text-gray-600">{description}</p>}
       </div>
     );
   }
   ```

3. Export from index (optional):

   ```tsx
   // components/MyComponent/index.ts
   export { default } from './MyComponent';
   ```

4. Use in a page:

   ```tsx
   import MyComponent from '@/components/MyComponent';
   
   <MyComponent title="Hello" description="World" />
   ```

### Styling Components

**Using Tailwind CSS** (Preferred)

```tsx
<div className="flex items-center justify-between p-5 bg-blue-500 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
  <h1 className="text-2xl font-bold text-white">Title</h1>
</div>
```

**Custom CSS** (For complex animations)

```css
/* styles/globals.css */
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.slide-in {
  animation: slideIn 0.5s ease-out;
}
```

### Working with Images

**Using Next.js Image Component** (Recommended)

```tsx
import Image from 'next/image';

<Image
  src="/img/speaker-images/john-doe.webp"
  alt="John Doe"
  width={300}
  height={300}
  className="rounded-full"
/>
```

**Image Optimization Tips**

- Use WebP format for photos
- Use SVG for icons and logos
- Optimize images before adding (use tools like Squoosh)
- Provide appropriate width/height to prevent layout shift

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### TypeScript Errors

```bash
# Check for type errors
npx tsc --noEmit

# If types are missing
npm install --save-dev @types/package-name
```

### Styling Not Updating

```bash
# Restart dev server
# Press Ctrl+C to stop, then:
npm run dev
```

## Best Practices

### Code Quality

✅ **Do:**

- Use TypeScript for type safety
- Follow existing code patterns
- Add comments for complex logic
- Keep components small and focused
- Use meaningful variable names

❌ **Don't:**

- Commit `node_modules` or `.env` files
- Use `any` type in TypeScript
- Create deeply nested components
- Ignore linting errors
- Hardcode sensitive data

### Component Design

✅ **Do:**

- Make components reusable
- Use props for configuration
- Implement proper TypeScript interfaces
- Add default props where appropriate
- Handle loading and error states

❌ **Don't:**

- Mix business logic with UI
- Create overly complex components
- Forget accessibility attributes
- Ignore responsive design
- Skip prop validation

### Performance

✅ **Do:**

- Use Next.js Image component
- Implement lazy loading
- Optimize bundle size
- Use React.memo for expensive renders
- Profile before optimizing

❌ **Don't:**

- Load all data upfront
- Create unnecessary re-renders
- Ignore Core Web Vitals
- Use large unoptimized images
- Block the main thread

## Getting Help

### Resources

- **Documentation**: Check `/docs` folder
- **Architecture**: See `architecture_overview.md`
- **Contributing**: Read `CONTRIBUTING.md`
- **Code of Conduct**: Review `CODE_OF_CONDUCT.md`

### Community

- **Slack**: [AsyncAPI Slack](https://www.asyncapi.com/slack-invite)
- **GitHub Issues**: Report bugs or request features
- **GitHub Discussions**: Ask questions
- **Twitter**: [@AsyncAPISpec](https://twitter.com/AsyncAPISpec)

### Common Questions

**Q: How do I add a new page?**
A: Create a new file in `pages/` directory. The filename becomes the route.

**Q: Where do I put reusable logic?**
A: Create custom hooks in `hooks/` or utilities in `utils/`

**Q: How do I test my changes?**
A: Run `npm run lint` and `npm run cy:open` for E2E tests

**Q: Can I use external libraries?**
A: Yes, but discuss with maintainers first for large dependencies

**Q: How do I update dependencies?**
A: Use `npm update` but test thoroughly before committing

## Next Steps

Now that you're set up:

1. ✅ Explore the codebase
2. ✅ Read the architecture documentation
3. ✅ Pick a "good first issue" from GitHub
4. ✅ Join the AsyncAPI Slack
5. ✅ Make your first contribution!

Welcome to the team! 🎉
