
import { useColorModeValue } from "../components/ui/color-mode";


const useThemedColors:any = () => {
   
   const logoText = useColorModeValue('gray.300', 'gray.500');
   const logoBackground = useColorModeValue('red.500', 'red.400');
   
   const textPrimary = useColorModeValue('gray.800', 'gray.200');
   const textSecondary = useColorModeValue('gray.600', 'gray.300');
   
   const bgPrimary = useColorModeValue('gray.100', 'gray.900');
   const bgSecondary = useColorModeValue('gray.100', 'gray.800');
   
   const hovering = useColorModeValue('gray.300', 'gray.600');
   

   const InfoCardBorder = useColorModeValue('gray.200', 'gray.600');
   
   // ? background colors for dashboard Cards
   const bgInfoCard = {
      blue :  useColorModeValue('blue.300', 'blue.500'),
      red : useColorModeValue('red.300', 'red.500'),
      purple : useColorModeValue('purple.300', 'purple.500'),
      green : useColorModeValue('green.300', 'green.500'),
   };
   const bgInfoCardHover = {
      blue :  useColorModeValue('blue.400', 'blue.400'),
      red : useColorModeValue('red.400', 'red.400'),
      purple : useColorModeValue('purple.400', 'purple.400'),
      green : useColorModeValue('green.400', 'green.400'),
   };
   
   
  return (
    {
      textPrimary, 
      bgPrimary,
      textSecondary,
      bgSecondary,
      hovering,
      logoText,
      logoBackground,
      bgInfoCardHover,
      InfoCardBorder,
      bgInfoCard
    }
  )
}

export default useThemedColors;