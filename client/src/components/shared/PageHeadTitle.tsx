
import { Box, HStack, Flex, Text } from '@chakra-ui/react';
import BackArrow from './BackArrow';
import useThemedColors from '../../hooks/useThemedColors';
import { useResizeObserver } from '../../hooks/useResizeObserver';

const PageHeadTitle = ({ backButton, title }) => {
   const { btnSecondary, textPrimary } = useThemedColors();
   
   const [backArrowRef, backArrowSize] = useResizeObserver();
   
   return (
      <HStack
         justifyContent={'center'}
         marginBottom={{ xssToXm: "40px", xmToSm: "50px", smTo2xl: "60px" }}
      >
         {backButton && <BackArrow ref={backArrowRef}/>}
         <Text
            flexGrow={"1"}
            textAlign={'center'}
            color={textPrimary}
            fontSize={{ xssToXs: '12px', xsToXm: "14px", xmToSm: "24px" }}
            // paddingRight={{ xmToSm: "2rem" }}
            pe={backButton ? `${backArrowSize?.width }px` : 0 }

            fontWeight={{ xssToSm: 500 }}
            
         >
            {title}
         </Text>
      </HStack>
   );
}

export default PageHeadTitle;