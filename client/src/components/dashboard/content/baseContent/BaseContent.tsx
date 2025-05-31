import { Flex, Stack } from '@chakra-ui/react'
import InfoCards from './infoCards/InfoCards'
import Header from '../../header/Header'

const BaseContent = () => {
  return (
   <Stack className='[flex-grow:1] ' >
      
    <Flex direction="column" >
      <Header />
      <InfoCards />
      <div>charts</div>
    </Flex>
   </Stack>
  )
}

export default BaseContent