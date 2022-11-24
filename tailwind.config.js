/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#F3EFE0",
          secondary: "#222222",
          accent: "#00E7FF",
          neutral: "#285430",
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#222222",
          secondary: "#F3EFE0",
        },
      },
      "dark",
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
