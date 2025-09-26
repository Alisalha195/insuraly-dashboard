import { Flex, Icon, Box } from '@chakra-ui/react';
import useThemedColors from '../../../../../hooks/useThemedColors';

import { Md3dRotation } from "react-icons/md";


const InfoCardHeader = ({ title, textColor, icon }) => {
   const { textPrimary } = useThemedColors();

   return (
      <Flex fontSize={'22px'} color={textPrimary} flexWrap={'wrap'}>
         <Box className='[position:absolute] [top:4px] [right:5px]'>
            <Icon className='text-icon-xs' backgroundColor={{ xssOnly: "#000000" }} color={textColor} >
               {icon}
            </Icon>
         </Box>
         {title}
      </Flex >
   )
}

export default InfoCardHeader