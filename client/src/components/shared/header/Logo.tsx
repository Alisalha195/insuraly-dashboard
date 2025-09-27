import {  Box , Text } from "@chakra-ui/react"

import useThemedColors from "../../../hooks/useThemedColors"
const Logo = () => {
   const { logoText, logoBackground} = useThemedColors();
  return (
   <Box 
      asChild  
      smDown={{marginLeft:1}} 
      md={{marginX:4}} 
      paddingX={1} 
      className="btn text-center" 
      borderWidth={1}   
      borderColor={logoText} 
      borderRadius="5px 12px 5px 12px" 
      width={"auto"} 
      backgroundColor={logoBackground}
   >
      <Text fontSize={{xmDown:"19px"}} className="[font-style:italic] [font-weight:bold]" color={logoText}>
         INSURALY
      </Text>
   </Box>
  )
}

export default Logo