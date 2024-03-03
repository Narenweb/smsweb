/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // 'background: #FFF2F5;'--white
        theme: "#8E44AD",
        darkTheme: "#7d309e",
        lightTheme: "#995cb3",
        customViolet: "#8E8FFA",
        defaultTheme: "#DE3163",
        customOrange: "#FF6969",
        customGreen: "#1fdb84",
        customRed: "#fb1b26",
        userTheme: "#FFF2F5",
        userTheme1: "#F1D2D9",
        lightViolet: "#E4BDF4",
        primaryColor: "#DE3163",
        secondaryColor: "#8E44AD",
        dark: "#1E1E1E",

        // newTheme:'#FFF2F5',
        // theme1: '#4338ca',
        // darkTheme2: '#3730a3',
        // lightTheme3: '#6366f1',
      },
    },
  },
  plugins: [],
};
