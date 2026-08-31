/** @type {import('tailwindcss').Config} */

const dark = {
  300: '#E8E2F4',
  400: '#C6BED9',
  500: '#9081B0',
  600: '#675788',
  700: '#453763',
};

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '12rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    backgroundImage: {
      madrid:
        "url('https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
      online: "url('/img/CFS-Banner.png')",
    },
    extend: {
      colors: {
        dark: dark,
        brand: {
          pink: 'var(--color-brand-pink)',
        },
        charcoal: 'var(--color-charcoal)',
      },
      spacing: {
        350: '350px',
        380: '380px',
        400: '400px',
        450: '450px',
        480: '480px',
        500: '500px',
        550: '550px',
        560: '560px',
        600: '600px',
        1000: '1000px',
        '10vw': '10vw',
        '6vw': '6vw',
        '1em': '1em',
      },
    },
    screens: {
      xl: { max: '1279px' },
      lg: { max: '1118px' },
      sm: { max: '715px' },
    },
    fontFamily: {
      secondary: ['Fira Code', 'monospace'],
      workSans: ['Work Sans', 'monospace'],
    },
  },
  plugins: [],
};
