/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#1F1F1F",
        "red-danger": "#F03737",
      },
    },
  },

  plugins: [],
};
