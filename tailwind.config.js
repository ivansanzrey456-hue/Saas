/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: {
          50: "#f0f0f2",
          100: "#e1e1e6",
          200: "#c3c3cd",
          300: "#a5a5b4",
          400: "#87879b",
          500: "#696982",
          600: "#545469",
          700: "#3f3f50",
          800: "#2a2a37",
          900: "#15151e",
          950: "#0a0a0f",
        },
        acid: {
          DEFAULT: "#c8ff00",
          dim: "#a8d600",
          muted: "#7a9e00",
        },
        coral: {
          DEFAULT: "#ff4f5e",
          dim: "#cc3f4b",
        },
        sky: {
          DEFAULT: "#00c8ff",
          dim: "#00a0cc",
        },
      },
    },
  },
  plugins: [],
}
