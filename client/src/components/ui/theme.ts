import { createSystem, defaultConfig, defineConfig,  } from "@chakra-ui/react";

const config = defineConfig({
   globalCss: {
      body: {
         bg: {
            default: "white",
            // _dark: "#0f0f0f",
            _dark: "linear-gradient(90deg, #000, #210e29)",
            _light: "#eaeaea",
         },
         
      },
   },
   theme: {
      tokens: {
         colors: {
            brand: {
               "500": { value: "blue" },
            },
         },
         sizes: {
            "1/7": { value: "14.285%" },
            "xss": { value: "4px" },

            "sm": { value: "4px" }, // ~480px
            // md: "48rem", // ~768px
            // lg: "62rem", // ~992px
            // xl: "80rem", // ~1280px
            // "2xl": "96rem", // ~1536px
            // "3xl": "120em",
            // "4xl": "160em",
         } ,
         
         
      },
      breakpoints: {
         base: "0rem", // 0px
         "xss": "5rem",
         "xs" : "10rem" ,
         "xm" : "14rem" ,
         "xmm" : "22rem" ,
         sm: "30rem", // ~480px
         // "smm" : "40rem" ,
         md: "48rem", // ~768px
         
         "xd" : "50rem" ,
         lg: "62rem", // ~992px
         xl: "80rem", // ~1280px
         "2xl": "96rem", // ~1536px
         "3xl": "120em",
         "4xl": "160em",
      },
      semanticTokens: {
         fontSizes :{ 
            "xss" : {value: "4px"}
         }, 
         sizes : {
            "xss" : {value: "4px"}
         } ,
         // colors: {
         //    background: {
         //       default: { value: "{colors.background.light}" },
         //       _dark: { value: "{colors.background.light}" },
         //    },
         // },
      },
      
   },
   
});

export const system = createSystem( defaultConfig, config);
