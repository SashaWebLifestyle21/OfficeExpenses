/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      primary: '#3056D3',
      secondary: '#13C296',
      grey: '#637381',
      lightGrey: '#EFEFEF',
      darkPrimary: '#090E34',
      white: '#FDFEFF',
      black: '#08151F',
      lightPrimary: '#1D4E75',
      darkSecondary: '#55112B',
      lightSecondary: '#901D49',
      moreDarkSecondary: '#55112B',
      footer: '#EBEBEB',
      darkBlue: '#483D8B',
      saddleBrown: '#8B4513',
      red: '#FF0000',
      deepSkyBlue: '#3BA2B8'

    },
    fontWeight: {
      regular: 400,
      semiBold: 600,
      bold: 700
    },
    container: {
      padding: '16px',
    },
    extend: {},
  },
  plugins: [],
}

