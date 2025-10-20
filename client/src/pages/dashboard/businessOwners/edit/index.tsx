
import PageContainer from '../../../../components/dashboard/PageContainer';

import { Box } from '@chakra-ui/react';
import EditBusinessOwnerContent from './EditBusinessOwnerContent';
 const EditBusinessOwner = () => {
   return (
      <Box maxHeight={'100vh'} >
         
         <PageContainer pageContent={ EditBusinessOwnerContent()} 
         
         />
      </Box>
   );
 }
 
 export default EditBusinessOwner;