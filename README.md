# AsyncAPI Conference Website

[![Test Suite](https://github.com/asyncapi/conference-website/workflows/Test%20Suite/badge.svg)](https://github.com/asyncapi/conference-website/actions)
[![Lighthouse CI](https://github.com/asyncapi/conference-website/workflows/Lighthouse%20CI/badge.svg)](https://github.com/asyncapi/conference-website/actions)

The official website for AsyncAPI Conference - bringing the latest in AsyncAPI technology to locations worldwide!

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/conference-website.git
cd conference-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## 📚 Documentation

- **[Getting Started Guide](docs/guides/getting-started.md)** - Complete developer onboarding
- **[Architecture Overview](docs/architecture/overview.md)** - System design and patterns
- **[Maintainer Handbook](MAINTAINER_HANDBOOK.md)** - For project maintainers
- **[GSoC 2026 Plan](docs/GSOC_2026_PLAN.md)** - Google Summer of Code project plan

## 🏗️ Project Structure

```
conference-website/
├── components/          # React components
│   ├── Navbar/         # Navigation bar
│   ├── Speakers/       # Speaker cards and list
│   ├── Tickets/        # Ticket carousel
│   └── ...             # Other components
├── config/             # Configuration files (JSON)
├── pages/              # Next.js pages (routes)
├── public/             # Static assets
├── styles/             # CSS files
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── __tests__/          # Test files
└── docs/               # Documentation
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run cy:open      # Open Cypress for E2E testing
npm run storybook    # Start Storybook
```

### Tech Stack

- **Framework**: Next.js 15.5.9
- **UI Library**: React 18.2.1
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.0.24
- **Testing**: Jest + React Testing Library + Cypress
- **Component Dev**: Storybook

## 🧪 Testing

We use Jest for unit testing and Cypress for E2E testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Open Cypress for E2E tests
npm run cy:open
```

**Coverage Goals**: 60%+ code coverage

## 🎨 Component Development

We use Storybook for component development:

```bash
npm run storybook
```

This opens Storybook at [http://localhost:6006](http://localhost:6006).

## 📝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a Pull Request.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to your fork (`git push origin feat/amazing-feature`)
7. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 🌟 Features

- ✅ Responsive design for all devices
- ✅ Smooth animations and transitions
- ✅ Speaker management system
- ✅ Ticket registration
- ✅ Venue information
- ✅ Schedule/agenda display
- ✅ Sponsor showcase
- ✅ SEO optimized
- ✅ Accessibility compliant (WCAG 2.1 AA)
- ✅ Performance optimized (Lighthouse 90+)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file (see `example.env.local`):

```bash
GOOGLE_SHEETS_CLIENT_EMAIL=your_email
GOOGLE_SHEETS_PRIVATE_KEY=your_key
GOOGLE_SHEET_ID=your_sheet_id
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

### Content Management

Update content by editing JSON files in the `config/` directory:

- `speakers.json` - Speaker information
- `tickets.json` - Ticket types and pricing
- `agenda.json` - Schedule and sessions
- `city-lists.json` - Venue locations

See [Getting Started Guide](docs/guides/getting-started.md) for detailed instructions.

## 📊 Performance

We monitor performance using Lighthouse CI:

- **Target Scores**: 90+ across all metrics
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size**: Monitored and optimized

## 🤝 Community

- **Slack**: [AsyncAPI Slack](https://www.asyncapi.com/slack-invite)
- **Twitter**: [@AsyncAPISpec](https://twitter.com/AsyncAPISpec)
- **GitHub**: [AsyncAPI Organization](https://github.com/asyncapi)

## 📄 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://linktr.ee/thulieblack"><img src="https://avatars.githubusercontent.com/u/66913810?v=4?s=100" width="100px;" alt="V Thulisile Sibanda"/><br /><sub><b>V Thulisile Sibanda</b></sub></a><br /><a href="https://github.com/asyncapi/website/commits?author=thulieblack" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.behance.net/muibudeenaisha"><img src="https://avatars.githubusercontent.com/u/105395613?v=4?s=100" width="100px;" alt="AISHAT MUIBUDEEN"/><br /><sub><b>AISHAT MUIBUDEEN</b></sub></a><br /><a href="#design-Mayaleeeee" title="Design">🎨</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## 🗺️ Roadmap

See our [GSoC 2026 Implementation Plan](docs/GSOC_2026_PLAN.md) for upcoming features and improvements.

---

**Made with ❤️ by the AsyncAPI Community**
