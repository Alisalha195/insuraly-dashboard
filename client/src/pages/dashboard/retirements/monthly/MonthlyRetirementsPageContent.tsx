import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useThemedColors from '../../../../hooks/useThemedColors';
import { useCustomQuery } from '../../../../hooks/useCustomQuery';
import { host } from '../../../../constants/connection';
import Error from '../../../../components/shared/Error';
import { Box, Center, Flex, HStack, Icon, Span, Text, VStack } from '@chakra-ui/react';
import BackArrow from '../../../../components/shared/BackArrow';
import SkeletonLoader from '../../../../components/shared/Skeleton';
import PageHeadTitle from '../../../../components/shared/PageHeadTitle';
import { LuSearch } from 'react-icons/lu';
import DataTable from '../../../../components/shared/tables/DataTable';
import DataTableControl from '../../../../components/shared/tables/DataTableControl';
import TableHeader from '../../../../components/shared/tables/TableHeader';
import { MonthlyRetirementsTableHeaderData } from '../../../../components/dashboard/content/baseContent/tables/retirements/monthly/MonthlyRetirementsTableHeaderData';
import MonthlyRetirementsTableBody from '../../../../components/dashboard/content/baseContent/tables/retirements/monthly/MonthlyRetirementsTableBody';

const MonthlyRetirementsPageContent = () => {
   
   const navigate = useNavigate();
   const [currentpage, setCurrentPage] = useState(1);
   const pageSize = 5;
   
   const {textSecondary, btnSecondary} = useThemedColors();
   const params = useParams();
   
   const date = new Date(Date.now());
      
   const { 
         data:monthlyRetirementsData, 
         error:monthlyRetirementsDataError, 
         isSuccess:monthlyRetirementsDataSuccess ,
         isLoading :monthlyRetirementsDataIsLoading
   } = useCustomQuery(
      ['monthly_Retirements', params?.year,params?.month ,params?.type ,currentpage] ,
      `${host}/retirement/getPaginatedMonthlyRetirements?year=${params?.year}&month=${params?.month}&type=${params?.type}&page=${currentpage}&pageSize=${pageSize}`
   );
   if((monthlyRetirementsData?.data)&&(monthlyRetirementsData?.data?.length > 0)) {
      return (
         <Box> 
           <PageHeadTitle 
              title={<Span fontWeight={500} color={textSecondary}>{`Monthly Claims (${params?.month})`} </Span>}
              backButton={true}
           />
           {/* <VStack> */}
           
              {/* upper control */}
              <HStack justifyContent={"start"} marginBottom={1}>
                  <Flex flexDirection={'column'} justifyContent={'center'} paddingY={0} paddingX={1} onClick={() => navigate("/dashboard/retirements/search")}>
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
                       onClick={() => navigate("/dashboard/retirements/new")}
                       fontSize={{ xssToXs: "14px", xsToXm: "16px", xmToSm: "18px" }}
                       marginLeft={2}
                    >
                       new Retirement
                       {/* <AiFillPlusCircle /> */}
                    </Text>
                 </Box>
              </HStack>
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
                       <TableHeader headerData={MonthlyRetirementsTableHeaderData} />
                    }
                    TableBody={
                       <MonthlyRetirementsTableBody data={monthlyRetirementsData?.data } search={false} />
                    }
                    maxHeight={"450px"}
                 />
                 
                 <DataTableControl
                    currentpage={currentpage}
                    setCurrentPage={setCurrentPage}
                    completeDataCount={monthlyRetirementsData?.dataCount}
                    pageSize={pageSize}
                 />
              </Flex>
           {/* </VStack> */}
           
         </Box>
      )
   } else if(monthlyRetirementsDataIsLoading) {
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
      
   } else if(monthlyRetirementsData?.data?.length < 1 || !monthlyRetirementsData?.data) {
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
   } else if(monthlyRetirementsDataError) {
      return (
         <Error
            message={"Something Went Wrong !!"}
         />
      )
   }
   
  
}

export default MonthlyRetirementsPageContent;