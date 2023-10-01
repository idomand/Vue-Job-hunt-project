/** @type {import('tailwindcss').Config} */

import moduleName from 'module'
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: { fontFamily: { sans: ['Open Sans', ...defaultTheme.fontFamily.sans] } }
  },
  plugins: []
}
// font-family: 'Open Sans', sans-serif;
