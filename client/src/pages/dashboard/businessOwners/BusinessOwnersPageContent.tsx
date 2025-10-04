
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, } from '@tanstack/react-query';
import DataTable from '../../../components/shared/DataTable';
import { getTableRowsCount } from '../../../api/getTableRowsCount';
import BusinessOwnerTableHeader from '../../../components/dashboard/content/baseContent/tables/businessOwners/BusinessOwnerTableHeader';
import BusinessOwnerTableBody from '../../../components/dashboard/content/baseContent/tables/businessOwners/BusinessOwnerTableBody';
import { Box, HStack, Flex, Text } from '@chakra-ui/react';
import { AiFillPlusCircle } from "react-icons/ai";
import useThemedColors from '../../../hooks/useThemedColors';
import BackArrow from '../../../components/shared/BackArrow';
import DataTableControl from '../../../components/shared/DataTableControl';
import SearchBoxDialog from '../../../components/dashboard/content/sidebar/SearchBoxDialog';
import BusinessOwnerSearchActions from '../../../components/dashboard/content/baseContent/tables/businessOwners/BusinessOwnerSearchActions';

import { host } from '../../../constants/connection.ts';

const BusinessOwnersPageContent = () => {
   const navigate = useNavigate()

   const [currentpage, setCurrentPage] = useState(1);
   const pageSize = 5;

   const { btnSecondary, textPrimary } = useThemedColors();
   const businessOwnersCount = getTableRowsCount('businessOwners');

   const { data: businessOwnerData,
      error: businessOwnerDataError,
      isLoading: businessOwnerDataIsLoading,
   } = useQuery({
      queryKey: ['business-owners', currentpage],
      queryFn: () => fetch(`${host}/businessOwners/get?page=${currentpage}&pageSize=${pageSize}`).then(res => res.json()),
      refetchInterval: 5000,
      keepPreviousData: true,
      staleTime: 30000,
   });

   if (businessOwnerDataIsLoading)
      return <h1>Loading.......</h1>
   if (businessOwnerData)
      return (
         <Box >

            {/* header line */}
            <HStack
               justifyContent={'center'}
               marginBottom={{ xssToXm: "40px", xmToSm: "50px" }}
            >
               <BackArrow />
               <Text
                  flexGrow={"1"}
                  textAlign={'center'}
                  color={textPrimary}
                  fontSize={{ xssToXs: '12px', xsToXm: "14px", xmToSm: "24px" }}
                  paddingRight={{ xmToSm: "2rem" }}

                  fontWeight={{ xssToSm: 500 }}
               >
                  Business Owners
               </Text>
            </HStack>

            {/* upper control */}
            <HStack justifyContent={"start"}>
               <SearchBoxDialog
                  title={'serach for a business owner'}
                  SearchActions={BusinessOwnerSearchActions}
               />

               <Box className='btn' color={btnSecondary}>
                  <Text
                     onClick={() => navigate("/dashboard/business-owners/add")}
                     fontSize={{ xssToXs: "14px", xsToXm: "16px", xmToSm: "18px" }}
                  >
                     new owner
                     {/* <AiFillPlusCircle /> */}
                  </Text>
               </Box>
            </HStack>

            <Flex flexDirection={'column'}
               smToMd={{ maxWidth: '70vw' }}
               smDown={{ maxWidth: '96vw' }}
               maxWidth={'98vw'}
               height={'70vh'}
            >
               <DataTable
                  maxHeight={"560px"}
                  data={businessOwnerData}
                  TableHeader={BusinessOwnerTableHeader}
                  TableBody={BusinessOwnerTableBody}
                  search={false}
               />
               <DataTableControl
                  currentpage={currentpage}
                  setCurrentPage={setCurrentPage}
                  completeDataCount={businessOwnersCount}
                  pageSize={pageSize}
               />
            </Flex>
         </Box>
      );


};

export default BusinessOwnersPageContent;

