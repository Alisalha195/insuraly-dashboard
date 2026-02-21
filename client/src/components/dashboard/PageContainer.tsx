import Header from './header/Header';
import Sidebar from './content/sidebar/Sidebar';
import { Box, Flex, HStack, } from '@chakra-ui/react';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import Footer from './footer/Footer';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

const PageContainer = () => {
   
   const [headerRef, headerSize] = useResizeObserver();
   const [SidebarRef, SidebarSize] = useResizeObserver();

   return (
      <HStack  className='[flex-grow:1] '  alignItems={'start'}  gap={0}>
         <Sidebar 
            SidebarRef={SidebarRef}
            SidebarSize={SidebarSize}
         />
         <Flex position={'relative'}  direction="column" className='[flex-grow:1] ' maxHeight={'100vh'} overflow={'hidden'} >
            
           <Header 
              ref={headerRef}
              SidebarSize={SidebarSize}
              logo={SidebarRef?.current?.classList.contains("collapsed")}
           />
           
           <Box marginTop={`${headerSize?.height}px`}   padding={1} paddingBottom={4} >
              {/* {children} */}
              <Outlet />
           </Box>
         </Flex>
     </HStack>
   )
 }
 
 export default PageContainer;