import { Box, VStack } from '@chakra-ui/react';
import React from 'react'
import SkeletonLoader from '../../components/shared/Skeleton';
import { useQuery } from '@tanstack/react-query';
import { host } from '../../constants/connection';
import BackArrow from '../../components/shared/BackArrow';
import ProfileUpperSection from '../../components/shared/profile/personal/ProfileUpperSection';
import ProfileTabs from '../../components/shared/profile/personal/ProfileTabs';
import { useCustomQuery } from '../../hooks/useCustomQuery';

const ProfileContent = ({personId}) => {
   
      
      // const {
      //    data: personRules,
      //    error: personRulesError,
      //    isLoading: personRulesIsLoading,
      // } = useQuery({
      //    queryKey: ["view-person-profile-rules", personId],
      //    queryFn: () =>
      //       fetch(
      //          `${host}/personalInformations/getPersonRules/personId?personId=${personId}`
      //       ).then((res) => res.json()),
      //    refetchInterval: 5000,
      //    keepPreviousData: true,
      //    staleTime: 30000,
      // });
      
      const { 
         data:personRules, 
         error:personRulesError, 
         isLoading :personRulesIsLoading
      } = useCustomQuery(
         ["view-person-profile-rules", personId] ,
         `${host}/personalInformations/getPersonRules/personId?personId=${personId}`
      );
   
      // const {
      //    data: personData,
      //    error: personDataError,
      //    isLoading: personDataIsLoading,
      // } = useQuery({
      //    queryKey: ["person-about-data", personId],
      //    queryFn: () =>
      //       fetch(
      //          `${host}/personalInformations/get/id?id=${personId}`
      //       ).then((res) => res.json()),
      //    refetchInterval: 5000,
      //    keepPreviousData: true,
      //    staleTime: 30000,
      // });
      
      const { 
         data:personData, 
         error:personDataError, 
         isLoading :personDataIsLoading
      } = useCustomQuery(
         ["person-about-data", personId] ,
         `${host}/personalInformations/get/id?id=${personId}`
      );
   
  if(personRulesIsLoading) {
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
  }
  else if(personRules && personData && !personRulesError) {
      return (
         <Box>
            <BackArrow />
            <ProfileUpperSection personData={personData?.person} personRules = {personRules.rules} />
            <ProfileTabs personData={personData?.person} personRules = {personRules.rules} />
         </Box>
      )
  }
}

export default ProfileContent