/** @type {import('tailwindcss').Config} */

const dark = {
  300: '#E8E2F4',
  400: '#C6BED9',
  500: '#9081B0',
  600: '#675788',
  700: '#453763',
  900: '#1B1130',
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
      about: "url('/img/about.jpeg')",
      architecture: "url('/img/architecture.svg')",
    },
    extend: {
      colors: {
        dark: dark,
        pink: {
          500: '#E50E99',
        },
        charcoal: '#333333',
        lavender: '#B5A0FF',
        social: {
          linkedin: '#0077B5',
          youtube: '#FF0000',
        },
      },
      spacing: {
        // Note:Tailwind's default scale ends at 96 = 24rem
        30: '7.5rem',
        50: '12.5rem',
        75: '18.75rem',
        85: '21.25rem',
        88: '22rem',
        100: '25rem',
        112: '28rem',
        120: '30rem',
        125: '31.25rem',
        138: '34.5rem',
        140: '35rem',
        150: '37.5rem',
        250: '62.5rem',
        navbar: '75px',
        'content-xs': '600px',
        'content-sm': '720px',
        'content-md': '1024px',
        'content-lg': '1130px',
        'content-xl': '1300px',
      },
      fontSize: {
        '4.5xl': ['2.5rem', { lineHeight: '1' }],
      },
      zIndex: {
        dropdown: '9',
        overlay: '98',
        navbar: '99',
        modal: '100',
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
