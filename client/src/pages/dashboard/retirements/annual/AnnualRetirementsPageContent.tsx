import React, { useState, useTransition } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { host } from '../../../../constants/connection';
import { useCustomQuery } from '../../../../hooks/useCustomQuery';
import { Box, Center, Flex, HStack, Icon, Span,  Text,  VStack } from '@chakra-ui/react';
import PageHeadTitle from '../../../../components/shared/PageHeadTitle';
import useThemedColors from '../../../../hooks/useThemedColors';
import DataTable from '../../../../components/shared/tables/DataTable';
import TableHeader from '../../../../components/shared/tables/TableHeader';
import SkeletonLoader from '../../../../components/shared/Skeleton';
import BackArrow from '../../../../components/shared/BackArrow';
import Error from '../../../../components/shared/Error';
import { AnnualRetirementsTableHeaderData } from '../../../../components/dashboard/content/baseContent/tables/retirements/annual/AnnualRetirementsTableHeaderData';
import AnnualRetirementsTableBody from '../../../../components/dashboard/content/baseContent/tables/retirements/annual/AnnualRetirementsTableBody';
import { getAnnulaClaimsShapedData, getDataGroupedByMonthes } from '../../../../lib/helpers';
import { LuSearch } from 'react-icons/lu';
import DataTableControl from '../../../../components/shared/tables/DataTableControl';
import { useTranslation } from 'react-i18next';

const AnnualRetirementsPageContent = () => {
   
   const navigate = useNavigate();
   const [currentpage, setCurrentPage] = useState(1);
   const pageSize = 5;
   
   const {textSecondary, btnSecondary} = useThemedColors();
   const params = useParams();
   console.log("params", params);
   
   const {t} = useTranslation();
   const date = new Date(Date.now());
   
   const { 
         data:annualRetirementsData, 
         error:annualRetirementsDataError, 
         isSuccess:annualRetirementsDataSuccess ,
         isLoading :annualRetirementsDataIsLoading
      } = useCustomQuery(
         ['annual_Retirements', params?.year, params?.type ,currentpage] ,
         `${host}/retirement/getPaginatedAnnualRetirements?year=${params?.year}&type=${params?.type}&page=${currentpage}&pageSize=${pageSize}`
      );
   
      console.log("annualRetirementsData", annualRetirementsData);
      
      if(((annualRetirementsData?.data) && (annualRetirementsData?.data?.length > 0))) {
         return (
            <Box> 
              <PageHeadTitle 
                 title={<Span fontWeight={500} color={textSecondary}>{`${t("anuualRetirements")} (${params?.year})`} </Span>}
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
                          {t("newRetirement")}
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
                          <TableHeader headerData={AnnualRetirementsTableHeaderData} />
                       }
                       TableBody={
                          <AnnualRetirementsTableBody data={annualRetirementsData?.data } search={false} />
                       }
                       maxHeight={"450px"}
                    />
                    
                    <DataTableControl
                       currentpage={currentpage}
                       setCurrentPage={setCurrentPage}
                       completeDataCount={annualRetirementsData?.dataCount}
                       pageSize={pageSize}
                    />
                 </Flex>
              {/* </VStack> */}
              
            </Box>
         )
      } 
      else if(annualRetirementsDataIsLoading) {
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
      else if(annualRetirementsData?.data?.length < 1 || !annualRetirementsData?.data) {
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
      else if(annualRetirementsDataError) {
         return (
            <Error
               message={"Something Went Wrong !!"}
            />
         )
      }
}

export default AnnualRetirementsPageContent