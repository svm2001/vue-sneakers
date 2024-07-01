/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': {'max': '576'},
        'md': {'max': '768px'},
        'lg': {'max': '1024px'},
        'xl': {'max': '1400px'},
      }
    },
  },
  plugins: [],
}

