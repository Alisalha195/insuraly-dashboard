import { Box, Image } from '@chakra-ui/react'
import React from 'react'

const ProfileImage = () => {
  return (
    <Box>
      <Image width={"150px"} rounded="md" src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
    </Box>
  )
}

export default ProfileImage