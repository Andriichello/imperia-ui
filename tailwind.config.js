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
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    // themes: ['lofi', 'emerald', 'dark', 'black',],
    themes: [
      {
        lofi: {
          ...require("daisyui/src/theming/themes")["lofi"],
        }
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "base-100": "#232830", // Lightened for better background contrast
        }
      },
    ],
    darkTheme: "dark",
  },
}
