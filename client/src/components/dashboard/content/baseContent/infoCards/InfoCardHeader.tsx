import { Flex } from '@chakra-ui/react'
import useThemedColors from '../../../../../hooks/useThemedColors';

const InfoCardHeader = ({title}) => {
   const {textPrimary} = useThemedColors();

  return (
    <Flex fontSize={'24px'} color={textPrimary} flexWrap={'wrap'}>
      {title}
    </Flex>
  )
}

export default InfoCardHeader