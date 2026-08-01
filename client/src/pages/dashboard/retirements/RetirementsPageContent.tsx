import { Box,  Flex, Span, Text } from '@chakra-ui/react';
import React from 'react'
import PageHeadTitle from '../../../components/shared/PageHeadTitle';
import useThemedColors from '../../../hooks/useThemedColors';
import Card from '../../../components/ui/Card/Card';
import { useNavigate } from 'react-router-dom';
import { getAnnualRetirementsCount } from '../../../api/retirements/getAnnualRetirementsCount';
import { getMonthlyRetirementsCount } from '../../../api/retirements/getMonthlylRetirementsCount';

const RetirementsPageContent = () => {
   
   const navigate = useNavigate();
   const {btnGreen} = useThemedColors();
   const thisDate = new Date(Date.now());
   
   const thisYearData = [
      { label: 'Age', value: getAnnualRetirementsCount(thisDate.getFullYear(), "age"), type: 'age' },
      { label: 'Death', value: getAnnualRetirementsCount(thisDate.getFullYear(), "death"), type: 'death' },
      { label: 'Other', value: getAnnualRetirementsCount(thisDate.getFullYear(), "other") , type: 'other'},
   ];
   
   const thisMonthData = [
      { label: 'Age', value: getMonthlyRetirementsCount(thisDate.getFullYear(),thisDate.getMonth()+1 , "age") , type: 'age'},
      { label: 'Death', value: getMonthlyRetirementsCount(thisDate.getFullYear(),thisDate.getMonth()+1 , "death") ,  type: 'death'},
      { label: 'Other', value: getMonthlyRetirementsCount(thisDate.getFullYear(),thisDate.getMonth()+1 , "other") , type: 'other' },
   ];
   
  return (
    <Box width={"100%"}>
      <PageHeadTitle 
         title={<Text fontSize={30}>Retirements</Text>}
         backButton={true} 
      />
      
      <Box>
         <Flex width={"100%"} justifyContent={"end"} paddingX={"40px"}>
            <Span className='btn' color={btnGreen} width={"auto"} paddingX={"8px"} paddingY={"3px"}>New Retirement Profile</Span>
         </Flex>
      </Box>
      
      <Flex
         width={"100%"}
         justifyContent={"center"}
         gap={"100px"}
      >
         
         {/* This Year */}
         <Card  
             paddingX={4}
             paddingY={2}
             flexDirection={'column'}
             alignItems={'center'}
             borderRadius={'8px'}
             boxShadow={'0px 1px 4px rgba(0, 0, 0, 0.25)'}
            //  backgroundColor={"#333"}
             borderWidth={2} 
             borderColor={"#222"}
            //  className='btn'
             _hover={{borderColor:"#f50"}}
             transition={'all 0.2s ease-in-out'}
            
         >
            <Card.CardHeader>
               <Text textAlign={'center'} marginBottom={2}>this year</Text>
            </Card.CardHeader>
            <Card.CardContent>
               <Flex 
                  // backgroundColor={'#555'}
                  // padding={'10px'}
                  gap={3}
                  justifyContent={'space-between'}
                  flexDirection={"column"}
               >
                  
                  {
                     thisYearData.map((item, index) => (
                        <Card.CardRow >
                           <Flex  
                              // backgroundColor={'#555'}
                              // padding={'10px'}
                              key={index}
                              alignItems={'end'}
                              justifyContent={'space-between'}
                              width={"100%"}
                              gap={10}
                              paddingX={"6px"}
                              paddingY={"2px"}
                              borderRadius={'6px'}
                              className='btn'
                              borderColor={"#444"}
                              borderWidth={1}
                              _hover={{ color:"#f50", borderColor:"#f50"}}
                              // gap={2}  
                              onClick={()=> navigate(`/dashboard/retirements/annual/${item?.type}/${thisDate.getFullYear()}`) }
                           >
                              
                              <Box fontSize={"22px"} >{item?.label}</Box>
                              <Box fontSize={"18px"} >{item?.value}</Box>
                           </Flex>
                           
                        </Card.CardRow>
                     ))
                  }

               </Flex>
            </Card.CardContent>
         </Card>
         
         {/* This Month */}
         <Card  
             paddingX={4}
             paddingY={2}
             flexDirection={'column'}
             alignItems={'center'}
             borderRadius={'8px'}
             boxShadow={'0px 1px 4px rgba(0, 0, 0, 0.25)'}
            //  backgroundColor={"#333"}
             borderWidth={2} 
             borderColor={"#222"}
            //  className='btn'
             _hover={{borderColor:"#50f"}}
             transition={'all 0.2s ease-in-out'}
             
         >
            <Card.CardHeader>
               <Text textAlign={'center'} marginBottom={2}>this Month</Text>
            </Card.CardHeader>
            <Card.CardContent>
               <Flex 
                  // backgroundColor={'#555'}
                  // padding={'10px'}
                  gap={3}
                  justifyContent={'space-between'}
                  flexDirection={"column"}
               >
                  
                  {
                     thisMonthData.map((item, index) => (
                        <Card.CardRow >
                           <Flex  
                              // backgroundColor={'#999'}
                              // padding={'10px'}
                              key={index}
                              alignItems={'end'}
                              justifyContent={'space-between'}
                              width={"100%"}
                              gap={10}
                              paddingX={"6px"}
                              paddingY={"2px"}
                              borderWidth={1}
                              borderColor={"#444"}
                              borderRadius={'6px'}
                              className='btn'
                              _hover={{ color:"#50f", borderColor:"#50f"}}
                              // gap={2}  
                              onClick={()=> navigate(`/dashboard/retirements/monthly/${item?.type}/${thisDate.getFullYear()}/${thisDate.getMonth()+1}`) }
                           >
                              
                              <Box fontSize={"22px"} >{item?.label}</Box>
                              <Box fontSize={"18px"} >{item?.value}</Box>
                           </Flex>
                           
                        </Card.CardRow>
                     ))
                  }

               </Flex>
            </Card.CardContent>
         </Card>
         
      </Flex>
         
      
    </Box>
  )
}

export default RetirementsPageContent;