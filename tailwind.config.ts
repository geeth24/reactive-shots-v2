import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        blackmud: ['var(--font-blackmud)', 'cursive'],
        stardom: ['var(--font-stardom)', 'cursive'],
      },
      colors: {
        primary: '#00A6FB',
        secondary: '#0582CA',
        tertiary: '#F7FCFF',
        background: '#F7FCFF',
        backgroundDark: '#051923',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
