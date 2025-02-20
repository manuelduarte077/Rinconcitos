/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "avenir-black": ["Avenir-Black", "sans-serif"],
        "avenir-light": ["Avenir-Light", "sans-serif"],
        "avenir-medium": ["Avenir-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
}