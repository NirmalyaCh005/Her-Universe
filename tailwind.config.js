/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        universe: {
          babypink: '#FFC0D9',
          pastel: '#FFF5FA',
          rose: '#FF6FAE',
          hotpink: '#FF3F8E',
          deeprose: '#E75480',
          text: '#54243B',
          chocolate: '#4B241C',
          purple: '#51247A',
          gold: '#FFD700',
          lavender: '#F4E8FC',
          cream: '#FFF9FB',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Quicksand', 'system-ui', 'sans-serif'],
        handwriting: ['"Dancing Script"', '"Caveat"', 'cursive'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glow-pink': '0 0 25px rgba(255, 111, 174, 0.45)',
        'glow-hotpink': '0 0 30px rgba(255, 63, 142, 0.6)',
        'glow-gold': '0 0 25px rgba(255, 215, 0, 0.5)',
        'glow-purple': '0 0 25px rgba(81, 36, 122, 0.4)',
        'soft-card': '0 10px 30px -5px rgba(231, 84, 128, 0.15)',
        'inner-pink': 'inset 0 2px 8px rgba(255, 192, 217, 0.4)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
}
