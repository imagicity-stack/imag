/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
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
      },
      backgroundImage: {}
    }
  },
  plugins: []
};
