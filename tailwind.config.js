/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'tier1': '#2E2A29',
        'tier2': '#1A1717',
        'tier3': '#D7D3CC',
      },
    },
  },
  plugins: [],
};
