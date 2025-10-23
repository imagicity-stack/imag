/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cardinal: '#A50000'
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        monument: ['"Monument Extended"', 'sans-serif']
      },
      backgroundImage: {
        'grid-noise': "linear-gradient(135deg, rgba(165,0,0,0.35), rgba(0,0,0,0.65))"
      }
    }
  },
  plugins: []
};
