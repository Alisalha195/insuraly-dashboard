import { Box, Center, Flex, Span, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import PageHeadTitle from '../../../../components/shared/PageHeadTitle';
import useThemedColors from '../../../../hooks/useThemedColors';
import { useParams } from 'react-router-dom';
import DataTable from '../../../../components/shared/tables/DataTable';
import DataTableControl from '../../../../components/shared/tables/DataTableControl';
import TableHeader from '../../../../components/shared/tables/TableHeader';
import { retardedClaimsTableHeaderData } from '../../../../components/dashboard/content/baseContent/tables/claims/retarded/retardedClaimsTableHeaderData';
import RetardedClaimsTableBody from '../../../../components/dashboard/content/baseContent/tables/claims/retarded/RetardedClaimsTableBody';
import { useCustomQuery } from '../../../../hooks/useCustomQuery';
import { host } from '../../../../constants/connection';
import SkeletonLoader from '../../../../components/shared/Skeleton';
import Error from '../../../../components/shared/Error';

const RetardedClaimsPageContent = () => {
   
   const {textSecondary} = useThemedColors();
   const [currentpage, setCurrentPage] = useState(1);
   const pageSize = 5;
   const params = useParams();
   
   const date = new Date();
   const seconds = date.getMilliseconds();
   
   const { 
      data:retardedClaimsData, 
      error:retardedClaimsDataError, 
      isSuccess:retardedClaimsDataSuccess ,
      isLoading :retardedClaimsDataIsLoading
   } = useCustomQuery(
      [`retarded_claims ${currentpage}`] ,
      `${host}/claims/getPaginatedRetardedClaims?page=${currentpage}&pageSize=${pageSize}`
   );
   
   // console.log("retardedClaimsDataIsLoading :",retardedClaimsDataIsLoading)
   console.log("retardedClaimsData ::",retardedClaimsData);
   if(retardedClaimsData?.data && retardedClaimsData?.data?.length > 0) {
      
      return (
              <Box> 
                <PageHeadTitle 
                   title={<Span fontWeight={500} color={textSecondary}>{"Retarded"} </Span>}
                   backButton={true}
                />
                <VStack>
                   <Flex  
                      flexDirection={'column'}
                      smToMd={{ maxWidth: '70vw' }}
                      smDown={{ maxWidth: '96vw' }}
                      maxWidth={'98vw'}
                      height={'70vh'}
                   >
       
                         <DataTable
                            TableHeader={
                               <TableHeader headerData={retardedClaimsTableHeaderData} />
                            }
                            TableBody={
                               <RetardedClaimsTableBody data={retardedClaimsData?.data} search={false} />
                            }
                            maxHeight={"560px"}
                         />
                         <DataTableControl
                            currentpage={currentpage}
                            setCurrentPage={setCurrentPage}
                            completeDataCount={retardedClaimsData?.dataCount}
                            pageSize={pageSize}
                         />
       
                   </Flex>
                </VStack>
                
              </Box>
      )
   } else if (retardedClaimsDataIsLoading) {
      return (
         <VStack justifyContent={'center'} height={'50vh'}>
            <SkeletonLoader width='60%'/>
            <SkeletonLoader width='50%'/>
            <SkeletonLoader width='60%' />
            <SkeletonLoader width='50%' />
            <SkeletonLoader width='60%' />
            <SkeletonLoader  width='50%' />
         </VStack>
      );
   } else if (retardedClaimsData?.data?.length < 1) {
      return (
         <Center 
            flexDirection={'column'}
            height={'50vh'}
         >
            <Text fontSize={18} color={textSecondary} fontWeight={500}>
               No Retarded Claims Yet !!
            </Text>
         </Center>
      )
   } else if (retardedClaimsDataError) {
      return (
         <Error
            message={"Something Went Wrong !!"}
         />
      )
   }
}
export default RetardedClaimsPageContent;