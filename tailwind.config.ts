import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de marca — El Rincón de Gredos (ver Brand_Book.md)
        bosque: {
          DEFAULT: "#3E5A3F", // Verde Bosque (principal)
          dark: "#2C4230",
          light: "#4E6E4F",
        },
        pizarra: {
          DEFAULT: "#2A3B49", // Azul Pizarra (textos/estructura)
          dark: "#1F2C36",
        },
        terracota: {
          DEFAULT: "#B5714E", // Acento cálido / CTA
          dark: "#9C5533",
        },
        ocre: {
          DEFAULT: "#C6A063", // Detalles y luz
        },
        crema: {
          DEFAULT: "#F5EFE3", // Fondo principal
          light: "#EBE4D6",
        },
        piedra: {
          DEFAULT: "#CFC4B0", // Neutro / bordes
        },
        tinta: "#2B2721", // Texto largo
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Fraunces", "Georgia", "serif"],
        sans: ["var(--font-mulish)", "Mulish", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
