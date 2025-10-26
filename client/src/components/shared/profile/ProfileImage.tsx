import { Box, Image } from '@chakra-ui/react'
import React from 'react'

const ProfileImage = () => {
   return (
      <Box>
         <Image
            maxWidth={{ xssToXs: "40px", xsToXm: "60px", xmToXmm: "70px", xmmToSm: "80px", smToMd: "90px", mdTo2xl: "100px" }}

            rounded={{ xssToXmm: "full", xmmTo2xl: "10px" }} src="https://bit.ly/sage-adebayo" alt="Dan Abramov"
         />
      </Box>
   )
}

export default ProfileImage