/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f5',
          100: '#ffe4eb',
          200: '#ffcdd9',
          300: '#ffa3ba',
          400: '#ff6b9d',
          500: '#ff5c8d',
          600: '#ed1c6a',
          700: '#d11056',
          800: '#ad0f4a',
          900: '#8f1042',
        },
        accent: {
          50: '#fff5f5',
          100: '#ffebeb',
          200: '#ffd4d4',
          300: '#ffadad',
          400: '#ff7a7a',
          500: '#ff5757',
          600: '#ff2e2e',
          700: '#e60000',
          800: '#bd0000',
          900: '#990000',
        },
        dark: {
          DEFAULT: '#3d3d3d',
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#6b6b6b',
          500: '#3d3d3d',
          600: '#2d2d2d',
          700: '#1f1f1f',
          800: '#1a1a1a',
          900: '#0d0d0d',
        },
      },
    },
  },
  plugins: [],
}
