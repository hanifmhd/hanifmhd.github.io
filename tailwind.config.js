/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.05em',
      widest: '.1em',
      widest: '.25em',
    },
    // colors:{
    //   fontprimary:'#08202E',
    //   fontsecondary: '#02314B',
    //   fontlight: '#115A83'
    // },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
