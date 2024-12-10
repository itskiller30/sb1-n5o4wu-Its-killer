/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        holiday: {
          red: '#D42F2F',
          green: '#2F8A4D',
          gold: '#FFD700',
          silver: '#C0C0C0',
          pine: '#1F3624',
          snow: '#F8F8FF',
          berry: '#9B111E',
          holly: '#244C2D'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'twinkle': 'twinkle 1.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-candy': 'repeating-linear-gradient(45deg, var(--tw-gradient-stops))',
        'noise': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAElBMVEUAAAD8/vz08vT09PT8+vz///+Tb6O2AAAABnRSTlMCAgICAgLfoY2NAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAQklEQVQ4jWNgQAX8DAz8DAz7kfhscHx2XDLs5EABBTh8gMOHAY4fEMRnxynDDXRQgKs+uP5BwYfxcaLwB7L54NIHALZhiRGJ3KnYAAAAAElFTkSuQmCC')"
      }
    },
  },
  plugins: [],
};