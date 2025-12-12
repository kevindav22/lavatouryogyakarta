/** @type {import('tailwindcss').Config} */

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Font Poppins diatur sebagai default sans-serif
        staatliches: ['Staatliches', 'sans-serif'],
      },
    },
  },
  plugins: [],
  content: [  "./src/**/*.{html,js,ts,jsx,tsx}"],
};