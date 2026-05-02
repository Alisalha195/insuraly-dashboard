import { Box, Center, Flex, HStack, Icon, Span,  Text,  VStack } from '@chakra-ui/react';
import PageHeadTitle from '../../../../components/shared/PageHeadTitle';
import { getMonthNames } from '../../../../lib/helpers';
import useThemedColors from '../../../../hooks/useThemedColors';
import { useCustomQuery } from '../../../../hooks/useCustomQuery';
import { useState } from 'react';
import { host } from '../../../../constants/connection';
import DataTable from '../../../../components/shared/tables/DataTable';
import DataTableControl from '../../../../components/shared/tables/DataTableControl';
import SkeletonLoader from '../../../../components/shared/Skeleton';
import { monthlyClaimsTableHeaderData } from '../../../../components/dashboard/content/baseContent/tables/claims/monthly/monthlyClaimsTableHeaderData';
import TableHeader from '../../../../components/shared/tables/TableHeader';
import MonthlyClaimsTableBody from '../../../../components/dashboard/content/baseContent/tables/claims/monthly/MonthlyClaimsTableBody';
import { useNavigate, useParams } from 'react-router-dom';
import Error from '../../../../components/shared/Error';
import BackArrow from '../../../../components/shared/BackArrow';
import { LuSearch } from 'react-icons/lu';

const MonthlyClaimsPageContent = () => {
   
   const navigate = useNavigate();
   const {textSecondary, btnSecondary} = useThemedColors();
   const [currentpage, setCurrentPage] = useState(1);
   const pageSize = 5;
   const params = useParams();
   const date = new Date();
   const seconds = date.getMilliseconds();
   const { 
      data:monthlyClaimsData, 
      error:monthlyClaimsDataError, 
      isSuccess:monthlyClaimsDataSuccess ,
      isLoading :monthlyClaimsDataIsLoading
   } = useCustomQuery(
      [`monthly_claims ${currentpage} params?.month ${params?.year}`] ,
      `${host}/claims/getMonthlyClaims?page=${currentpage}&pageSize=${pageSize}&month=${params?.month}&year=${params?.year}`
   );
   
   
   // console.log("monthlyClaimsDataIsLoading :",monthlyClaimsDataIsLoading)
   // console.log("monthlyClaimsData :",monthlyClaimsData)
   if(monthlyClaimsData?.data && monthlyClaimsData?.data?.length > 0) {

     return (
       <Box> 
         <PageHeadTitle 
            title={<Span fontWeight={500} color={textSecondary}>{`This Month (${getMonthNames()[params?.month-1]})`} </Span>}
            backButton={true}
         />
         
         {/* upper control */}
         <HStack justifyContent={"start"} marginBottom={2}>
            <Flex flexDirection={'column'} justifyContent={'center'} paddingY={0} paddingX={1} onClick={() => navigate("/dashboard/claims/monthly/search", { state: { month: params?.month } })}>
               <Icon
                  fontSize={{ xssToXs: "16px", xsToXm: "18px", xmToSm: "20px" }}
               >
                  <LuSearch
                     className='btn'
                  />
               </Icon>
            </Flex>
         </HStack>
         
            <Flex  
               flexDirection={'column'}
               smToMd={{ maxWidth: '70vw' }}
               smDown={{ maxWidth: '96vw' }}
               maxWidth={'98vw'}
               height={'70vh'}
            >

                  <DataTable
                     TableHeader={
                        <TableHeader headerData={monthlyClaimsTableHeaderData} />
                     }
                     TableBody={
                        <MonthlyClaimsTableBody data={monthlyClaimsData?.data} search={false} />
                     }
                     maxHeight={"560px"}
                  />
                  <DataTableControl
                     currentpage={currentpage}
                     setCurrentPage={setCurrentPage}
                     completeDataCount={monthlyClaimsData?.dataCount}
                     pageSize={pageSize}
                  />

            </Flex>
         
       </Box>
     )
   }
   else if(monthlyClaimsDataIsLoading) {
      return (
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
   else if(monthlyClaimsData?.data?.length < 1) {
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
   else if(monthlyClaimsDataError) {
      return (
         <Error
            message={"Something Went Wrong !!"}
         />
      )
   }
}

export default MonthlyClaimsPageContent;