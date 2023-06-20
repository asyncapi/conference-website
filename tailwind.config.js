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
      },
    },
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1118px" },
      // => @media (max-width: 1023px) { ... }
      sm: { max: "590px" },
      // => @media (max-width: 639px) { ... }
    },
    fontFamily: {
      'secondary': ['Fira Code', 'monospace']
    }
  },
  plugins: [],
};
