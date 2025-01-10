/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,jsx,ts,tsx}",
  "./styles/**/*.css",
];
export const theme = {
  extend: {
    colors: {
      purplePrimary: '#6C3483',
      purpleSecondary: '#9B59B6',
      pinkPrimary: '#FF69B4',
      pinkSecondary: '#F7CAC9',
      yellow: '#FFD700',
      lime: '#98FB98',
      white: '#F2F2F2',
      gray: '#D9D9D9',
      hoverColor: 'rgba(0, 0, 0, 0.2)'
    },
    fontFamily: {
      fraunces: ['Fraunces', 'serif'],
      openSans: ['Open Sans', 'sans-serif'],
    },
    fontWeight: {
      'ultraBlack': 1000
    }
  },
};
export const plugins = [];

