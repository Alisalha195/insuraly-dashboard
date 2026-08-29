import { Flex, Icon, Box } from '@chakra-ui/react';
import useThemedColors from '../../../../../hooks/useThemedColors';

import { Md3dRotation } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { capitalize } from '../../../../../lib/capitalize';
import useLangDir from '../../../../../hooks/useLangDir';


const InfoCardHeader = ({ title, textColor, icon }) => {
   const { textPrimary, textSecondary } = useThemedColors();
   const {t , i18n} = useTranslation();
   const {currentLanguage, isRTL, dir} = useLangDir();
   
   return (
      <Flex
         // fontSize={{xmToXmm:"16px"}} 
         color={textPrimary}
         flexWrap={'wrap'}
         paddingBottom={{smTo3xl:4}}
      >
         <Box
            className={ `[position:absolute] [top:-2px] ${(isRTL ? "[left:4px]" :"[right:4px]")}`}
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
            fontWeight={"500"}
            color={textSecondary}

         >
            {capitalize(t(title))}
         </Box>
      </Flex >
   )
}

export default InfoCardHeader