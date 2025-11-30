/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#000000',
        plum: '#161616',
        scarlet: '#A50000',
        aurum: '#FFD347'
      },
      fontFamily: {
        sans: ['"Work Sans"', 'sans-serif']
      }
    }
  },
  plugins: []
};
