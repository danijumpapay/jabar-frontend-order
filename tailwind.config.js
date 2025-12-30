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
          blue: '#2AB0E5', // Warna identitas JumpaPay
          dark: '#1E293B',
        }
      }
    },
  },
  plugins: [],
}