/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sabana: {
          blue: '#002B49',
          lightblue: '#005587',
          gold: '#C59B27',
          wine: '#861F41',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          dark: '#0F172A',
          muted: '#64748B'
        }
      }
    },
  },
  plugins: [],
}
