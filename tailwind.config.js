const colors = require("tailwindcss/colors");

const dark = {
  400: "#C6BED9",
  500: "#9081B0",
  600: "#A8A1B61A",
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
    },
    extend: {
      colors: {
        ...colors,
        dark: dark,
        "fainted-white": "#797393",
        "fainted-paint": "#ad7dfa",
        "dark-paint": "#C6BED9",
        "fainted-gray": "#151034",
        "tetiary-pink": "#E50E99",
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
  },
  plugins: [],
};
