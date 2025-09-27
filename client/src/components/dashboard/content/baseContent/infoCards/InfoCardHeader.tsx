import { Flex, Icon, Box } from '@chakra-ui/react';
import useThemedColors from '../../../../../hooks/useThemedColors';

import { Md3dRotation } from "react-icons/md";


const InfoCardHeader = ({ title, textColor, icon }) => {
   const { textPrimary } = useThemedColors();

   return (
      <Flex 
         // fontSize={{xmToXmm:"16px"}} 
         color={textPrimary} 
         flexWrap={'wrap'}
      >
         <Box 
            className='[position:absolute] [top:4px] [right:5px]'
         >
            <Icon 
               className='md:text-[12px]' 
               color={textColor} 
               size={{xssToXmm:"xs"}}
            >
               {icon}
            </Icon>
         </Box>
         <Box
             fontSize={{xssToXm:"10px" ,xmToXmm:"16px"}}
         >
            {title}
         </Box>
      </Flex >
   )
}

export default InfoCardHeader