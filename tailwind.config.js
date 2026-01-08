/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jumpapay: {
          blue: '#27AAE1',
          dark: '#1f89b6',
        },
      }
    },
  },
  plugins: [],
}