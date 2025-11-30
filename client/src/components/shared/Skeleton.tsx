import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const SkeletonLoader = ({ width = "100%", height = "20px", borderRadius = "4px", margin = "0", ...props }) => {
   // Define the pulsing animation
   const pulse = keyframes`
      0% {
         opacity: 1;
      }
      50% {
         opacity: 0.5;
      }
      100% {
         opacity: 1;
      }
   `;

   return (
      <Box
         width={width}
         height={height}
         borderRadius={borderRadius}
         margin={margin}
         backgroundColor="gray.300"
         animation={`${pulse} 1.5s infinite`}
         {...props}
      />
   );
};

export default SkeletonLoader;