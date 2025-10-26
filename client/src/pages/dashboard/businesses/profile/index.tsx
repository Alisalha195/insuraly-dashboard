import PageContainer from '../../../../components/dashboard/PageContainer';
import BusinessProfileContent from './BusinessProfileContent';

import { Box } from '@chakra-ui/react';
 const BusinessProfile = () => {
   return (
      <Box maxHeight={'100vh'} >
         <PageContainer pageContent={ BusinessProfileContent()} 
         />
      </Box>
   );
 }
 
 export default BusinessProfile;