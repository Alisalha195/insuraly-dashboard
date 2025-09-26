/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {

      extend: {
         colors: {
            main: '#444444',
         },
         screens: {
            xss: '200px',
            xs: '280px',
            sm: '430px',
            md: '790px',
            xmd: '900px',
            lg: '1100px',
         },
         spacing: {
            icon: '2px'
         },
         fontSizes: {
            icon: "2px"
         },
         sizes: {
            icon: "2px"
         },
         width: {
            icon: 2px
         }
      },
   },
   plugins: [],
}