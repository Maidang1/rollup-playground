/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        editor: "rgb(46, 52, 64)",
        hover: "rgba(255,255,255, 0.45)",
      },
    },
  },
  plugins: [],
}
