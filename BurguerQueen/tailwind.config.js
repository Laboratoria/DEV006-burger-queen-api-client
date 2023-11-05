/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      'retro1': ['Diplomata', 'sans-serif'],
      'retro2': ['Nova Flat', 'sans-serif'],
     
    },
    extend: {
      colors: {
        
          primary: '#22A699',
          secondary: '#F2BE22',
          tertiary: '#F29727',
          quaternary: '#F24C3D',
          btn1: '#4ABC78',
          btn2: '#D64550',
          extra: '#D4A61E'
      
      },
      spacing: {
        h: '34rem',
        hForm:'50rem',
        mlForm:'40rem',
        mrForm:'-21rem',
        mtboton:'30rem',
        mlwarning:'26rem',
        mlready:'36rem',
        mtminus:'-1.5499999999999998rem'
       
      },
      
      fontSize: {
        '2xs': '0.625rem', // Equivalente a 10px
        '3xs': '0.5rem',   // Equivalente a 8px
      },

      blur: {
     blur: "2px",
      },
    },
  },
  plugins: [],
}

