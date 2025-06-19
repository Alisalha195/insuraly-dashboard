
import PageContainer from '../../../components/dashboard/PageContainer';
import BusinessOwnersPageContent from './BusinessOwnersPageContent';

import { Box } from '@chakra-ui/react';
 const BusinessOwners = () => {
   return (
      <Box maxHeight={'100vh'} >
         
         <PageContainer pageContent={ BusinessOwnersPageContent()} 
         
         />
      </Box>
   );
 }
 
 export default BusinessOwners;