/** @type {import('tailwindcss').Config} */
export default {
  content: ["./lib/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        accent: "var(--color-accent)",
        grey: "var(--color-grey)",
        text: "var(--color-text)",
        label: "var(--color-label)",
        disabled: "var(--color-disabled)",
      },
    },
  },
  plugins: [],
};
