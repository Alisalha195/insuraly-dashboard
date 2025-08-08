
import {host} from "../../../constants/connection.ts"

import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useQuery, } from '@tanstack/react-query';
import DataTable from '../../../components/shared/DataTable';
import { getTableRowsCount } from '../../../api/getTableRowsCount';

import { Box,  Flex,  HStack,  Text} from '@chakra-ui/react';
import { AiFillPlusCircle } from "react-icons/ai";
import useThemedColors from '../../../hooks/useThemedColors';
import BackArrow from '../../../components/shared/BackArrow';
import BusinessTableHeader from '../../../components/dashboard/content/baseContent/tables/businesses/BusinessTableHeader';
import BusinessTableBody from '../../../components/dashboard/content/baseContent/tables/businesses/BusinessTableBody';
import DataTableControl from '../../../components/shared/DataTableControl';
import SearchBoxDialog from '../../../components/dashboard/content/sidebar/SearchBoxDialog';
 
 const BusinessesPageContent = () => {
   const navigate = useNavigate();
   
   const [currentpage, setCurrentPage] = useState(1);
   const pageSize = 5;
   
   const {btnSecondary, textPrimary} = useThemedColors();
   const businessesCount = getTableRowsCount('business');
   
   const {data:businessesData, 
         error:businessOwnerDataError, 
         isLoading:businessesDataIsLoading, 
        } = useQuery({ 
      queryKey: ['businesses',currentpage ], 
      queryFn: () => fetch(`${host}/business/get?page=${currentpage}&pageSize=${pageSize}`).then(res =>  res.json()),
         refetchInterval : 5000,
         keepPreviousData: true ,
         staleTime : 30000,
   });
      
   if(businessesDataIsLoading )
      return <h1>Loading.......</h1>  
   if(businessesData )
      return (
         <Box >
            <BackArrow />
            <HStack marginBottom={2} padding={2}  justifyContent={"space-around"}>
               <SearchBoxDialog />
               <Text color={textPrimary}>Businesses</Text>
               <Box className='btn' padding={1} color={btnSecondary}>
                  <Text onClick={()=>navigate("/dashboard/businesses/add")} fontSize={"40px"}>
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
                           maxHeight={"580px"}
                           search={false}
                           data={businessesData} 
                           TableHeader={BusinessTableHeader}
                           TableBody={BusinessTableBody}
               />
               <DataTableControl 
                           currentpage={currentpage}
                           setCurrentPage={setCurrentPage}
                           completeDataCount={businessesCount}
                           pageSize={pageSize}
               />
            </Flex>
         </Box>
      );
      
      
 };
 
 export default BusinessesPageContent;