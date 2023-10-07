/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        tier1: "#06070D",
        tier2: "#15191E",
        tier3: "#7D1015",
        tier4: "#292C33",
      },
      borderColor: {
        tier4: "#292C33",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
