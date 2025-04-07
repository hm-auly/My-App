/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
        boxShadow: {
          'custom':  ' 0px 0px 10px 0px #bdbdc3, inset 0px 0px 5px 0px #bdbdc3'
        }
    },
  },
  plugins: [],
}

