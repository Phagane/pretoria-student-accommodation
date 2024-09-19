module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      width: {
        '36': '9rem',
        '40': '10rem',
        '50': '14rem',
        // Add other custom sizes if needed
      },
      height: {
        '36': '9rem',
        '40': '10rem',
        '50': '14rem',
        // Add other custom sizes if needed
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'edu-hand': ['"Edu AU VIC WA NT Hand"', 'cursive']
      },
    },
  },
  plugins: [],
}