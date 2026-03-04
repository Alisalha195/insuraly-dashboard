import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import ProfileImage from '../ProfileImage'
import ProfileHeadInfo from '../ProfileHeadInfo'

const ProfileUpperSection = ({personData, personRules}) => {
  return (
      <Flex flexDirection={{ xssToXmm: "column" }} padding={4} mdDown={{ padding: 2 }} gap={2} >

          <Flex justifyContent={{ xssToXmm: "center" }} paddingTop={"5px"}>
             <ProfileImage />
          </Flex>

          <Box marginLeft={{xmTo2xl:"13px"}} padding={0}>
             <ProfileHeadInfo data={personData} />
          </Box>
      </Flex>
  )
}

export default ProfileUpperSection