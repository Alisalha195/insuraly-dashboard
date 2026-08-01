import { Box, Center, Flex, Span,  Text,  VStack } from '@chakra-ui/react';
import PageHeadTitle from '../../../../components/shared/PageHeadTitle';
import { getAnnulaClaimsShapedData, getDataGroupedByMonthes } from '../../../../lib/helpers';
import useThemedColors from '../../../../hooks/useThemedColors';
import { useCustomQuery } from '../../../../hooks/useCustomQuery';
// import { useEffect, useState } from 'react';
import { host } from '../../../../constants/connection';
import DataTable from '../../../../components/shared/tables/DataTable';
// import DataTableControl from '../../../../components/shared/tables/DataTableControl';
import SkeletonLoader from '../../../../components/shared/Skeleton';
import TableHeader from '../../../../components/shared/tables/TableHeader';
import AnnualClaimsTableBody from '../../../../components/dashboard/content/baseContent/tables/claims/annuall/AnnualClaimsTableBody';
import { annualClaimsTableHeaderData } from '../../../../components/dashboard/content/baseContent/tables/claims/annuall/annualClaimsTableHeaderData';
import { useParams } from 'react-router-dom';
import BackArrow from '../../../../components/shared/BackArrow';
import Error from '../../../../components/shared/Error';

const AnuualClaimsPageContent = () => {
   
   const {textSecondary} = useThemedColors();
   const params = useParams();
   const date = new Date(Date.now());
   
   const { 
      data:annualClaimsData, 
      error:annualClaimsDataError, 
      isSuccess:annualClaimsDataSuccess ,
      isLoading :annualClaimsDataIsLoading
   } = useCustomQuery(
      ['annual_claims', params?.year] ,
      `${host}/claims/getAnnualClaims?year=${params?.year}`
   );

   if(((annualClaimsData?.data) && (annualClaimsData?.data?.length > 0))) {
      return (
         <Box> 
           <PageHeadTitle 
              title={<Span fontWeight={500} color={textSecondary}>{`Annual Claims (${params?.year})`} </Span>}
              backButton={true}
           />
           <VStack>
              <Flex  
                 flexDirection={'column'}
                 smToMd={{ maxWidth: '70vw' }}
                 smDown={{ maxWidth: '96vw' }}
                 maxWidth={'98vw'}
                 // height={'50vh'}
                 // overflow={'auto'}
              >

                 <DataTable
                    TableHeader={
                       <TableHeader headerData={annualClaimsTableHeaderData} />
                    }
                    TableBody={
                       <AnnualClaimsTableBody data={getAnnulaClaimsShapedData(getDataGroupedByMonthes(annualClaimsData.data ), params?.year) } search={false} />
                    }
                    maxHeight={"450px"}
                 />
              </Flex>
           </VStack>
           
         </Box>
      )
     

   } 
   else if(annualClaimsDataIsLoading) {
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
   }
   else if(annualClaimsData?.data?.length < 1) {
      return (
         <Center 
            width={"100%"}
            height={"100vh"}
         >
            <VStack>
               <Text>
                  No Data Found ! 
               </Text>
               <Box>
                  <BackArrow />
               </Box>
            </VStack>
         </Center>
      )
   }
   else if(annualClaimsDataError) {
      return (
         <Error
            message={"Something Went Wrong !!"}
         />
      )
   }
}
export default AnuualClaimsPageContent;