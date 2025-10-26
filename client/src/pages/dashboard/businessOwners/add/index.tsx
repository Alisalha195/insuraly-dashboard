
import PageContainer from '../../../../components/dashboard/PageContainer';
import { Box } from '@chakra-ui/react';
import AddBusinessOwnerContent from './AddBusinessOwnerContent';
 const AddBusinessOwner = () => {
   return (
      <Box maxHeight={'100vh'} >
         
         <PageContainer pageContent={ AddBusinessOwnerContent()} 
         
         />
      </Box>
   );
 }
 
 export default AddBusinessOwner;