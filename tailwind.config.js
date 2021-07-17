const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: {
          100: "#CAF27C",
          200: "#9DEA8C",
          300: "#74DF9D",
          400: "#4ED2AC",
          500: "#2EC4B6",
          600: "#009C90",
          700: "#00766B",
          800: "#005249",
        },
      },
      boxShadow: {
        amber: "0 4px 12px rgb(218 123 123 / 22%)"
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
