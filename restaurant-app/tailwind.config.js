/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Maroon/Wine palette
        maroon: {
          light: '#A64253',
          DEFAULT: '#8B2635',
          dark: '#581C1C',
        },
        // Cream/Ivory palette
        cream: {
          light: '#FFF8F0',
          DEFAULT: '#F5E6D3',
          dark: '#E8D5B7',
        },
        // Accent colors
        gold: '#D4AF37',
        'warm-brown': '#6B4423',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        'elegant': '0 10px 40px -10px rgba(88, 28, 28, 0.3)',
        'elegant-lg': '0 20px 60px -15px rgba(88, 28, 28, 0.4)',
      },
    },
  },
  plugins: [],
}
