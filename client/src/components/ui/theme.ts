import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
   theme: {
      tokens: {
         colors: {
            brand: {
               "500": { value: "blue" },
            },
         },
         // sizes: {
         //    "1/7": { value: "14.285%" },
         //    xs: { value: "4px" },

         //    sm: { value: "4px" }, // ~480px
         //    // md: "48rem", // ~768px
         //    // lg: "62rem", // ~992px
         //    // xl: "80rem", // ~1280px
         //    // "2xl": "96rem", // ~1536px
         //    // "3xl": "120em",
         //    // "4xl": "160em",
         // }
      },
      breakpoints: {
         base: "0rem", // 0px
         "xss": "2rem",
         "xs" : "10rem" ,
         sm: "30rem", // ~480px
         md: "48rem", // ~768px
         lg: "62rem", // ~992px
         xl: "80rem", // ~1280px
         "2xl": "96rem", // ~1536px
         "3xl": "120em",
         "4xl": "160em",
      },
   },
});

export const system = createSystem( defaultConfig, config);
