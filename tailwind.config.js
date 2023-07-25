/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "light-red": "#FFEDEC",
        "red-100": "#F05663",
        "purple-100": "#614B88",
        "dark-purple": "#3C2E4D",
        grey: "#7b7b7b",
        "light-purple": "#fff8ff",
      },
    },
  },
  plugins: [],
};
