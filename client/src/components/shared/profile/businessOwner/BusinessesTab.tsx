import React, { useState } from 'react'
import DataTable from '../../DataTable';
import DataTableControl from '../../DataTableControl';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import SearchBoxDialog from '../../../dashboard/content/sidebar/SearchBoxDialog';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useThemedColors from '../../../../hooks/useThemedColors';
import { useQuery } from '@tanstack/react-query';
import BusinessTableHeader from '../../../dashboard/content/baseContent/tables/businesses/BusinessTableHeader';
import BusinessTableBody from '../../../dashboard/content/baseContent/tables/businesses/BusinessTableBody';

const BusinessesTab = ({businessOwnerId}) => {
    
   const navigate = useNavigate();
   const {textPrimary,btnSecondary} = useThemedColors();
   
   const {data:businessesData, 
      error:businessOwnerDataError, 
      isLoading:businessesDataIsLoading, 
     } = useQuery({ 
      queryKey: ['businesses-of-owner',businessOwnerId ], 
      queryFn: () => fetch(`http://localhost:5000/businessOwners/businesses?ownerId=${businessOwnerId}`).then(res =>  res.json()),
         refetchInterval : 5000,
         keepPreviousData: true ,
         staleTime : 30000,
   });

   if(businessesDataIsLoading )
      return <h1>Loading.......</h1>  

  return (
     <Box>
        <HStack marginBottom={1} justifyContent={"start"}>
           <Box className='btn'  color={btnSecondary}>
              <Text onClick={()=>navigate("/dashboard/businesses/add")} fontSize={"30px"}>
                 <AiFillPlusCircle  />
              </Text>
           </Box>
        </HStack>
        
        <Flex flexDirection={'column'} 
              smToMd={{maxWidth:'70vw'}} 
              smDown={{maxWidth:'96vw'}}   
              maxWidth={'98vw'} 
              height={'70vh'}
        
        >
           <DataTable
                       maxHeight={"350px"}
                       search={false}   
                       data={businessesData} 
                       TableHeader={BusinessTableHeader}
                       TableBody={BusinessTableBody}
           />

        </Flex>
     </Box>
  );
}

export default BusinessesTab