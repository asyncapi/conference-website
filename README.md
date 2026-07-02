This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, fork the repository and clone it.

```bash
git clone https://github.com/<username>/conference-website.git
```

Change Directory

```bash
cd conference-website
```

Install Dependencies

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying files in the `app` directory. The page auto-updates as you edit the file.

## Testing

### Running E2E Tests with Cypress

This project uses [Cypress](https://www.cypress.io/) for end-to-end testing.

**Interactive Mode (Recommended for Development)**

```bash
# Make sure the dev server is running
npm run dev

# In another terminal, open Cypress UI
npm run cy:open
```

Then in the Cypress UI:
1. Select "E2E Testing"
2. Choose your browser
3. Click on any test file to run tests

**Headless Mode (CI/CD)**

```bash
# Make sure the dev server is running
npm run dev

# In another terminal, run all tests
npx cypress run

# Run specific test file
npx cypress run --spec "cypress/e2e/Navbar.cy.ts"
```

### Available Test Suites

- `cypress/e2e/Navbar.cy.ts` - Navigation tests (desktop & mobile)
- `cypress/e2e/Footer.cy.ts` - Footer component tests
- `cypress/e2e/Landing.cy.ts` - Landing page tests
- `cypress/e2e/Venue.cy.ts` - Venue page tests

## Storybook

This project uses [Storybook](https://storybook.js.org/) for component development and documentation.

**Running Storybook**

```bash
# Start Storybook development server
npm run storybook
```

This will start Storybook on [http://localhost:6006](http://localhost:6006).

**Building Storybook**

```bash
# Build static Storybook for deployment
npm run build-storybook
```

The static files will be generated in the `storybook-static` directory.

## AsyncAPI Contributors ✨

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
