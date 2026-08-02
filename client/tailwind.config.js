/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FAF5FF",   //lavender white - website background
        secondary: "#3AA39F",  // buttons
        tertiary: "#F0EADC",   // landing page cards
        quaternary: "#9E8367",  //footer
        imperialred: "#70002B"
      },
      fontFamily: {
        playfair: ['Poppins', 'serif'],
        dancing: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}