/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4AB2E6',
          light: '#F0ECE3',
          dark: '#011222'
        },
      },
    },
  },
  plugins: [],
}

