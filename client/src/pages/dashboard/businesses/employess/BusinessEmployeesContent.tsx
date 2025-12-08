import { Box, Flex, HStack, Icon,  Text, VStack } from '@chakra-ui/react';
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

const BusinessEmployeesContent = () => {
   
   const params = useParams();
   
   const navigate = useNavigate();
   const location =  useLocation();
   
   const { btnSecondary, textPrimary, bgSecondary } = useThemedColors();
   const [currentpage, setCurrentPage] = useState(1);
   const pageSize = 5;
   const [employeesCount, setEmployeesCount] = useState(0);
   const businessEmployeesCount = getEmployeesCountInBusiness(params?.id);
   
   const {
         data: employeesData,
         error: employeesDataError,
         isLoading: employeessDataIsLoading,
      } = useQuery({
         queryKey: ["employees", currentpage],
         queryFn: () =>
            fetch(
               `${host}/business/get-employees?page=${currentpage}&pageSize=${pageSize}&businessId=${params?.id}`
            ).then((res) => res.json()),
         refetchInterval: 5000,
         keepPreviousData: true,
         staleTime: 30000,
      });
   
  return (
      <Box>
         {/* header line */}
         <PageHeadTitle 
            title={` ${ capitalize(location?.state?.businessName)  || "Business"} Employees`}
            backButton={true}
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
                        data={employeesData}
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
                  (employeessDataIsLoading) 
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