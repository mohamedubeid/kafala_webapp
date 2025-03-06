import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./partial/**/*.{js,jsx,ts,tsx}",
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        cairo: ["Cairo", ...fontFamily.sans],
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: ".5rem",
        sm: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
      },
    },
    backgroundImage: {
      header: "url('/assets/home/header-bg.png')",
      fields: "url('/assets/home/fields-bg.jpg')",
      auth: "url('/assets/auth/auth-white-bg.png')",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: {
        DEFAULT: "#ffffff",
        100: "#F1F1F1",
        200: "#F5F5F5",
        300: "#F2F2F7",
        400: "#FFFFFF1A",
      },
      black: {
        DEFAULT: "#000000",
        100: "rgba(0,0,0,.1)",
        200: "rgba(0,0,0,.2)",
        300: "rgba(0,0,0,.3)",
        400: "rgba(0,0,0,.4)",
        500: "rgba(0,0,0,.5)",
        600: "rgba(0,0,0,.6)",
        700: "rgba(0,0,0,.7)",
        800: "rgba(0,0,0,.8)",
        900: "rgba(0,0,0,.9)",
      },
      gray: {
        DEFAULT: "#212121",
        100: "#F1F1F1",
        200: "#A7A7A7",
        300: "#6D717A",
        400: "#EEEEEE",
        500: "#737373",
        600: "#d5d5d5",
      },
      kafalaPrimary: {
        DEFAULT: "#0B7275",
        100: "#25CAE0",
        200: "#f3f8f8",
        300: "#94C9CB",
        400: "#075056",
      },
      kafalaBlue: {
        DEFAULT: "#2563EB",
      },
      kafalaLight: {
        DEFAULT: "#F3F8F8",
        100: "#F8F8F8",
      },
    },
  },
  plugins: [],
};
export default config;
