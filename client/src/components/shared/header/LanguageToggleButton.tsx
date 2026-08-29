import { Flex, Text } from '@chakra-ui/react';

import { GoGlobe } from 'react-icons/go';
import useThemedColors from '../../../hooks/useThemedColors';
import {useTranslation} from 'react-i18next'
const LanguageToggleButton = ({...props}) => {
  
  const {t , i18n} = useTranslation();
  const {bgPrimary, borderSecondary, textSecondary, headerBackground} = useThemedColors();
  
  const toggleLanguage = () => {
   const nextLang = i18n.language === 'ar' ? 'en' : 'ar';
   i18n.changeLanguage(nextLang);
  }
  return (
    <Flex 
       flexDirection="column" 
       justifyContent='center' 
       
       onClick={toggleLanguage}
       className='btn'
    >
      <Flex
      justifyContent='center'
      alignItems={'center'}
      borderWidth={1}
      borderColor={textSecondary}
      paddingX={1}
      borderRadius={'9px'}
      
      >
         
      <Text 
         fontSize={{ xssToXm: "13px", xmToXd : "14px", xdToMd : "15px", md : "18px" }}
      >
         <GoGlobe />
      </Text>
       <Text
          fontSize={{ xssToXm: "15px", xmToXd : "16px", xdToMd : "18px", md : "19px" }}
       >
          {i18n.language==='ar' ? "En" : "عربي"}
       </Text>
      </Flex>
    </Flex>
  )
}

export default LanguageToggleButton