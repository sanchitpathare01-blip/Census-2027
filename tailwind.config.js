/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f1419',
        },
        accent: {
          blue: '#4f46e5',
        },
        tertiary: {
          purple: '#8b5cf6',
        },
        success: {
          light: '#10b981',
        },
        warning: {
          orange: '#f59e0b',
        },
        error: {
          red: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
