import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "green-dark": "var(--green-dark)",
        "green-light": "var(--green-light)",
        "orange-dark": "var(--orange-dark)",
        "orange-light": "var(--orange-light)",
        "yellow-light": "var(--yellow-light)",
        "blue-dark": "var(--blue-dark)",
        "blue-light": "var(--blue-light)",
        "pink-dark": "var(--pink-dark)",
        "pink-light": "var(--pink-light)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      screens: {
        "3xs": "270px",
        "2xs": "400px",
        xs: "480px",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
} satisfies Config;
