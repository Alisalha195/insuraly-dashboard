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
            
         <Flex position={'relative'}  direction="column" className='[flex-grow:1] ' maxHeight={'100vh'} overflow={'hidden'} >
            
           <Header 
              ref={headerRef}
              SidebarSize={SidebarSize}
              logo={SidebarRef?.current?.classList.contains("collapsed")}
            //   isRTL = {isRTL}
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
 
 export default PageContainer;