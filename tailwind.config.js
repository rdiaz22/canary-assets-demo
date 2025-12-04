/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Habilita dark mode con clase
  theme: {
    extend: {
             fontSize: {
        base: "22px",      // aumenta todo en proporción
        sm: "17px",
        xs: "14px",
            },
          },
        },
        plugins: [],
      };
