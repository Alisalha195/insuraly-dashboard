/** @type {import('tailwindcss').Config} */
export default {
   content: [
     "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
 
     extend: {
       colors : {
        main : '#444444',
       } ,
       screens:{
         xss: '200px' ,
         xs: '280px',
         xmd: '900px'
       }
     },
   },
   plugins: [],
 }