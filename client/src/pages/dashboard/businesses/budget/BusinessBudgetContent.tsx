import { Box, Flex, Portal, VStack } from "@chakra-ui/react"
import BackArrow from "../../../../components/shared/BackArrow";
import { useLocation, useParams } from "react-router-dom";
import useThemedColors from "../../../../hooks/useThemedColors";
import PageHeadTitle from "../../../../components/shared/PageHeadTitle";
import { useQuery } from "@tanstack/react-query";
import { host } from "../../../../constants/connection";
import SkeletonLoader from "../../../../components/shared/Skeleton";

const BusinessBudgetContent = () => {
   const params = useParams();
   // const location = useLocation();
   const {textSecondary} = useThemedColors();
   
   const {
      data: businessData,
      error: businessDataError,
      isLoading: businessDataIsLoading,
   } = useQuery({
      queryKey: ["business-budget", params?.id] ,
      queryFn: () =>
         fetch(
            `${host}/business/get-budget?id=${params?.id}`
         ).then((res) => res.json()),
      refetchInterval: 5000,
      keepPreviousData: true,
      staleTime: 30000,
   });
   
   if(!businessData && businessDataIsLoading) {
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
  return (
    <Flex
       flexDirection={'column'}
    >
      <PageHeadTitle 
         title={"fgfg"}
         backButton={true}
      />
    </Flex>
  )
}

export default BusinessBudgetContent;