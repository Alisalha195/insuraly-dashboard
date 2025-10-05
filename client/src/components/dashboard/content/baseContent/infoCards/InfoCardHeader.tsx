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
            className='[position:absolute] [top:-5px] [right:4px]'
         >
            <Icon
               className=''
               color={textColor}

               size={{ xssToXmm: "xs", xmmToSm: "sm" }}
            >
               {icon}
            </Icon>
         </Box>
         <Box
            fontSize={{ xssToXm: "10px", xmToXmm: "15px", xmmToSm: "20px", smToXl: "22px" }}
            wordBreak={"break-all"}
            overflow={'hidden'}
            maxHeight={'30px'}

         >
            {title}
         </Box>
      </Flex >
   )
}

export default InfoCardHeader