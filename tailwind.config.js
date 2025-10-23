/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#1E2A55',
        plum: '#6C1D53',
        scarlet: '#D10047',
        aurum: '#F4DE72'
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        monument: ['"Monument Extended"', 'sans-serif']
      },
      backgroundImage: {
        'city-glow':
          'radial-gradient(circle at 20% 20%, rgba(108,29,83,0.45), transparent 55%), radial-gradient(circle at 80% 10%, rgba(209,0,71,0.35), transparent 50%), radial-gradient(circle at 50% 80%, rgba(244,222,114,0.25), transparent 55%)'
      }
    }
  },
  plugins: []
};
