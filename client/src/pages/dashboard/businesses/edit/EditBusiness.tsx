
import PageContainer from '../../../../components/dashboard/PageContainer';

import { Box } from '@chakra-ui/react';
import EditBusinessContent from './EditBusinessContent';
 const EditBusiness = () => {
   return (
      <Box maxHeight={'100vh'} >
         
         <PageContainer pageContent={ EditBusinessContent()} 
         
         />
      </Box>
   );
 }
 
 export default EditBusiness;