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
        title: ['Montserrat', 'sans-serif'],
        body: ['HelveticaNeueCyr', 'sans-serif'],
      },
      container: {
        padding: {
          DEFAULT: '1rem',
        },
        center: true,
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
          '3xl': '1720px',
        },
      },
    },
  },
  plugins: [],
};
