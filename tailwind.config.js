const colors = require("tailwindcss/colors");

const dark = {
  300: "#E8E2F4",
  400: "#C6BED9",
  500: "#9081B0",
  600: "#675788",
  700: "#453763",
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "12rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    backgroundImage: {
      architectureCover: "url('/img/architecture.svg')",
      schBg1: "url('/img/scheduleArcLeft.svg')",
      gradientToRight: "linear-gradient(90deg, rgba(2,2,11,1) 0%, rgba(26,49,113,1) 51%, rgba(24,59,164,1) 100%)",
      buttonGradient: "linear-gradient(29deg, rgba(197,53,232,1) 23%, rgba(24,202,241,1) 80%)",
      venueGradient: "linear-gradient(225deg, #2DCCFD 9.35%, #AD20E2 88.41%)"
    },
    extend: {
      colors: {
        ...colors,
        dark: dark,
        "fainted-white": "#797393",
        "fainted-paint": "#ad7dfa",
        "dark-gray": "#3A304F",
        "dark-paint": "#C6BED9",
        "fainted-gray": "#151034",
        "tetiary-pink": "#E50E99",
        "default-btn": "#A8A1B6"
      },
      height: {
        72: "18rem",    
        80: "20rem",
        88: "22rem",
        96: "24rem",
        100: "25rem",
        104: "26rem",
        108: "27rem",
        112: "28rem",
        116: "29rem",
        120: "30rem",
        130: "40rem",
        "half-screen": "50vh",
        "full-screen": "100vh",
        beforeHalf: "49%",
      },
    },
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { min: "992px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "992px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    fontFamily: {
      'secondary': ['Work Sans', 'monospace']
    }
  },
  plugins: [],
};
