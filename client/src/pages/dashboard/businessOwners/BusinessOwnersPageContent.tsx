 
 import {  useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import {useQuery, } from '@tanstack/react-query';
 import DataTable from '../../../components/shared/DataTable';
 import { getTableRowsCount } from '../../../api/getTableRowsCount';
 import BusinessOwnerTableHeader from '../../../components/dashboard/content/baseContent/tables/businessOwners/BusinessOwnerTableHeader'; 
 import BusinessOwnerTableBody from '../../../components/dashboard/content/baseContent/tables/businessOwners/BusinessOwnerTableBody';
 import { Box,  HStack,  Text} from '@chakra-ui/react';
 import { AiFillPlusCircle } from "react-icons/ai";
 import useThemedColors from '../../../hooks/useThemedColors';
 
 const BusinessOwnersPageContent = () => {
   const navigate = useNavigate()
   
   const [currentpage, setCurrentPage] = useState(1);
   const pageSize = 5;
   
   const {btnSecondary, textPrimary} = useThemedColors();
   const businessOwnersCount = getTableRowsCount('businessOwners');
   
   const {data:businessOwnerData, 
         error:businessOwnerDataError, 
         isLoading:businessOwnerDataIsLoading, 
        } = useQuery({ 
      queryKey: ['business-owners',currentpage ], 
      queryFn: () => fetch(`http://localhost:5000/businessOwners/get?page=${currentpage}&pageSize=${pageSize}`).then(res =>  res.json()),
         refetchInterval : 5000,
         keepPreviousData: true ,
         staleTime : 30000,
   });
      
   if(businessOwnerDataIsLoading )
      return <h1>Loading.......</h1>
   if(businessOwnerData )
      return (
         <Box >
            <HStack marginBottom={2} padding={2}  justifyContent={"space-around"}>
               <Text color={textPrimary}>Business Owners</Text>
               <Box className='btn' padding={1} color={btnSecondary}>
                  <Text onClick={()=>navigate("/dashboard/business-owners/add")} fontSize={"40px"}>
                     <AiFillPlusCircle  />
                  </Text>
               </Box>
            </HStack>
         <DataTable data={businessOwnerData} 
                        currentpage={currentpage} 
                        setCurrentPage={setCurrentPage} 
                        pageSize={pageSize} 
                        completeDataCount={businessOwnersCount} 
                        TableHeader={BusinessOwnerTableHeader}
                        TableBody={BusinessOwnerTableBody}
      />
         </Box>
      );
      
      
 };
 
 export default BusinessOwnersPageContent;