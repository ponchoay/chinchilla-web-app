/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#9DDCDC',
        'dark-blue': '#7EC2C2',
        'light-pink': '#F2B3B3',
        'dark-pink': '#E67A7A',
        'light-black': '#D7D7D7',
        'dark-black': '#4B4B4B',
        'ligth-white': '#FFFFFF',
        bg: '#FFF4E1'
      }
    }
  },
  plugins: [require('daisyui')],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [
      {
        mytheme: {
          // 水色系
          primary: '#9DDCDC',
          'primary-dark': '#7EC2C2',
          // ピンク系
          secondary: '#F2B3B3',
          'secondary-dark': '#E67A7A',
          // 白系
          accent: '#FFFFFF',
          // %どうしよ・・・
          'accent-dark': '#FFFFFF',
          // 黒系
          neutral: '#4B4B4B',
          'neutral-light': '#D7D7D7',
          // 背景色
          'base-100': '#FFF4E1'
          // info: '#3abff8',
          // success: '#36d399',
          // warning: '#fbbd23',
          // error: '#f87272',
        }
      }
    ],
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true // Shows info about daisyUI version and used config in the console when building your CSS
  }
}
