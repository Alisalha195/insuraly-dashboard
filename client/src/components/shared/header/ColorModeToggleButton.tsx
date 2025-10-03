import { Flex } from "@chakra-ui/react"
import { ColorModeButton, } from "../../ui/color-mode";

const ColorModeToggleButton = () => {
   return (
      <Flex flexDirection="column" justifyContent='center' fontSize={{ xssToXm: "40px" }}>
         <ColorModeButton />
      </Flex>
   )
}

export default ColorModeToggleButton