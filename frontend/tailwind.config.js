/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0A0E14',
          900: '#0F1520',
          800: '#151D2B',
          700: '#1E2A3D',
        },
        paper: '#F7F7F5',
        brand: {
          50: '#EFF6FF',
          100: '#DCEBFF',
          200: '#B3D4FF',
          300: '#7FB6FF',
          400: '#4694FF',
          500: '#0B5FFF',
          600: '#0047D6',
          700: '#0038A8',
          800: '#002B80',
          900: '#001F5C',
        },
        signal: {
          up: '#0F9D58',
          down: '#D93025',
        },
        sand: '#C9A24B',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      maxWidth: {
        content: '1320px',
      },
      boxShadow: {
        panel: '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 8px 24px -12px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [],
}
