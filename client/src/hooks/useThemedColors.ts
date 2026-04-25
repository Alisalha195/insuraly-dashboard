
import { useColorModeValue } from "../components/ui/color-mode";


const useThemedColors: any = () => {

   const logoText = useColorModeValue('gray.300', 'gray.500');
   const logoBackground = useColorModeValue('red.500', 'red.400');

   const titleTextSecondary = useColorModeValue('gray.500', 'gray.400');

   const textPrimary = useColorModeValue('gray.800', 'gray.200');
   const textSecondary = useColorModeValue('gray.600', 'gray.300');
   const textEmail = useColorModeValue('gray.500', 'gray.400');

   const textInput = useColorModeValue('#777', '#aaa');

   const textError = useColorModeValue('red.500', 'red.400');
   
   const switchBtnBgOff = useColorModeValue("#ccc", "#aaa");
   const switchBtnBgOn = useColorModeValue("#858585", "#27272a");
   
   const inputBorder = useColorModeValue("#ccc", "#27272a");
   const inputContainerBg = useColorModeValue('#f1f1f1', 'transparent');
   
   const bgPrimary = useColorModeValue('gray.100', 'gray.900');
   const bgSecondary = useColorModeValue('gray.100', 'gray.800');

   // const headerBackground = useColorModeValue("gray.100","linear-gradient(90deg, #000, #210e29)");
   const headerBackground = useColorModeValue("gray.100",'transparent');
   const hovering = useColorModeValue('gray.300', 'gray.600');

   const btnPrimary = useColorModeValue('blue.600', 'blue.500');
   // const btnSecondaryBorder = useColorModeValue('blue.400', 'blue.600');
   const btnSecondary = useColorModeValue('blue.400', 'blue.500');
   const btnDanger = useColorModeValue('red.400', 'red.500') ;
   const btnGreen = useColorModeValue('green.400', 'green.500');
   const btnGray = useColorModeValue('#888', 'gray.300');
   
   const InfoCardBorder = useColorModeValue('#ccc', 'gray.800');

   const borderSecondary = useColorModeValue('#fff', 'gray.900');

   
   const tableHeaderBg = useColorModeValue('#d6d6d6', "#0c0214");
   const tableHead = useColorModeValue('gray.600', 'gray.300');
   const tableItem = useColorModeValue('gray.500', 'gray.400');
   
   const budgetText = useColorModeValue('#13b328', '#13d92b');
   const budgetHover = useColorModeValue('#13b328', '#13d92b');
   
   const CountText = useColorModeValue('#22b99d', '#16c9a8');
   
   const iconGray = useColorModeValue('#8d8d8d', '#6b6b6b');
   
   const footerBg = useColorModeValue('#8d8d8d', '#6b6b6b');
   
   const searchBoxBorder = useColorModeValue('#999', '#6b6b6b');
   
   const iconInSidebar = useColorModeValue('#444', '#bbb');
   const brand = useColorModeValue('#210e29', '#fff');
   // ? background colors for dashboard Cards
   // const bgInfoCard = {
   //    blue: useColorModeValue('blue.300', 'blue.500'),
   //    red: useColorModeValue('red.300', 'red.500'),
   //    purple: useColorModeValue('purple.300', 'purple.500'),
   //    green: useColorModeValue('green.300', 'green.500'),
   // };
   // const bgInfoCardHover = {
   //    blue: useColorModeValue('blue.400', 'blue.400'),
   //    red: useColorModeValue('red.400', 'red.400'),
   //    purple: useColorModeValue('purple.400', 'purple.400'),
   //    green: useColorModeValue('green.400', 'green.400'),
   // };

   const InfoCardsColors = {
      blue: useColorModeValue('#2e9599', '#2e9599'),
      orange: useColorModeValue('#f46c3f', '#f46c3f'),
      purple: useColorModeValue('#a7226f', '#a7226f'),
      yellow: useColorModeValue('#ebbf00', '#f7dc68'),
   };
   const InfoCardsBackgroundColors = {
      blue: useColorModeValue('#f7f7f7', "linear-gradient(180deg,#131313 ,#2e959966 )"),
      orange: useColorModeValue('#f7f7f7', "linear-gradient(180deg,#131313 ,#f46c3f66 )"),
      purple: useColorModeValue('#f7f7f7', "linear-gradient(180deg ,#131313 ,#a7226f66 )"),
      yellow: useColorModeValue('#f7f7f7', "linear-gradient(180deg ,#131313 ,#f7dc6866 )"),
   };
   const InfoCardsColorsHover = {
      blue: useColorModeValue('blue.400', 'blue.400'),
      orange: useColorModeValue('red.400', 'red.400'),
      purple: useColorModeValue('purple.400', 'purple.400'),
      yellow: useColorModeValue('green.400', 'green.400'),
   };

   const cardBasicColor = useColorModeValue('#f7f7f7', "linear-gradient(to left,#131313 ,#210e29 )");
   
   return (
      {
         textPrimary,
         bgPrimary,
         textSecondary,
         bgSecondary,
         btnSecondary,
         btnDanger,
         hovering,
         logoText,
         logoBackground,
         // bgInfoCardHover,
         InfoCardBorder,
         // bgInfoCard,
         inputBorder,
         titleTextSecondary,
         btnPrimary,
         btnGreen,
         btnGray,
         textEmail,
         cardBasicColor,
         InfoCardsColors,
         InfoCardsColorsHover,
         borderSecondary,
         tableItem,
         tableHead,
         textError,
         textInput,
         budgetText,
         CountText,
         iconGray,
         footerBg,
         inputContainerBg ,
         switchBtnBgOff, 
         switchBtnBgOn ,
         headerBackground, 
         tableHeaderBg,
         searchBoxBorder,
         iconInSidebar,
         brand,
         InfoCardsBackgroundColors
         
      }
   )
}

export default useThemedColors;