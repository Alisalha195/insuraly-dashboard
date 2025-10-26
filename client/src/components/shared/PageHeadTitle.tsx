
import { Box, HStack, Flex, Text } from '@chakra-ui/react';
import BackArrow from './BackArrow';
import useThemedColors from '../../hooks/useThemedColors';

const PageHeadTitle = ({ backButton, title }) => {
   const { btnSecondary, textPrimary } = useThemedColors();
   return (
      <HStack
         justifyContent={'center'}
         marginBottom={{ xssToXm: "40px", xmToSm: "50px", smTo2xl: "60px" }}
      >
         {backButton && <BackArrow />}
         <Text
            flexGrow={"1"}
            textAlign={'center'}
            color={textPrimary}
            fontSize={{ xssToXs: '12px', xsToXm: "14px", xmToSm: "24px" }}
            paddingRight={{ xmToSm: "2rem" }}

            fontWeight={{ xssToSm: 500 }}
         >
            {title}
         </Text>
      </HStack>
   );
}

export default PageHeadTitle;