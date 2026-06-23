/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          900: '#0b0f19',
          800: '#151b2b',
          accent: '#38bdf8',
        }
      }
    },
  },
  plugins: [],
}