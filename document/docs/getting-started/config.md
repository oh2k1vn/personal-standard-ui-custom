---
sidebar_position: 2
---

# Config

## Root Variable Color

```css
--color-primary: #8739f9;
--color-background: #f2f2f2;
--color-surface: #ffffff;
--color-accent: #37b9f1;
--color-grey: #f2f5f5;
--color-text: #121212;
--color-label: #908e9b;
--color-disabled: #e1dfe9;
```

## Setup tailwind.config

```js
module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  },
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
```
