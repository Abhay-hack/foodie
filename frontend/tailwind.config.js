/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FEF3C7',
          100: '#FEF0B7',
          200: '#FEE6A7',
        },
        orange: {
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        red: {
          500: '#EF4444',
          600: '#DC2626',
        },
        'tomato-red': '#E63946',
        'warm-orange': '#F77F00',
        'soft-white': '#FAFAFA',
        'dark-charcoal': '#2B2D42',
        'fresh-green': '#52B788',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        raleway: ['"Raleway"', 'sans-serif'],
        nunito: ['"Nunito"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};