export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ocean: { dark: '#0a2540', mid: '#0d3d6b', light: '#e8f4f8' },
        teal: { DEFAULT: '#63D2BC', light: '#e0f7f3', dark: '#0a9a82' },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}