import { Box, Flex, Heading, HStack, Span, Text, VStack } from "@chakra-ui/react";
import BusinessLogo from "../../../../components/shared/profile/business/BusinessLogo";
import Budget from "../../../../components/shared/Budget";
import Count from "../../../../components/shared/Count";
import { MdPeopleAlt } from "react-icons/md";
import useThemedColors from "../../../../hooks/useThemedColors";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import BackArrow from "../../../../components/shared/BackArrow";
import PageHeadTitle from "../../../../components/shared/PageHeadTitle";
import { useQuery } from "@tanstack/react-query";
import { host } from "../../../../constants/connection";
import SkeletonLoader from "../../../../components/shared/Skeleton";
import Error from "../../../../components/shared/Error";
import { capitalize } from "../../../../lib/capitalize";
import { useCustomQuery } from "../../../../hooks/useCustomQuery";

const BusinessProfileContent = () => {
   
   const navigate = useNavigate();
   const params = useParams();
   const {textPrimary, textSecondary} = useThemedColors();
   
   // const {
   //    data: businessData,
   //    error: businessDataError,
   //    isLoading: businessDataIsLoading,
   // } = useQuery({
   //    queryKey: ["business-profile", params?.id] ,
   //    queryFn: () =>
   //       fetch(
   //          `${host}/business/get/id?id=${params?.id}`
   //       ).then((res) => res.json()),
   //    refetchInterval: 5000,
   //    keepPreviousData: true,
   //    staleTime: 30000,
   // });
   
   const { 
      data:businessData, 
      error:businessDataError, 
      isLoading :businessDataIsLoading
   } = useCustomQuery(
      ["business-profile", params?.id] ,
      `${host}/business/get/id?id=${params?.id}`
   );
   
   // const {
   //    data: businessEmployeesCount,
   //    error: businessEmployeesCountError,
   //    isLoading: businessEmployeesCountIsLoading,
   // } = useQuery({
   //    queryKey: ["business-employees-count-in-profile", params?.id] ,
   //    queryFn: () =>
   //       fetch(
   //          `${host}/business/get-employees-count/${params?.id}`
   //       ).then((res) => res.json()),
   //    refetchInterval: 5000,
   //    keepPreviousData: true,
   //    staleTime: 30000,
   // });
   
         const { 
            data:businessEmployeesCount, 
            error:businessEmployeesCountError, 
            isSuccess ,
            isLoading :businessEmployeesCountIsLoading
         } = useCustomQuery(
            ["business-employees-count-in-profile", params?.id] ,
            `${host}/business/get-employees-count/${params?.id}`
         );
   
   if (businessDataIsLoading) {
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
   } else if(businessData && !businessDataIsLoading) {
      return (
         <Flex
            flexDirection={'column'}
         > 
            <PageHeadTitle 
            title={<Span fontWeight={500} color={textSecondary}>{capitalize(businessData?.business_name) || "Business Profile"}</Span>}
            backButton={true}
            />

            {/* upper section */}
            <Flex
            flexDirection={{xssToXmm:"column", xmmTo3xl:"row"}}
            justifyContent={'space-between'}
            // paddingTop={"20px"}
            paddingX={"20px"}
            >
               {/* left side */}
               <Flex>
                  <Flex
                   flexDirection={'column'}
                  >
                     <Flex>
                        {/* <BusinessLogo /> */}
                        {/* <Text
                           color={textPrimary}
                           fontWeight={"500"}
                           fontFamily={"sans-serif"}
                           fontSize={{xssToXs:"20px", xsToSm:"21px"}}
                           
                        >
                           Costline Medical Group
                        </Text> */}
                     </Flex>
                     <Text
                        color={textSecondary}
                        fontSize={{xssToXs:"18px", xsToSm:"19px"}}
                        fontStyle={'italic'}
                     >
                        {businessData?.Business_owners?.personal_informations?.first_name} {businessData?.Business_owners?.personal_informations?.last_name}
                     </Text>
                     <Flex
                        color={textSecondary}
                        fontSize={{xssToXs:"15px", xsToSm:"17px"}}
                        
                     >
                        <Text>
                           2020
                        </Text>
                     </Flex>
                  </Flex>
               </Flex>

               {/* right side */}
               <Flex 
                  flexDirection={{xssToXm:"column",xmToXmm:"row", xmmTo3xl:"column"}}
                  justifyContent={'space-between'}
                  gap={{xssToXm:"8px" , xmTo3xl:"12px"}}
                  paddingTop={{xssToXmm:"28px", xmmTo3xl:0}}
               >
                  <Box onClick={()=>navigate(`/dashboard/businesses/${params?.id}/budget`)}>
                     <Budget 
                        amount={"300,240"}
                     />
                     
                  </Box>
                  <Box onClick={()=>navigate(`/dashboard/businesses/${params?.id}/employees` , {state: {businessName: businessData?.business_name}})}>
                     <Count 
                        icon={<MdPeopleAlt />}
                        amount={businessEmployeesCount?.count}
                     />
                  </Box>
                  
               </Flex>
            </Flex>
         </Flex>
      )
   } else {
      return <Error message={"Error"} />
   }
}
export default BusinessProfileContent