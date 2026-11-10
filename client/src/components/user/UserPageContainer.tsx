import { Box, Flex, HStack, LocaleProvider, } from '@chakra-ui/react';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { Outlet } from 'react-router-dom';
import useLangDir from '../../hooks/useLangDir';
// import Header from '../dashboard/header/Header';
import UserHeader from './UserHeader';

const UserPageContainer = () => {
   
   const [headerRef, headerSize] = useResizeObserver();
   
   const {currentLanguage, isRTL, dir} = useLangDir();
   
   return (
      
      <HStack   className='[flex-grow:1] '  alignItems={'start'}  gap={0} >
            
         <Flex position={'relative'}  direction="column" className='[flex-grow:1] ' maxHeight={'100vh'} overflow={'hidden'}  >
            
           <UserHeader 
              ref={headerRef}
              logo={true}
           />
           <LocaleProvider locale={currentLanguage}  dir={dir}>
              <Box dir={dir} marginTop={`${headerSize?.height}px`}   padding={1} paddingBottom={4} >
                 {/* {children} */}
                 <Outlet />
              </Box>
           </LocaleProvider>
         </Flex>
     </HStack>
     
   )
 }
 
 export default UserPageContainer;