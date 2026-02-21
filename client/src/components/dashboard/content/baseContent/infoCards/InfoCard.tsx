import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import InfoCardHeader from './InfoCardHeader';

import useThemedColors from '../../../../../hooks/useThemedColors';
import InfoCardBody from './InfoCardBody';
import { Suspense } from 'react';

const InfoCard = ({ data }) => {
   const { InfoCardsColors, InfoCardsColorsHover, InfoCardBorder, cardBasicColor } = useThemedColors();
   return (
       <Suspense
        fallback={<div>loading</div>}>
         
      <Box
         // _hover={{ backgroundColor: bgInfoCardHover[data.bgColor] }} 
         // backgroundColor={bgInfoCard[data.bgColor]}
         background={cardBasicColor}
         borderWidth={1}
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
            amount={data.amount ?? "0"}
            textColor={InfoCardsColors[data.basicColor]}
         />
         
      </Box>
            </Suspense>
   )
}

export default InfoCard;