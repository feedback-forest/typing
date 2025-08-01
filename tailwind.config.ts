import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        notoSansKr: ["var(--noto-sans-kr)"],
        roboto: ["var(--roboto)"],
        pretendard: ["var(--font-pretendard)"],
        sans: ["var(--font-pretendard)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        custom: {
          homeMapBackground: "#F0F0F0",
          entireLikeBackground: "#E9E8EC",
          tooltipBackground: "#525252",
          homeTooltipBackground: "#262626",
          buttonGrayBackground: "#F5F5F5",
          divGrayBackground: "#E5E5E5",
          blackBackground: "#060606",
          bannerBackground: "#CCCCCC",
          footerBackground: "#3E3E3E",
          kakao: "#FEE500",
          hoverKakao: "#FADB0C",
          purple: "#4F118C",
          hoverPurple: "#2B0253",
          orange: "#FF501A",
          textToastColor: "#FAFAFA",
          textBlackColor: "#171717",
          textSemiBoldBlackColor: "#404040",
          textGrayColor: "#737373",
          textDescriptionGrayColor: "#A3A3A3",
          textTitleGrayColor: "#797979",
          textFooterColor: "#717171",
          textTypingGrayColor: "#8e8e8e",
          textRankingGrayColor: "#A9A9A9",
          textTypingGreenColor: "#268A30",
          correct: "#4CAF50",
          error: "#D32F2F",
          disabled: "#D4D4D4",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      screens: {
        mobile: "360px",
        tablet: "768px",
        desktop: "1440px",
      },
      spacing: {
        "flex-center": "flex justify-center items-center",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
export default config;
