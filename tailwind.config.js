import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Verdana', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'soft-gray': '#f8f9fa',
        'dark-gray': '#2d3748',
      }
    },
  },
  plugins: [
    typography,
  ],
} 