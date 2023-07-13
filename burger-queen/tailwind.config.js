/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          'b3ebe4': '#B3EBE4',
          'fa81aa': '#FA81AA',
          'dab5e1': '#DAB5E1',
        },
      },
    },
  },
  plugins: [],
}

