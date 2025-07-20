import PageContainer from '../../../../components/dashboard/PageContainer';
import BusinessOwnerProfileContent from './BusinessOwnerProfileContent';

import { Box } from '@chakra-ui/react';
 const BusinessOwnerProfile = () => {
   return (
      <Box maxHeight={'100vh'} >
         <PageContainer pageContent={ BusinessOwnerProfileContent()} 
         />
      </Box>
   );
 }
 
 export default BusinessOwnerProfile;