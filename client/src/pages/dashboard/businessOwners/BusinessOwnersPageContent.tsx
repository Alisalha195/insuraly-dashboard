
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, } from '@tanstack/react-query';
import { getTableRowsCount } from '../../../api/getTableRowsCount';
import { businessOwnerTableHeaderData } from "../../../components/dashboard/content/baseContent/tables/businessOwners/businessOwnerTableHeaderData.ts";
import TableHeader from "../../../components/shared/tables/TableHeader.tsx"
import BusinessOwnerTableHeader from '../../../components/dashboard/content/baseContent/tables/businessOwners/BusinessOwnerTableHeader';
import BusinessOwnerTableBody from '../../../components/dashboard/content/baseContent/tables/businessOwners/BusinessOwnerTableBody';
import { Box, HStack, Flex, Text } from '@chakra-ui/react';
import { AiFillPlusCircle } from "react-icons/ai";
import useThemedColors from '../../../hooks/useThemedColors';
import BackArrow from '../../../components/shared/BackArrow';
import DataTable from '../../../components/shared/tables/DataTable.tsx';
import DataTableControl from '../../../components/shared/tables/DataTableControl.tsx';
import SearchBoxDialog from '../../../components/dashboard/content/sidebar/SearchBoxDialog';
import BusinessOwnerSearchActions from '../../../components/dashboard/content/baseContent/tables/businessOwners/BusinessOwnerSearchActions';

import { host } from '../../../constants/connection.ts';
import PageHeadTitle from "../../../components/shared/PageHeadTitle";
import TableRowsCountSelectBox from "../../../components/shared/tables/TableRowsCountSelectBox.tsx";

const BusinessOwnersPageContent = () => {

   const navigate = useNavigate();
   const [currentpage, setCurrentPage] = useState(1);
   const pageSize = 5;
   const { btnSecondary, textPrimary, bgSecondary } = useThemedColors();
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
            <PageHeadTitle
               backButton={true}
               title={"Business Owners"}
            />

            {/* upper control */}
            <HStack justifyContent={"start"} marginBottom={1}>
               <SearchBoxDialog
                  title={'serach for a business owner'}
                  SearchActions={BusinessOwnerSearchActions}
               />
               <Box className='btn' color={btnSecondary}>
                  <Text
                     onClick={() => navigate("/dashboard/business-owners/add")}
                     fontSize={{ xssToXs: "14px", xsToXm: "16px", xmToSm: "18px" }}
                     marginLeft={2}
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
                  TableHeader={
                     <TableHeader headerData={businessOwnerTableHeaderData} />
                  }
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

