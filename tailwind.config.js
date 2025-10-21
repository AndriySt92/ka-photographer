/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000',
        secondary: '#fff',
        accent: '#1a00ff',
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        secondary: ['HelveticaNeueCyr', 'sans-serif'],
      },
      container: {
        padding: {
          sm: '24px',
          DEFAULT: '16px',
        },
        center: true,
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
          '3xl': '1620px',
        },
      },
      screens: {
        '2xl': '1720px',
        'pointer-fine': { raw: '(pointer: fine)' },
        'pointer-coarse': { raw: '(pointer: coarse)' },
      },
    },
  },
  plugins: [],
};
