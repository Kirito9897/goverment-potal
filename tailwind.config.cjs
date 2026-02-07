/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        govBlue: '#003366',
        govGold: '#e6b800',
        govBackground: '#020617',
        saffron: '#ff9933',
        indiaGreen: '#138808',
        accentBlue: '#0ea5e9',
        accentPink: '#ec4899'
      }
    }
  },
  plugins: []
};
