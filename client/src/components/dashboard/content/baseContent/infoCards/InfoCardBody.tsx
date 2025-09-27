import { Flex, Text } from '@chakra-ui/react'
import useThemedColors from '../../../../../hooks/useThemedColors';

const InfoCardBody = ({ amount, textColor }) => {
   const { textSecondary, } = useThemedColors();
   return (
      <Flex>
         <Text fontSize={{xssToXm:"24px", xmToXmm:'30px'}} color={textColor}>{amount}</Text>
      </Flex>
   )
}

export default InfoCardBody