// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nhs-blue': '#005eb8',
        'nhs-blue-light': '#0072ce',
        'nhs-red': '#da291c',
        'nhs-light-bg': '#f5f5f5',
        'nhs-dark-bg': '#1e1e1e',
        'nhs-white': '#ffffff',
        'nhs-black': '#212b32',
        'nhs-green': '#006747',
        'nhs-yellow': '#ffeb3b',
        'nhs-border': '#aeb7bd',
        'nhs-dark-gray': '#4c6272',
      },
    },
  },
  plugins: [],
}
