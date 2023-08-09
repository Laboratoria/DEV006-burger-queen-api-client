/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fondo: '#C68E62',
        crema: '#FFF5E0',
        colorButton: '#C1D78F',
        brownText: '#65362A',
        darkBrown: '#40160C',
        greenText: '#2A440B',
        redText: '#7A322E',
        darkGreen: '#162503',
        red: '#E40909',
        skin: '#D9C5B3',
        press: '#FDDE99',
        borderPress: '#A47D26',
        yellow: '#F9B317',
        plusButtom:'#C1D78F',
        minusButtom:'#FF8C8C',
        lightRed:'#FF8C8C',
        buttonHover: '#E0FCA1',
        anotherYellow:'#FBC959',
      },
      borderRadius: {
        '5': '5px',
        '25': '25px',
      },
      boxShadow: {
        'notPressShadow': '7px 7px 6px 0 rgba(70, 33, 23, 0.90) inset',
        'pressShadow': '-7px -7px 6px 0px rgba(70, 33, 23, 0.90) inset;'
      },
      rotate: {
        '135': '135deg',
      },
      zIndex: {
       '0': 0,
       '1': 1,
       '2': 2,
        'auto': 'auto',
      }
    },
  },
  plugins: [],
}