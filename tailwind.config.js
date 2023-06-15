/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    // themes: ['lofi', 'emerald', 'dark', 'black',],
    themes: ['lofi', 'dark'],
    darkTheme: 'dark',
  },
}
