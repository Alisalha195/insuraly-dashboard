"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
   ColorModeProvider,
   type ColorModeProviderProps,
} from "./color-mode";

import { system } from "./theme";

// const config = defineConfig({
//   theme: {
//     breakpoints: {
//       xl: "80em" ,
//       "2xl": "96em" ,
//       "3xl": "120em" ,
//       "4xl": "160em" ,
//     },
//   },
// })

// export const system = createSystem(defaultConfig, config)
export function Provider(props: ColorModeProviderProps) {
   return (
      <ChakraProvider value={system}>
         <ColorModeProvider {...props} />
      </ChakraProvider>
   )
}
