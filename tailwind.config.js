/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        '1/5': '20%',
      },
      colors: {
        'primary-color': '#406290',
        'light-primary-color': 'rgba(64, 98, 144, .85)',
        'light-gray-color': '#F1F1F1',
      },
    },

    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1200px',
        xl: '1300px',
        '2xl': '1400px',
      },
    },
  },
  plugins: [],
}