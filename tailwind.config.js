/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gym-dark': '#0f0f0f',
        'gym-dark-secondary': '#1a1a1a',
        'gym-red': '#ff3c3c',
        'gym-orange': '#ff6a00',
        'gym-green': '#39ff14',
        'gym-text': '#ffffff',
        'gym-text-secondary': '#cccccc',
      },
      fontFamily: {
        'bebas': ['Bebas Neue', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #ff3c3c' },
          '100%': { boxShadow: '0 0 20px #ff3c3c, 0 0 30px #ff3c3c' },
        },
      },
    },
  },
  plugins: [],
}
