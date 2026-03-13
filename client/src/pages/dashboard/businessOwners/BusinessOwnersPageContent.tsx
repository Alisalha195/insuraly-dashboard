
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, } from '@tanstack/react-query';
import { getTableRowsCount } from '../../../api/getTableRowsCount';
import { businessOwnerTableHeaderData } from "../../../components/dashboard/content/baseContent/tables/businessOwners/businessOwnerTableHeaderData.ts";
import TableHeader from "../../../components/shared/tables/TableHeader.tsx"
import BusinessOwnerTableBody from '../../../components/dashboard/content/baseContent/tables/businessOwners/BusinessOwnerTableBody';
import { Box, HStack, Flex, Text, VStack, Icon, Span, } from '@chakra-ui/react';
import useThemedColors from '../../../hooks/useThemedColors';
import DataTable from '../../../components/shared/tables/DataTable.tsx';
import DataTableControl from '../../../components/shared/tables/DataTableControl.tsx';
import { host } from '../../../constants/connection.ts';
import PageHeadTitle from "../../../components/shared/PageHeadTitle";
import SkeletonLoader from '../../../components/shared/Skeleton.tsx';
import { LuSearch } from 'react-icons/lu';
import { useCustomQuery } from '../../../hooks/useCustomQuery.ts';

const BusinessOwnersPageContent = () => {

   const navigate = useNavigate();
   const [currentpage, setCurrentPage] = useState(1);
   const pageSize = 5;
   const { btnSecondary, textPrimary, bgSecondary, textSecondary } = useThemedColors();
   const businessOwnersCount = getTableRowsCount('businessOwners');

   // const { data: businessOwnerData,
   //    error: businessOwnerDataError,
   //    isLoading: businessOwnerDataIsLoading,
   // } = useQuery({
   //    queryKey: ['business-owners', currentpage],
   //    queryFn: () => fetch(`${host}/businessOwners/get?page=${currentpage}&pageSize=${pageSize}`).then(res => res.json()),
   //    refetchInterval: 5000,
   //    keepPreviousData: true,
   //    staleTime: 30000,
   // });
   
   const { 
      data:businessOwnerData, 
      error:businessOwnerDataError, 
      isSuccess:businessOwnerDataSuccess ,
      isLoading :businessOwnerDataIsLoading
   } = useCustomQuery(
      ['business-owners', currentpage] ,
      `${host}/businessOwners/get?page=${currentpage}&pageSize=${pageSize}`
   );

      return (
         <Box >
            {/* header line */}
            <PageHeadTitle
               backButton={true} 
               title={<Span fontWeight={500} color={textSecondary}>Business Owners </Span>}
            />
            
            {/* upper control */}
            <HStack justifyContent={"start"} marginBottom={1}>
               <Flex flexDirection={'column'} justifyContent={'center'} paddingY={0} paddingX={1} onClick={() => navigate("/dashboard/business-owners/search")}>
                  <Icon
                     fontSize={{ xssToXs: "16px", xsToXm: "18px", xmToSm: "20px" }}
                  >
                     <LuSearch
                        className='btn'
                     />
                  </Icon>
               </Flex>
               
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
              {
               businessOwnerData && businessOwnerData.length > 0 ? (
                 <>
                     <DataTable
                        TableHeader={
                           <TableHeader headerData={businessOwnerTableHeaderData} />
                        }
                        TableBody={
                           <BusinessOwnerTableBody data={businessOwnerData} search={false} />
                        }
                        maxHeight={"560px"}
                        successful={!!businessOwnerDataSuccess}
                     />
                     <DataTableControl
                        currentpage={currentpage}
                        setCurrentPage={setCurrentPage}
                        completeDataCount={businessOwnersCount}
                        pageSize={pageSize}
                     />
                  </>
               )
               :(businessOwnerDataIsLoading) && 
               (
                  <VStack justifyContent={'center'} height={'50vh'}>
                     <SkeletonLoader width='60%'/>
                     <SkeletonLoader width='50%'/>
                     <SkeletonLoader width='60%' />
                     <SkeletonLoader width='50%' />
                     <SkeletonLoader width='60%' />
                     <SkeletonLoader  width='50%' />
                  </VStack>
               )
              }
            </Flex>
            
         </Box>
      );


};

export default BusinessOwnersPageContent;

