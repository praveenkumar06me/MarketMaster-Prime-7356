/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          primary: '#131921',
          secondary: '#232F3E',
          yellow: '#FFD814',
          yellowHover: '#F7CA00',
        }
      }
    },
  },
  plugins: [],
}