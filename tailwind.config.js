/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Karla", "Arial", "Helvetica", "sans-serif"],
      },
      colors: {
        "primebot-grey": "#7C7F84",
        "primebot-blue": "#0970E9",
      },
    },
  },
  plugins: [],
};
