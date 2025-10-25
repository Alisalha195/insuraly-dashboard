
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

   const inputBorder = useColorModeValue("#e4e4e7", "#27272a")
   const bgPrimary = useColorModeValue('gray.100', 'gray.900');
   const bgSecondary = useColorModeValue('gray.100', 'gray.800');

   const hovering = useColorModeValue('gray.300', 'gray.600');

   const btnPrimary = useColorModeValue('blue.400', 'blue.600');
   // const btnSecondaryBorder = useColorModeValue('blue.400', 'blue.600');
   const btnSecondary = useColorModeValue('blue.400', 'blue.500');
   const btnDanger = useColorModeValue('red.400', 'red.500') ;
   const btnGreen = useColorModeValue('green.400', 'green.500');
   const btnGray = useColorModeValue('#888', 'gray.300');
   
   const InfoCardBorder = useColorModeValue('gray.200', 'gray.600');

   const borderSecondary = useColorModeValue('gray.100', 'gray.900');

   const tableHead = useColorModeValue('gray.600', 'gray.300');
   const tableItem = useColorModeValue('gray.500', 'gray.400');

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
   const InfoCardsColorsHover = {
      blue: useColorModeValue('blue.400', 'blue.400'),
      orange: useColorModeValue('red.400', 'red.400'),
      purple: useColorModeValue('purple.400', 'purple.400'),
      yellow: useColorModeValue('green.400', 'green.400'),
   };

   const cardBasicColor = useColorModeValue('gray.200', 'gray.800');
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
         textInput
      }
   )
}

export default useThemedColors;