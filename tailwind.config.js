/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#FDC708',
          deep: '#E6B400',
          soft: '#FFF4CC',
          pale: '#FFF9E6',
          ink: '#8A6500',
        },
        ink: '#14151C',
        navy: '#1C2430',
        muted: '#4B5563',
        line: '#E8E4DA',
        paper: '#F7F6F3',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Segoe UI', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'Segoe Script', 'cursive'],
      },
      boxShadow: {
        card: '0 10px 30px rgba(20, 21, 28, 0.05)',
        lift: '0 18px 40px rgba(20, 21, 28, 0.10)',
      },
    },
  },
  plugins: [],
}
