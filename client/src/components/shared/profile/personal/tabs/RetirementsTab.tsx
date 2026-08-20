import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import useThemedColors from '../../../../../hooks/useThemedColors';
import { useCustomQuery } from '../../../../../hooks/useCustomQuery';
import { host } from '../../../../../constants/connection';
import SkeletonLoader from '../../../Skeleton';
import Error from '../../../Error';
import DataTable from '../../../tables/DataTable';
import { serviceTableHeaderData } from '../../../../dashboard/content/baseContent/tables/services/serviceTableHeaderData';
import ServiceTableBody from '../../../../dashboard/content/baseContent/tables/services/ServiceTableBody';
import TableHeader from '../../../tables/TableHeader';
import { AnnualRetirementsTableHeaderData } from '../../../../dashboard/content/baseContent/tables/retirements/annual/AnnualRetirementsTableHeaderData';
import AnnualRetirementsTableBody from '../../../../dashboard/content/baseContent/tables/retirements/annual/AnnualRetirementsTableBody';

const RetirementTab = ({employeeId}) => {
   
   const navigate = useNavigate();
   const { textPrimary,textSecondary, btnSecondary } = useThemedColors();
   
   const { data: retirementsData, 
      error : retirementsDataError, 
      isSuccess : retirementsDataSuccess,
      isLoading : retirementsDataIsLoading
   } = useCustomQuery(
      ['retirement-of-employee', employeeId] ,
      `${host}/retirement/getByEmployeeID?employeeID=${employeeId}`
   ) ;
  
   
   if (retirementsDataIsLoading) {
      return (
         <VStack justifyContent={'center'} height={'50vh'}>
            <SkeletonLoader width='60%'/>
            <SkeletonLoader width='50%'/>
            <SkeletonLoader width='60%' />
            <SkeletonLoader width='50%' />
            <SkeletonLoader width='60%' />
            <SkeletonLoader width='50%' />
         </VStack>
      );
   } 
   else if (retirementsDataError) {
      return <Error message={"Error in services !"} />
   } else if (!!retirementsData && retirementsDataSuccess) {
      return (
         <Box>
            {/* <HStack marginBottom={1} justifyContent={"start"}>
               <Box className='btn' color={btnSecondary}>
                  
                  <Text onClick={() => navigate("/dashboard/businesses/add")} fontSize={{ xssToXm: "14px", xmToSm: "16px" }} marginLeft={2}
                     marginBottom={1}
                  > */}
                     
                     {/* <AiFillPlusCircle /> */}
                     {/* new service */}
                     
                  {/* </Text>
               </Box>
            </HStack> */}

            <Flex flexDirection={'column'}
               smToMd={{ maxWidth: '70vw' }}
               smDown={{ maxWidth: '96vw' }}
               maxWidth={'98vw'}
               height={'70vh'}

            >
               {
                  (retirementsData && retirementsData.length > 0) ?
                  <Flex>
                     <DataTable
                        TableHeader={
                           <TableHeader headerData={AnnualRetirementsTableHeaderData}  />
                        }
                        TableBody={
                           <AnnualRetirementsTableBody data={retirementsData} />
                        }
                        maxHeight={"240px"}
                     />
                  </Flex>
                  :
                  <Text color={textSecondary}>No Retirement Found!</Text>
               }

            </Flex>
         </Box>
      );
   }
}

export default RetirementTab;