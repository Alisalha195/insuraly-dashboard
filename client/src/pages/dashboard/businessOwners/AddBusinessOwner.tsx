
import PageContainer from '../../../components/dashboard/PageContainer';
import BusinessOwnersPageContent from './BusinessOwnersPageContent';
import AddBusinessOwnerContent from './AddBusinessOwnerContent';
import { Box } from '@chakra-ui/react';
 const AddBusinessOwner = () => {
   return (
      <Box maxHeight={'100vh'} >
         
         <PageContainer pageContent={ AddBusinessOwnerContent()} 
         
         />
      </Box>
   );
 }
 
 export default AddBusinessOwner;