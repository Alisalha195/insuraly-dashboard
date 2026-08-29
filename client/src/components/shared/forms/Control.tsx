import { Box, Button, Flex } from '@chakra-ui/react'
import useThemedColors from '../../../hooks/useThemedColors'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Control = ({click,cancel ,disabled=false}:{click:()=>{}, cancel?:()=> void ,disabled?:boolean}) => {
   const navigate  = useNavigate();
   const {btnPrimary , textPrimary} = useThemedColors();
   const {t} = useTranslation();
  return (
    <Flex marginBottom={'40px'} justify={'end'} >
      <Box className='btn' paddingY={1} paddingX={3} me={"20px"} height={"auto"} backgroundColor={'transparent'}  
      
      onClick={cancel ?  cancel : () => navigate(-1)}
      
      >
         {t("Cancel")}
      </Box>
      <Box backgroundColor={!disabled ? btnPrimary :"#888"} className={!disabled && 'btn'} paddingY={1} paddingX={3} border={`1px solid ${btnPrimary}`} color={"#eee"} me={"30px"} borderRadius={5}
      onClick={!disabled ? click : undefined }
      
      >
         {t("Save")}
      </Box>
    </Flex>
  )
}

export default Control