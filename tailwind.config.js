/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#e5f4ff',
          200: '#cce9ff',
          300: '#99d3ff',
        },
        orange: {
          100: '#ff4100',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}