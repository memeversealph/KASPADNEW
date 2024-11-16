/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#70C7BA',
        'primary-dark': '#49EACB',
        background: 'rgb(var(--background) / <alpha-value>)',
        'card-bg': 'rgb(var(--card-bg) / <alpha-value>)',
        'border-color': 'rgb(var(--border-color) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
      },
      boxShadow: {
        'primary-lg': '0 8px 20px -2px rgba(112, 199, 186, 0.25)',
        'glow': '0 0 15px rgba(112, 199, 186, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [],
};