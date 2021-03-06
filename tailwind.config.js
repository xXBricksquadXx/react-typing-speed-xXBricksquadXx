const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "neon-green": "#49fb35",
      },
      fontFamily: {
        mono: ["Monoton", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  variants: {
    extend: { animation: ["hover", "focus"] },
  },
  plugins: [require("@tailwindcss/forms")],
};
