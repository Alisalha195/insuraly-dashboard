import Header from './header/Header';
import Sidebar from './content/sidebar/Sidebar';
import { Box, Flex, HStack, LocaleProvider, } from '@chakra-ui/react';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { Outlet } from 'react-router-dom';
import useLangDir from '../../hooks/useLangDir';

const PageContainer = () => {
   
   const [headerRef, headerSize] = useResizeObserver();
   const [SidebarRef, SidebarSize] = useResizeObserver();
   
   const {currentLanguage, isRTL, dir} = useLangDir();
   
   const headerHeight = headerSize?.height ?? 0;
   
   // const [lang , setLang] = useState('en');
   // const isRTL = ['ar'].includes(lang);
   // const localeTag = isRTL ? "ar-EG" : "en-US";
   // useEffect(()=>{
   //    document.documentElement.dir = isRTL ? "rtl" : "ltr";
   //    document.documentElement.lang = lang;
   // },[lang, isRTL]);
   
   // const toggleLanguage = () => {
   //    setLang((prev) => (prev === "en" ? "ar" : "en"));
   // };

   return (
      
      <HStack   className='[flex-grow:1] '  alignItems={'start'}  gap={0}>
         <Sidebar 
            SidebarRef={SidebarRef}
            SidebarSize={SidebarSize}
         />
            
         <Flex position={'relative'}  direction="column" className='[flex-grow:1] '  height="100vh" maxHeight={'100vh'} overflow={'hidden'} >
            
           <Header 
              ref={headerRef}
              SidebarSize={SidebarSize}
              logo={SidebarRef?.current?.classList.contains("collapsed")}
            //   isRTL = {isRTL}
           />
           <LocaleProvider locale={currentLanguage}  dir={dir}>
              {/* <Box dir={dir} marginTop={`${headerSize?.height}px`} flexDirection={'column'}   padding={1} paddingBottom={4} maxHeight={}>
                 
                 <Outlet />
              </Box> */}
              
              <Flex
                  dir={dir}
                  marginTop={`${headerHeight }px`}
                  height={`calc(100% - ${headerHeight}px)`}
                  maxHeight={`calc(100% - ${headerHeight}px)`}
                  flexDirection="column"
                  padding={1}
                  paddingBottom={4}
                  // overflowY="auto"
               >
                  <Outlet />
               </Flex>
              
           </LocaleProvider>
         </Flex>
     </HStack>
     
   )
 }
 
 export default PageContainer;