/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      backgroundColor: {
        tier1: "#06070D",
        tier2: "#15191E",
        tier3: "#7D1015",
        tier4: "#292C33",
      },
      borderColor: {
        tier1: "#06070D",
        tier2: "#15191E",
        tier3: "#7D1015",
        tier4: "#292C33",
      },
      textColor: {
        tier1: "#06070D",
        tier2: "#15191E",
        tier3: "#7D1015",
        tier4: "#292C33", 
      }
    },
  },
  plugins: [require("tailwind-scrollbar", "tw-elements-react/dist/plugin.cjs")],
};
