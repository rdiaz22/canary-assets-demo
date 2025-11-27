/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
             fontSize: {
              base: "22px",      // aumenta todo en proporción
              sm: "17px",
              xs: "14px", // añade esto 
            },
          },
        },
        plugins: [],
      };

