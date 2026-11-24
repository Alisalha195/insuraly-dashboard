import { Box,  Flex, Icon, Span, Text } from '@chakra-ui/react';
import React from 'react'
import PageHeadTitle from '@/components/shared/PageHeadTitle';
import useThemedColors from '@/hooks/useThemedColors';
import Card from '@/components/ui/Card/Card';
import { useNavigate } from 'react-router-dom';
import { getAnnualRetirementsCount } from '@/api/retirements/getAnnualRetirementsCount';
import { getMonthlyRetirementsCount } from '@/api/retirements/getMonthlylRetirementsCount';
import { LuSearch } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import { capitalize } from '@/lib/capitalize';

const RetirementsPageContent = () => {
   
   const navigate = useNavigate();
   const {btnGreen} = useThemedColors();
   const thisDate = new Date(Date.now());
   
   const {t} = useTranslation();
   
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
    <Flex flexDirection={'column'} overflowY={'auto'} >
    
      <PageHeadTitle 
         title={<Text fontSize={30}>{capitalize(t("retirements"))}</Text>}
         backButton={true} 
      />
      
      <Box marginBottom={4}>
         
          <Flex flexDirection={'row'} justifyContent={'end'} paddingY={0} paddingX={5} >
            
            <Flex onClick={() => navigate("/dashboard/retirements/search")} alignItems={'center'} marginRight={4} paddingX={1}>
               <Icon
                    fontSize={{ xssToXs: "16px", xsToXm: "18px", xmToSm: "20px" }}
                 >
                    <LuSearch
                       className='btn'
                    />
                 </Icon>
            </Flex>
              
           <Flex>
               <Span 
               className='btn' 
               
               color={btnGreen} 
               width={"auto"} 
               paddingX={"8px"} 
               paddingY={"3px"}
               fontSize={{ baseToXs: "10px", xsToXm: "12px", xmToSm: "16px", smTo3xl:"22px" }}
               onClick={()=> navigate("/dashboard/retirements/new")}
               >{capitalize(t("newRetirementProfile"))}</Span>
            </Flex>
         </Flex>
      </Box>
      {/* <div> */}
      <Flex
         // width={"100%"}
         flexGrow={1}
         justifyContent={"space-around"}
         alignItems={"center"}
         gap={{ baseToXs: "6px", xsToXm: "18px", xmToSm: "20px", smTo3xl : "60px" }}   
         flexDirection={{baseToXmm: "column", xmmTo3xl:'row'}}
         overflowY={"auto"}
         // height={'auto'}
         
         pt={{baseToXmm: 2, xmmTo3xl:10}}
         pb={{baseToXmm: 2, xmmTo3xl:10}}
         pe={{baseToXmm: 3, xmmTo3xl:10}}
         ps={{baseToXmm: 4, xmmTo3xl:11}}
         
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
            //  width={'auto'}
            
         >
            <Card.CardHeader>
               <Text textAlign={'center'} marginBottom={2} 
               fontSize={{xssToXmm:"18px", xmmToMd:"22px", mdTo3xl:"26px"}} 
               >
                  {t("thisYear")}
               </Text>
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
                              flexDirection={"row"}
                              key={index}
                              alignItems={'end'}
                              justifyContent={'space-between'}
                              width={"100%"}
                              gap={{xssToXmm:6, xmmToMd:8, mdTo3xl:10}} 
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
                              
                              <Box fontSize={{xssToXmm:"18px", xmmToMd:"22px", mdTo3xl:"26px"}}  >{t(item?.label)}</Box>
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
               <Text textAlign={'center'} marginBottom={2} fontSize={{xssToXmm:"18px", xmmToMd:"22px", mdTo3xl:"26px"}} >{t("thisMonth")}</Text>
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
                              flexDirection={"row"}
                              key={index}
                              alignItems={'end'}
                              justifyContent={'space-between'}
                              width={"100%"}
                              gap={{xssToXmm:6, xmmToMd:8, mdTo3xl:10}} 
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
                              
                              <Box fontSize={{xssToXmm:"18px", xmmToMd:"22px", mdTo3xl:"26px"}} >{t(item?.label)}</Box>
                              <Box fontSize={"18px"} >{item?.value}</Box>
                           </Flex>
                           
                        </Card.CardRow>
                     ))
                  }

               </Flex>
            </Card.CardContent>
         </Card>
         
      </Flex>
      {/* </div> */}
         
      
    </Flex>
  )
}

export default RetirementsPageContent;