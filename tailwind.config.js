/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          danger: '#B5384F',
          'danger-dark': '#8E2538',
          'danger-light': '#FCECEF',
          'danger-glow': 'rgba(181, 56, 79, 0.25)',
          safe: '#2E9E5B',
          'safe-dark': '#1F7542',
          'safe-light': '#EBF8F0',
          'safe-glow': 'rgba(46, 158, 91, 0.25)',
          dark: '#0B0F17',
          card: '#111827',
          cardMuted: '#161F30',
          border: '#1F293D',
          muted: '#64748B',
          text: '#F1F5F9',
          accent: '#38BDF8', // Cyan radar pulse accent
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'sonar-pulse': 'sonarPulse 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'wave-bar': 'waveBar 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        sonarPulse: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0.8' },
        },
        waveBar: {
          '0%': { height: '12%' },
          '100%': { height: '95%' },
        }
      }
    },
  },
  plugins: [],
}
