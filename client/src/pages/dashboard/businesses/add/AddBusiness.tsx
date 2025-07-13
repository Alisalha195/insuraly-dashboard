
import PageContainer from '../../../../components/dashboard/PageContainer';
import AddBusinessContent from './AddBusinessContent';
import { Box } from '@chakra-ui/react';
 const AddBusiness = () => {
   return (
      <Box maxHeight={'100vh'} >
         
         <PageContainer pageContent={ AddBusinessContent()} 
         
         />
      </Box>
   );
 }
 
 export default AddBusiness;