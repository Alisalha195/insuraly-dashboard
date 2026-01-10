import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useThemedColors from "../../../../../hooks/useThemedColors.ts";
import { host } from "../../../../../constants/connection.ts";
import SkeletonLoader from "../../../../../components/shared/Skeleton.tsx";
import Error from "../../../../../components/shared/Error.tsx";
import BackArrow from "../../../../../components/shared/BackArrow.tsx";
import ProfileImage from "../../../../../components/shared/profile/ProfileImage.tsx";
import ProfileHeadInfo from "../../../../../components/shared/profile/ProfileHeadInfo.tsx";

import BusinessOwnerProfileTabs from "../../../../components/shared/profile/businessOwner/BusinessOwnerProfileTabs";
import EmployeeProfileTabs from "../../../../../components/shared/profile/employee/EmployeeProfileTabs.tsx";

const BusinessOwnerProfileContent = () => {
   const { textPrimary, textSecondary, textEmail } = useThemedColors();
   const params = useParams();
   
   const {
      data: employeeData,
      error: employeeDataError,
      isLoading: employeeDataIsLoading,
   } = useQuery({
      queryKey: ["employee-profile", params?.id],
      queryFn: () =>
         fetch(
            `${host}/employees/get/id?id=${params?.id}`
         ).then((res) => res.json()),
      refetchInterval: 5000,
      keepPreviousData: true,
      staleTime: 30000,
   });
   
   if (employeeDataIsLoading)
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
   if(employeeDataError) 
      return <Error message={"Error"} />
   if (employeeData)
      return (
         <Box>
            <BackArrow />
               <Flex flexDirection={{ xssToXmm: "column" }} padding={4} mdDown={{ padding: 2 }} gap={2} >

                  <Flex justifyContent={{ xssToXmm: "center" }} paddingTop={"5px"}>
                     <ProfileImage />
                  </Flex>

                  <Box marginLeft={{xmTo2xl:"13px"}} padding={0}>
                     <ProfileHeadInfo data={employeeData} />
                  </Box>
               </Flex>
            <Box>
               <EmployeeProfileTabs employeeData={employeeData} />
            </Box>
         </Box>
      );
};

export default BusinessOwnerProfileContent;
