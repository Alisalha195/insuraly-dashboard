import { Box } from '@chakra-ui/react'
import InfoCardHeader from './InfoCardHeader';

import useThemedColors from '../../../../../hooks/useThemedColors';
import InfoCardBody from './InfoCardBody';

const InfoCard = ({data}) => {
   const {bgInfoCard ,bgInfoCardHover, InfoCardBorder} = useThemedColors();
  return (
    <Box _hover={{backgroundColor:bgInfoCardHover[data.bgColor]}} backgroundColor={bgInfoCard[data.bgColor]}  borderWidth={2} borderColor={InfoCardBorder} borderRadius={6} direction='column' className='btn '  padding={2}  >
      <InfoCardHeader title={data.title} /> 
      <InfoCardBody amount={data.amount} />
    </Box>
  )
}

export default InfoCard