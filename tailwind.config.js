/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/src/images/bg.png')",
      },
      fontFamily: {
        skran: ["Skran", "sans-serif"],
      },
      colors: {
        khakiG: "#709D69",
        khakiB: "#927D5E",
        khakiGr: "#6F7378",
      },
      boxShadow: {
        custom: "0 4px 6px 0 rgba(0, 0, 0, 0.5)",
      },
      textShadow: {
        // Define your text shadow styles here
        default: "2.5px 2.5px 3.5px rgba(146, 125, 94, 0.6)", // A simple shadow with 50% opacity
        dark: "3px 3px 4px rgba(146, 125, 94, 0.75)", // A darker shadow
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {};
      Object.entries(theme("textShadow")).forEach(([name, value]) => {
        newUtilities[`.text-shadow-${name}`] = {
          textShadow: value,
        };
      });
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
