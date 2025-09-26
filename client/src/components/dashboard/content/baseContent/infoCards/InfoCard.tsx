import { Box } from '@chakra-ui/react'
import InfoCardHeader from './InfoCardHeader';

import useThemedColors from '../../../../../hooks/useThemedColors';
import InfoCardBody from './InfoCardBody';

const InfoCard = ({ data }) => {
   const { InfoCardsColors, InfoCardsColorsHover, InfoCardBorder, cardBasicColor } = useThemedColors();
   return (
      <Box
         // _hover={{ backgroundColor: bgInfoCardHover[data.bgColor] }} 
         // backgroundColor={bgInfoCard[data.bgColor]}
         backgroundColor={cardBasicColor}
         borderWidth={2}
         borderColor={InfoCardBorder}
         borderRadius={6}
         direction='column'
         className='btn [position:relative]'
         padding={2}
      >
         <InfoCardHeader
            title={data.title}
            textColor={InfoCardsColors[data.basicColor]}
            icon={<data.icon />}
         />
         <InfoCardBody
            amount={data.amount ?? 0}
            textColor={InfoCardsColors[data.basicColor]}
         />
      </Box>
   )
}

export default InfoCard;