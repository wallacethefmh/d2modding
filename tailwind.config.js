module.exports = {
  content: ["./src/renderer/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};