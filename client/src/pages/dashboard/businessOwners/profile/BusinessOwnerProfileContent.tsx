import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query';
import { useParams} from 'react-router-dom';
import BackArrow from '../../../../components/shared/BackArrow';
import ProfileImage from '../../../../components/shared/profile/ProfileImage';
import useThemedColors from '../../../../hooks/useThemedColors';
import BusinessOwnerProfileTabs from '../../../../components/shared/profile/businessOwner/BusinessOwnerProfileTabs';

import { capitalize } from '../../../../lib/Capitalize.ts';
const BusinessOwnerProfileContent = () => {
   
   const {textPrimary , textSecondary, textEmail} = useThemedColors();
   const params = useParams()
   const {data:businessOwnerData, 
      error:businessOwnerDataError, 
      isLoading:businessOwnerDataIsLoading, 
      } = useQuery({ 
         queryKey: ['business-owner', params?.id ], 
         queryFn: () => fetch(`http://localhost:5000/businessOwners/get/id?id=${params?.id}`).then(res =>  res.json()),
            refetchInterval : 5000,
            keepPreviousData: true ,
            staleTime : 30000,
   });
  if(businessOwnerData)
  return (
    <Box>
      <BackArrow />
      <Flex padding={4} mdDown={{padding:2}} gap={2}>
         <Box>
            <Flex flexDirection={'column'}>
               <ProfileImage />
            </Flex>
         </Box>
         
         <Box>
            <Flex flexDirection={'column'}>
               <Heading size={{smTo2xl:"2xl",smDown:"xl"}} color={textPrimary}>
                  {`${capitalize(businessOwnerData?.personal_informations?.first_name)} ${capitalize(businessOwnerData?.personal_informations?.last_name)}`}
               </Heading>
               <Text textStyle="sm" color={textEmail}>
                  {businessOwnerData?.personal_informations?.email}
               </Text>
               <Text textStyle="sm" color={textEmail}>
               {businessOwnerData?.personal_informations?.phone_number}
               </Text>
            </Flex>
         </Box>
         
      </Flex>
      <Box>
         <BusinessOwnerProfileTabs businessOwnerData = {businessOwnerData}/>
      </Box>
    </Box>
  )
}

export default BusinessOwnerProfileContent
