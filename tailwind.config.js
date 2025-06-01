/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#F2EFE7',
        'sky-blue': '#9ACBD0',
        'teal': '#48A6A7',
        'dark-teal': '#006A71',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
      }
    },
  },
  plugins: [],
}