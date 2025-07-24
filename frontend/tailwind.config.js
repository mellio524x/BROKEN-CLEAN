/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0a',         // near-black
        brown: '#3b2f2f',        // deep brown
        accent: '#a0522d',       // sienna
        'light-brown': '#d2b48c',// tan
        'dusty-rose': '#8b5e3c', // dusty brown-red
      },
    },
  },
  plugins: [],
};
