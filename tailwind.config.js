/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#F3EFE0",
          secondary: "#0F172A",
          accent: "#1E293B",
          neutral: "#285430",
          info: "#9858BF",
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#0F172A",
          secondary: "#F3EFE0",
          info: "#9858BF",
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
