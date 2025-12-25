import { Box, Button, Flex } from '@chakra-ui/react'
import useThemedColors from '../../../hooks/useThemedColors'
import { useNavigate } from 'react-router-dom';

const Control = ({click, disabled=false}) => {
   const navigate  = useNavigate();
   const {btnPrimary , textPrimary} = useThemedColors();
  return (
    <Flex marginBottom={'40px'} justify={'end'} >
      <Box className='btn' paddingY={1} paddingX={3} marginRight={"20px"} height={"auto"} backgroundColor={'transparent'}  
      
      onClick={() => navigate(-1)}
      
      >
         Cancel
      </Box>
      <Box backgroundColor={!disabled ? btnPrimary :"#888"} className={!disabled && 'btn'} paddingY={1} paddingX={3} border={`1px solid ${btnPrimary}`} color={"#eee"} marginRight={"30px"} borderRadius={5}
      onClick={!disabled ? click : undefined }
      
      >
         Save
      </Box>
    </Flex>
  )
}

export default Control