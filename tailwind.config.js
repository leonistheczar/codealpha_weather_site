/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html" ,
            "./src/js/**/*.js"],
  theme: {
    extend: {
      fontFamily:{
        'RB': 'Roboto Condensed, sans-seif'
      },
      screens: {
        sm: {
          min: '320px',
          max: '767px',
        },
        md: {
          min: '768px', 
          max: '1023px', 
        },
        lg: {
          min: '1024px', 
          max: '1439px', 
        },
        xl: '1600px',
      },
    },
  },
  plugins: [],
}

