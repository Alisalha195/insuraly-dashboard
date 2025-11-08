import Header from './header/Header';
import Sidebar from './content/sidebar/Sidebar';
import { Box, Flex, HStack, Stack } from '@chakra-ui/react';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import Footer from './footer/Footer';
import { Outlet } from 'react-router-dom';

const PageContainer = () => {
   
   const [headerRef, headerSize] = useResizeObserver();
   
   return (
      <HStack className='[flex-grow:1] '  alignItems={'start'}  gap={0}>
         <Sidebar />
         <Flex position={'relative'}  direction="column" className='[flex-grow:1] ' maxHeight={'100vh'} overflow={'hidden'} >
           <Header ref={headerRef}/>
           <Box marginTop={`${headerSize?.height}px`}   padding={1} paddingBottom={4} >
              {/* {children} */}
              <Outlet />
           </Box>
         </Flex>
     </HStack>
   )
 }
 
 export default PageContainer;