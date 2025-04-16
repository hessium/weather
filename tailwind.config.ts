// @ts-ignore
import type { Config } from '@tailwindcss/types';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        theme: 'background-color, color, border-color, opacity',
      },
      animation: {
        rain: 'rainAnimation 0.5s infinite linear',
      },
      keyframes: {
        rainAnimation: {
          from: { 'background-position': '0 0' },
          to: { 'background-position': '20px 20px' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;
