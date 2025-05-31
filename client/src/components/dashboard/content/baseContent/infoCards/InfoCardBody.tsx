import { Flex, Text } from '@chakra-ui/react'
import useThemedColors from '../../../../../hooks/useThemedColors';

const InfoCardBody = ({amount}) => {
   const {textSecondary} = useThemedColors();
  return (
    <Flex>
      <Text fontSize={'40px'} color={textSecondary}>{amount}</Text>
    </Flex>
  )
}

export default InfoCardBody