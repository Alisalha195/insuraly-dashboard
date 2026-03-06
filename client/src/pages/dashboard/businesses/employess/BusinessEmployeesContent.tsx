import { Box, Flex, HStack, Icon,  Span,  Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import BackArrow from '../../../../components/shared/BackArrow';
import PageHeadTitle from '../../../../components/shared/PageHeadTitle';
import { LuSearch } from 'react-icons/lu';
import useThemedColors from '../../../../hooks/useThemedColors';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DataTable from '../../../../components/shared/tables/DataTable';
import DataTableControl from '../../../../components/shared/tables/DataTableControl';
import SkeletonLoader from '../../../../components/shared/Skeleton';
import { useQuery } from '@tanstack/react-query';
import { host } from '../../../../constants/connection';
import { employeeTableHeaderData } from '../../../../components/dashboard/content/baseContent/tables/employees/employeeTableHeaderData';
import TableHeader from '../../../../components/shared/tables/TableHeader';
import { getEmployeesCountInBusiness } from '../../../../api/getTableRowsCount';
import EmployeeTableBody from '../../../../components/dashboard/content/baseContent/tables/employees/EmployeeTableBody';
import { capitalize } from '../../../../lib/capitalize';
import { useCustomQuery } from '../../../../hooks/useCustomQuery';

const BusinessEmployeesContent = () => {
   
   const params = useParams();
   
   const navigate = useNavigate();
   const location =  useLocation();
   
   const { btnSecondary, textPrimary, bgSecondary, textSecondary } = useThemedColors();
   const [currentpage, setCurrentPage] = useState(1);
   const pageSize = 5;
   // const [employeesCount, setEmployeesCount] = useState(0);
   const businessEmployeesCount = getEmployeesCountInBusiness(params?.id);
   
   // const {
   //       data: employeesData,
   //       error: employeesDataError,
   //       isLoading: employeessDataIsLoading,
   //       isSuccess: employeesDataIsSuccess,
   //    } = useQuery({
   //       queryKey: ["employees-in-business", currentpage ,params?.id],
   //       queryFn: () =>
   //          fetch(
   //             `${host}/business/get-employees?page=${currentpage}&pageSize=${pageSize}&businessId=${params?.id}`
   //          ).then((res) => res.json()),
   //       refetchInterval: 5000,
   //       keepPreviousData: true,
   //       staleTime: 30000,
   //    });
      
      const { 
         data:employeesData, 
         error:employeesDataError, 
         isSuccess:employeesDataIsSuccess ,
         isLoading :employeessDataIsLoading
      } = useCustomQuery(
         ["employees-in-business", currentpage ,params?.id] ,
         `${host}/business/get-employees?page=${currentpage}&pageSize=${pageSize}&businessId=${params?.id}`
      )
   
  return (
      <Box>
         {/* header line */} 
         <PageHeadTitle 
            title={<><Span fontWeight={700} color={textSecondary}>
               { capitalize(location?.state?.businessName)  || "Business"}
               </Span>
               <Span fontWeight={500} color={textSecondary}> Employees</Span>
               </>
               }
            backButton={true}
         />
         
         {/* upper control */}
         <HStack justifyContent={"start"} marginBottom={1}>
               <Flex flexDirection={'column'} justifyContent={'center'} paddingY={0} paddingX={1} onClick={() =>  navigate(`/dashboard/businesses/${params?.id}/employees/search` ,{state: {businessName: location?.state?.businessName , businessID: params?.id}})}>
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
                     onClick={() => navigate(`/dashboard/businesses/${params?.id}/employees/add` ,{state: {businessName: location?.state?.businessName , businessID: params?.id}})}
                     fontSize={{ xssToXs: "14px", xsToXm: "16px", xmToSm: "18px" }}
                     marginLeft={2}
                  >
                     new employee
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
               employeesData && employeesData?.length > 0 
               ? (
                 <>
                     <DataTable
                        maxHeight={"560px"}
                        data={[employeesData, {businessID:params?.id}, {businessName:location?.state?.businessName}]}
                        TableHeader={
                           <TableHeader headerData={employeeTableHeaderData} />
                        }
                        TableBody={EmployeeTableBody}
                        search={false}
                     />
                     <DataTableControl
                        currentpage={currentpage}
                        setCurrentPage={setCurrentPage}
                        completeDataCount={businessEmployeesCount}
                        pageSize={pageSize}
                     />
                  </>
               )
               :
                  (employeessDataIsLoading && !employeesDataIsSuccess) 
                  ?
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
                  : (
                     <HStack justifyContent={'center'}>
                        <Text>No Data Found</Text>
                     </HStack>
                  )
              }
            </Flex>
      </Box>
          
      
  )
}

export default BusinessEmployeesContent;