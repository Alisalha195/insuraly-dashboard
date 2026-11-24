import { Box, DataList, Flex, Heading, HStack, Span, Text, VStack } from "@chakra-ui/react";
import BusinessLogo from "../../../../components/shared/profile/business/BusinessLogo";
import Budget from "../../../../components/shared/Budget";
import Count from "../../../../components/shared/Count";
import { MdPeopleAlt,  MdPerson } from "react-icons/md";
import useThemedColors from "../../../../hooks/useThemedColors";

import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "../../../../components/shared/BackArrow";
import PageHeadTitle from "../../../../components/shared/PageHeadTitle";
import { useQuery } from "@tanstack/react-query";
import { host } from "../../../../constants/connection";
import SkeletonLoader from "../../../../components/shared/Skeleton";
import Error from "../../../../components/shared/Error";
import { capitalize } from "../../../../lib/capitalize";
import { useCustomQuery } from "../../../../hooks/useCustomQuery";
import { useTranslation } from "react-i18next";
import FixBottomArea from "@/components/shared/FixBottomArea";

const BusinessProfileContent = () => {
   
   const navigate = useNavigate();
   const params = useParams();
   const {textPrimary, textSecondary, iconGray} = useThemedColors();
   const {t} = useTranslation();
   
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
   console.log("businesses data :",businessData)
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
            overflowY={'hidden'}
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
                     <Flex 
                        flexDirection={'row'}
                        alignItems={'center'}
                     >
                        <Text 
                           color={iconGray}
                           fontSize={{xssToXmm:"24px", xmmTo3xl:"28px"}}
                        >
                           <MdPerson />
                        </Text>
                        <Text
                           color={textSecondary}
                           fontSize={{xssToXs:"18px", xsToSm:"19px"}}
                           fontStyle={'italic'}
                        >
                           {capitalize(businessData?.Business_owners?.personal_informations?.first_name)} {capitalize(businessData?.Business_owners?.personal_informations?.last_name)}
                        </Text>
                     </Flex>
                     <Flex
                        color={textSecondary}
                        fontSize={{xssToXs:"15px", xsToSm:"17px"}}
                        
                     >
                        <Text 
                           color={iconGray}
                           fontSize={{xssToXs:"14px", xsToSm:"16px"}}
                        >

                           {businessData?.law_initiative_date}
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
         
            <Flex mt={8} overflowY={'scroll'}>
               <DataList.Root orientation="horizontal" divideY="1px" maxW="md">
                           
                 <DataList.Item key={'commercial_type'} pt="4">
                   <Flex flexDirection={{xssToXm:"column", xmTo3xl:"row"}} justifyContent={'space-between'}>
                      <DataList.ItemLabel fontSize={{xssToXs:"14px", xsToSm:"16px"}}>{t("commercialType")}</DataList.ItemLabel>
                      <DataList.ItemValue ps={2} fontSize={{xssToXs:"14px", xsToSm:"16px"}}>{businessData?.commercial_type}</DataList.ItemValue>
                   </Flex>
                 </DataList.Item>
                 
                 <DataList.Item key={'stage'} pt="4">
                   <Flex flexDirection={{xssToXm:"column", xmTo3xl:"row"}} justifyContent={'space-between'}>
                      <DataList.ItemLabel fontSize={{xssToXs:"14px", xsToSm:"16px"}}>{t("stage")}</DataList.ItemLabel>
                      <DataList.ItemValue  ps={2} fontSize={{xssToXs:"14px", xsToSm:"16px"}}>{businessData?.stage}</DataList.ItemValue>
                   </Flex>
                 </DataList.Item>
                 
                 <DataList.Item key={'state'} pt="4">
                    <Flex flexDirection={{xssToXm:"column", xmTo3xl:"row"}} justifyContent={'space-between'}>
                      <DataList.ItemLabel fontSize={{xssToXs:"14px", xsToSm:"16px"}}>{t("State")}</DataList.ItemLabel>
                      <DataList.ItemValue  ps={2} fontSize={{xssToXs:"14px", xsToSm:"16px"}}>{businessData?.state}</DataList.ItemValue>
                    </Flex>
                 </DataList.Item>
                 
                 <DataList.Item key={'status'} pt="4">
                    <Flex flexDirection={{xssToXm:"column", xmTo3xl:"row"}} justifyContent={'space-between'}>
                      <DataList.ItemLabel fontSize={{xssToXs:"14px", xsToSm:"16px"}}>{t("status")}</DataList.ItemLabel>
                      <DataList.ItemValue  ps={2} fontSize={{xssToXs:"14px", xsToSm:"16px"}}>{businessData?.status}</DataList.ItemValue>
                    </Flex>
                 </DataList.Item>
                 
                 

               </DataList.Root>
            </Flex>
            <FixBottomArea />
         
         </Flex>
      )
   } else {
      return <Error message={"Error"} />
   }
}
export default BusinessProfileContent