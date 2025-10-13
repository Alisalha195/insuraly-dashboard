import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import BackArrow from "../../../../components/shared/BackArrow";
import ProfileImage from "../../../../components/shared/profile/ProfileImage";
import useThemedColors from "../../../../hooks/useThemedColors";
import BusinessOwnerProfileTabs from "../../../../components/shared/profile/businessOwner/BusinessOwnerProfileTabs";
import { capitalize } from "../../../../lib/capitalize.ts";
import { host } from '../../../../constants/connection.ts';
import ProfileHeadInfo from "../../../../components/shared/profile/businessOwner/ProfileHeadInfo.tsx";


const BusinessOwnerProfileContent = () => {
   const { textPrimary, textSecondary, textEmail } = useThemedColors();
   const params = useParams();
   const {
      data: businessOwnerData,
      error: businessOwnerDataError,
      isLoading: businessOwnerDataIsLoading,
   } = useQuery({
      queryKey: ["business-owner", params?.id],
      queryFn: () =>
         fetch(
            `${host}/businessOwners/get/id?id=${params?.id}`
         ).then((res) => res.json()),
      refetchInterval: 5000,
      keepPreviousData: true,
      staleTime: 30000,
   });
   if (businessOwnerDataIsLoading)
      return <h1>Loading.......</h1>

   if (businessOwnerData)
      return (
         <Box>
            <BackArrow />
               <Flex flexDirection={{ xssToXmm: "column" }} padding={4} mdDown={{ padding: 2 }} gap={2} >

                  <Flex justifyContent={{ xssToXmm: "center" }} paddingTop={"5px"}>
                     <ProfileImage />
                  </Flex>

                  <Box marginLeft={{xmTo2xl:"13px"}} padding={0}>
                     <ProfileHeadInfo data={businessOwnerData} />
                  </Box>
               </Flex>
            <Box>
               <BusinessOwnerProfileTabs businessOwnerData={businessOwnerData} />
            </Box>
         </Box>
      );
};

export default BusinessOwnerProfileContent;
