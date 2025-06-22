import { Box, Button, Flex } from '@chakra-ui/react'
import useThemedColors from '../../../hooks/useThemedColors'
import { useNavigate } from 'react-router-dom';

const Control = ({click}) => {
   const navigate  = useNavigate();
   const {btnPrimary , textPrimary} = useThemedColors();
  return (
    <Flex marginBottom={'40px'} justify={'end'} >
      <Box className='btn' paddingY={1} paddingX={3} marginRight={"20px"} height={"auto"} backgroundColor={'transparent'}  
      
      onClick={() => navigate(-1)}
      
      >
         Cancel
      </Box>
      <Box backgroundColor={btnPrimary} className='btn' paddingY={1} paddingX={3} border={`1px solid ${btnPrimary}`} color={textPrimary} marginRight={"30px"} borderRadius={5}
      onClick={click }
      
      >
         Save
      </Box>
    </Flex>
  )
}

export default Control