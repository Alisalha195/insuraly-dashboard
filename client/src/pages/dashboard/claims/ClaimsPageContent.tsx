import { Box, Center, Flex, Text, VStack } from '@chakra-ui/react'
import PageHeadTitle from '../../../components/shared/PageHeadTitle'
import DataTable from '../../../components/shared/tables/DataTable'
import DataTableControl from '../../../components/shared/tables/DataTableControl'
import TableHeader from '../../../components/shared/tables/TableHeader'
import { monthlyClaimsTableHeaderData } from '../../../components/dashboard/content/baseContent/tables/claims/monthly/monthlyClaimsTableHeaderData'
import MonthlyClaimsTableBody from '../../../components/dashboard/content/baseContent/tables/claims/monthly/MonthlyClaimsTableBody'
import Card from '../../../components/ui/Card/Card'
import { useNavigate } from 'react-router-dom'
import useThemedColors from '../../../hooks/useThemedColors'
import { useCustomQuery } from '../../../hooks/useCustomQuery'
import { host } from '../../../constants/connection'
import SkeletonLoader from '../../../components/shared/Skeleton'
import BackArrow from '../../../components/shared/BackArrow'
import Error from '../../../components/shared/Error'

const ClaimsPageContent = () => {
   
   const thisDate = new Date(Date.now());
   const navigate = useNavigate();
   const {btnSecondary, btnGreen} = useThemedColors();
   const date = new Date();
   const seconds = date.getMilliseconds();
   
   const { 
         data:claimsStats, 
         error:claimsStatsError, 
         isSuccess:claimsStatsSuccess ,
         isLoading :claimsStatsIsLoading
      } = useCustomQuery(
         [`stats_claims`] ,
         `${host}/claims/getClaimsStats?month=${thisDate.getMonth()+1}&year=${thisDate.getFullYear()}`
      );
      
      console.log("data::",claimsStats)
   if(claimsStats && claimsStats?.annualStats?.length > 0) {
      
   
     return (
       <Box
       width={'100%'}
       >
         <PageHeadTitle 
            title='Claims'
            backButton={true} 
         />
            <VStack >
               <Flex
                  width={'100%'}
                  justifyContent={'end'}
                  // backgroundColor={"#478"}
                  paddingRight={"40px"}
               >
                  <Box
                     className='btn'
                     backgroundColor={btnGreen}
                     paddingX={2}
                     // paddingY={1}
                     paddingBottom={1}
                     borderRadius={'7px'}
                     // lineHeight={1}
                     color={'#fff'}
                  >
                     create
                     
                  </Box>
               </Flex>
               <Flex
                  width={'100%'}
                  // justifyContent={'space-around'}
                  justifyContent={'center'}
                  gap={9}
               >
                  

                  {/* This Year */}
                  <Card  
                      paddingX={6}
                      paddingY={2}
                      flexDirection={'column'}
                      alignItems={'center'}
                      borderRadius={'8px'}
                      boxShadow={'0px 1px 4px rgba(0, 0, 0, 0.25)'}
                     //  backgroundColor={"#333"}
                      borderWidth={2} 
                      borderColor={"#222"}
                      className='btn'
                      _hover={{borderColor:"#f50"}}
                      transition={'all 0.2s ease-in-out'}
                      onClick={() => {
                         navigate(`/dashboard/claims/annual/${thisDate.getFullYear()}`)
                      }}
                  >
                     <Card.CardHeader>
                        <Text textAlign={'center'} marginBottom={2}>this year</Text>
                     </Card.CardHeader>
                     <Card.CardContent>
                        <Flex 
                           // backgroundColor={'#555'}
                           // padding={'10px'}
                           gap={1}
                           justifyContent={'space-between'}
                           flexDirection={"column"}
                        >
                           <Card.CardBadge >
                              <Text fontSize={"14px"}>Count</Text>
                              <Text>{claimsStats?.annualStatsCount || 0}</Text>
                              
                           </Card.CardBadge>
                           
                           <Card.CardBadge >
                              <Text fontSize={"14px"}>total $</Text>
                              <Text>{claimsStats?.annualStatsTotalAmount || 0}</Text>
                           </Card.CardBadge>
                           
                        </Flex>
                        

                     </Card.CardContent>
                  </Card>
                  {/* this month */}
                  <Card
                     padding={2}
                     flexDirection={'column'}
                     alignItems={'center'}
                     borderRadius={'8px'}
                     boxShadow={'0px 1px 4px rgba(0, 0, 0, 0.25)'}
                     // backgroundColor={"#333"}
                     borderWidth={2} 
                     borderColor={"#222"}
                     className='btn'
                     _hover={{borderColor:"#f50"}}
                     transition={'all 0.2s ease-in-out'}
                     onClick={() => {
                        navigate(`/dashboard/claims/monthly/${thisDate.getFullYear()}/${thisDate.getMonth()+1}`)
                     }}
                  >
                     <Card.CardHeader>
                        <Text textAlign={'center'} marginBottom={2}>this month</Text>
                     </Card.CardHeader>
                     <Card.CardContent>
                        <Flex 
                           // backgroundColor={'#555'}
                           // padding={'10px'}
                           
                           justifyContent={'space-between'}
                           flexDirection={'column'}
                        >
                           <Card.CardBadge >
                              <Text fontSize={"14px"}>Count</Text>
                              <Text>{claimsStats?.monthlyStatsCount || 0}</Text>
                              
                           </Card.CardBadge>
                           
                           <Card.CardBadge >
                              <Text fontSize={"14px"}>collected $</Text>
                              <Text>{claimsStats?.monthlyStatsDeliveredAmount || 0}</Text>
                           </Card.CardBadge>
                           
                        </Flex>
                        
                        <Flex 
                           // backgroundColor={'#555'}
                           // padding={'10px'}
                           gap={1}
                           justifyContent={'space-between'}
                           flexDirection={'column'}
                        >
                           
                           <Card.CardBadge >
                              <Text fontSize={"14px"}>total $</Text>
                              <Text>{claimsStats?.monthlyStatsTotalAmount || 0}</Text>
                           </Card.CardBadge>
                           <Card.CardBadge >
                              <Text fontSize={"14px"}>ends in</Text>
                              <Text>15/5/2026</Text>
                           </Card.CardBadge>
                           
                        </Flex>
                     </Card.CardContent>
                  </Card>
                  
                  {/* Retarded */}
                  <Card
                     
                     paddingY={2}
                     flexDirection={'column'}
                     // alignItems={'center'}
                     borderRadius={'8px'}
                     boxShadow={'0px 1px 4px rgba(0, 0, 0, 0.25)'}
                     // backgroundColor={"#333"}
                     borderWidth={2} 
                     borderColor={"#222"}
                     className='btn'
                     _hover={{borderColor:"#f50"}}
                     transition={'all 0.2s ease-in-out'}
                     onClick={() => {
                        navigate('/dashboard/claims/retarded')
                     }}
                  >
                     <Card.CardHeader>
                        <Text textAlign={'center'}marginBottom={2}>retarded</Text>
                     </Card.CardHeader>
                     <Card.CardContent
                        // backgroundColor={'#222'}
                        paddingX={6}
                        // gap={1}
                     >
                        <Flex 
                           // backgroundColor={'#555'}
                           // padding={'10px'}
                           gap={1}
                           justifyContent={'space-between'}
                           flexDirection={"column"}
                        >
                           <Card.CardBadge >
                              <Text fontSize={"14px"}>Count</Text>
                              <Text>{claimsStats?.retardedStatsCount || 0}</Text>
                              
                           </Card.CardBadge>
                           
                           <Card.CardBadge >
                              <Text fontSize={"14px"}>total $</Text>
                              <Text>{claimsStats?.retardedStatsTotalAmount || 0}</Text>
                           </Card.CardBadge>
                           
                        </Flex>
                        

                     </Card.CardContent>
                     {/* <Text
                        backgroundColor={'#222'}
                     >
                        more
                     </Text> */}
                  </Card>
               </Flex>
               
            </VStack>
       </Box>
     )
   } else if (claimsStatsIsLoading) {
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
   } else if(claimsStats?.annualStats?.length < 1) {
      return (
         <Center 
            width={"100%"}
            height={"100vh"}
         >
            <VStack>
               <Text>
                  No Data Found ! 
               </Text>
               <Box>
                  <BackArrow />
               </Box>
            </VStack>
         </Center>
      )
         
   }  else if(claimsStatsError) {
      return (
         <Error
            message={"Something Went Wrong !!"}
         />
      )
   }
}
export default ClaimsPageContent