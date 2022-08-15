const colors = require("tailwindcss/colors");

const dark = {
  400: "#C6BED9",
  600: "#A8A1B61A",
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
    },
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
