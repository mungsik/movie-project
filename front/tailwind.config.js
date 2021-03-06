module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        base: ["Source Sans Pro", "sans-serif"],
      },
      colors: {
        bgColor: "#2f3640",
        textColor: "#f5f6fa",
        accentColor: "#9c88ff",
        overviewBgColor: "rgba(0, 0, 0, 0.5)",
      },
      height: {
        headerHeight: "10vh",
      },
    },
  },
  plugins: [],
};
