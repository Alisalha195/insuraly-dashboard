
import { useColorModeValue } from "../components/ui/color-mode";


const useThemedColors:any = () => {
   
   const logoText = useColorModeValue('gray.300', 'gray.500');
   const logoBackground = useColorModeValue('red.500', 'red.400');
   
   const textPrimary = useColorModeValue('gray.800', 'gray.200');
   const textSecondary = useColorModeValue('gray.600', 'gray.300');
   
   const bgPrimary = useColorModeValue('gray.100', 'gray.900');
   const bgSecondary = useColorModeValue('gray.100', 'gray.800');
   
   const hovering = useColorModeValue('gray.300', 'gray.600');
   
   const bgInfoCard = useColorModeValue('gray.300', 'gray.500');
   const bgInfoCardHover = useColorModeValue('gray.400', 'gray.400');
   const InfoCardBorder = useColorModeValue('gray.200', 'gray.600');

  return (
    {
      textPrimary, 
      bgPrimary,
      textSecondary,
      bgSecondary,
      hovering,
      logoText,
      logoBackground,
      bgInfoCard,
      bgInfoCardHover,
      InfoCardBorder
    }
  )
}

export default useThemedColors