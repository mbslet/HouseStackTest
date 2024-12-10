import type { Config } from "tailwindcss";

const config: Config = {
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
      colors:{
        'iniciai-yellow': 'rgb(255 204 3)',
        'iniciai-roxinho': 'rgb(82 0 255)',
        'iniciai-verde': '#70bf8d',
        'iniciai-white': '#f0f2f2',
      },
      screens: {
        '3xl': '1600px',
      },
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;