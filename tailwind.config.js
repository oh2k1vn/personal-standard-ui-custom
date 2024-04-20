/** @type {import('tailwindcss').Config} */
export default {
  content: ["./lib/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "rgba(var(--color-primary))",
        background: "rgba(var(--color-background))",
        surface: "rgba(var(--color-surface))",
      },
      keyframes: {
        ripple: {
          "0%": {
            opacity: 0,
          },
          "25%": {
            opacity: 1,
          },
          "100%": {
            width: "300%",
            paddingBottom: "300%",
            opacity: 0,
          },
        },
      },
      animation: {
        ripple: "ripple 0.4s ease-in",
      },
    },
  },
  plugins: [],
};
