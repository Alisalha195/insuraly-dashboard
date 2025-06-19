import Header from './header/Header';
import Sidebar from './content/sidebar/Sidebar';
import { Box, Flex, HStack, Stack } from '@chakra-ui/react';

const PageContainer = ({pageContent}) => {
   return (
      <HStack className='[flex-grow:1] ' overflowY={'hidden'} alignItems={'start'}  gap={0}>
         <Sidebar />
         <Flex  direction="column" className='[flex-grow:1] ' maxHeight={'100vh'} >
           <Header />
           <Box  className='fix-height' padding={1} paddingBottom={4}>
              {pageContent}
           </Box>
            
         </Flex>
     </HStack>
   )
 }
 
 export default PageContainer;