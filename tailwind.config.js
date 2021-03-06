module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bob: "url('../public/images/multipleBobs.jpg')",
      },
    },
  },
  plugins: [],
};
