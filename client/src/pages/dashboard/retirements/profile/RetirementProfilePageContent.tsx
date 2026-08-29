import { Box, Flex, HStack, Span, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import PageHeadTitle from '../../../../components/shared/PageHeadTitle';
import useThemedColors from '../../../../hooks/useThemedColors';
import { FaDollarSign, FaUser } from 'react-icons/fa';
import FixBottomArea from '../../../../components/shared/FixBottomArea';
import { useCustomQuery } from '../../../../hooks/useCustomQuery';
import { host } from '../../../../constants/connection';
import SkeletonLoader from '../../../../components/shared/Skeleton';
import Error from '../../../../components/shared/Error';
import { capitalize } from '../../../../lib/capitalize';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//!    backgroundColor={"#876"} 

const RetirementProfilePageContent = ({retirementID}) => {
   
   
   const navigate = useNavigate();
   const {t} = useTranslation();
   const { 
         data:retirementData, 
         error:retirementDataError, 
         isLoading :retirementDataIsLoading
      } = useCustomQuery(
         ["retirement-profile", retirementID] ,
         `${host}/retirement/get/id?id=${retirementID}`
      );
      
   console.log("data ::",retirementData);
   const {textSecondary, borderSecondary, budgetText, iconGray, btnGreen,textPrimary} = useThemedColors();
   
   if(retirementDataIsLoading) {
      <VStack justifyContent={'center'} height={'50vh'}>
         <SkeletonLoader width='60%'/>
         <SkeletonLoader width='50%'/>
         <SkeletonLoader width='60%' />
         <SkeletonLoader width='50%' />
         <SkeletonLoader width='60%' />
         <SkeletonLoader  width='50%' />
      </VStack>
   }
   else if(retirementDataError) {
      return (
          <Error message={"Error"} />
      )
   }
   else if(retirementData && retirementData?.length > 0) {
      return (

         <Flex flexDirection={'column'} maxHeight={'100vh'} overflowY={'scroll'}>
              <PageHeadTitle 
                 backButton={true}
                 title={t("RetirementProfile")}
              />
              {/* control */}
              <Flex 
                 flexDirection={'row'} 
                 // backgroundColor={"#876"} 
                 justifyContent={'space-between'}
                 paddingX={4}
                 marginBottom={6}
                
              >
                 <Flex 
                    alignItems={'center'} 
                  //   backgroundColor={"#876"} 
                    paddingX={2} 
                    className='btn'
                    borderBottomWidth = {1}
                    borderBottomColor={'transparent'} 
                    transition={'.2s ease'}
                    _hover={{borderBottomColor:textPrimary}}
                    onClick={()=>navigate(`/profile/${retirementData[0]?.Retirement?.Employees?.personal_info_id}`)}
                 >
                    <Text 
                       color={textSecondary}
                       fontSize={'16px'}
                       
                    >
                       <FaUser />
                    </Text>
                    <Text
                       color={textSecondary}
                       fontSize={'20px'}
                       marginLeft={1}
                    >
                      {`${capitalize(retirementData[0]?.Retirement?.Employees?.personal_informations?.first_name)} ${capitalize(retirementData[0]?.Retirement?.Employees?.personal_informations?.father_name)} ${capitalize(retirementData[0]?.Retirement?.Employees?.personal_informations?.last_name)}`
                      
                      }
                    </Text>
                 </Flex>
                 
                 
                 <Span 
                    backgroundColor={btnGreen} 
                    color={"#eee"} 
                    paddingX={2}
                    paddingY={'1px'}
                    borderRadius={"8px"}
                    className='btn'
                    onClick={()=>navigate(`/dashboard/retirements/${retirementID}/edit`)}
                 >
                    <Text>
                       {t("edit")}
                    </Text>
                 </Span>
                 
              </Flex>
     
              {/*//todo================================================= */}
              
              <Flex width={'100%'}>
                 <Flex flexDirection={'column'} width={'80%'} justifyContent={'space-between'} alignItems={'start'} gapY={5}>
                    {/* left-1- */}
                    <Flex 
                       flexDirection={'column'} 
                       // alignItems={'center'}
                       borderWidth={1}
                       borderColor={borderSecondary}
                       paddingX={4}
                       borderRadius={'8px'}
                       
                    >
                       <Text
                          fontSize={"22px"}
                          fontWeight={500}
                          color={textSecondary}
                          letterSpacing={"1px"}
                          
                       >
                          {t("theSalary")}
                       </Text>
                       
                       <Flex  justifyContent={'start'} alignItems={'center'}>
                         <Text
                            color={iconGray}
                            fontSize={{xssToXmm:"16px", xmmTo3xl:"20px"}}
                         >
                            <FaDollarSign />
                         </Text>
                          <Text
                             fontSize={"18px"}
                             fontWeight={500}
                             color={budgetText}
                          >
                             { retirementData[0]?.salary_amount}
                          </Text>
                       </Flex>
                    </Flex>
                    
                    {/* left-2- */}
                    <Flex 
                       flexDirection={'column'} 
                       // alignItems={'center'}
                       borderWidth={1}
                       borderColor={borderSecondary}
                       paddingX={4}
                       borderRadius={'8px'}
                       
                    >
                       <Text
                          fontSize={"22px"}
                          fontWeight={500}
                          color={textSecondary}
                          letterSpacing={"1px"}
                          
                       >
                          {t("theAccumulations")}
                       </Text>
                       
                       <Flex  justifyContent={'start'} alignItems={'center'}>
                         <Text
                            color={iconGray}
                            fontSize={{xssToXmm:"16px", xmmTo3xl:"20px"}}
                         >
                            <FaDollarSign />
                         </Text>
                          <Text
                             fontSize={"18px"}
                             fontWeight={500}
                             color={budgetText}
                          >
                             {retirementData[0]?.Retirement?.Retirements_Accumulations[0]?.amount}
                          </Text>
                       </Flex>
                    </Flex>
                    
                    {/* left-3- */}
                    <Flex 
                       flexDirection={'column'} 
                       // alignItems={'center'}
                       borderWidth={1}
                       borderColor={borderSecondary}
                       paddingX={4}
                       borderRadius={'8px'}
                       
                    >
                       <Text
                          fontSize={"22px"}
                          fontWeight={500}
                          color={textSecondary}
                          letterSpacing={"1px"}
                          
                       >
                          {t("theIndemnification")}
                       </Text>
                       
                       <Flex  justifyContent={'start'} alignItems={'center'}>
                         <Text
                            color={iconGray}
                            fontSize={{xssToXmm:"16px", xmmTo3xl:"20px"}}
                         >
                            <FaDollarSign />
                         </Text>
                          <Text
                             fontSize={"18px"}
                             fontWeight={500}
                             color={budgetText}
                          >
                             {retirementData[0]?.Retirement?.Retirement_Indemnification[0]?.amount}
                          </Text>
                       </Flex>
                    </Flex>
                 </Flex>
                 <Flex flexDirection={'column'} minWidth={'20%'} justifyContent={'space-between'} alignItems={'center'} gapY={5} >
                    {/* right-1- */}
                    <Flex 
                       flexDirection={'column'} 
                       alignItems={'center'}
                       borderWidth={1}
                       borderColor={borderSecondary}
                       paddingX={4}
                       borderRadius={'8px'}
                       
                    >
                       <Text
                          fontSize={"22px"}
                          fontWeight={500}
                          color={textSecondary}
                          letterSpacing={"1px"}
                          
                       >
                          {t("initDate")}
                       </Text>
                       
                       <Text
                          fontSize={"16px"}
                          fontWeight={500}
                          color={textSecondary} 
                       >
                           {retirementData[0]?.initiate_date}
                       </Text>
                    </Flex>
                    
                    {/* right-2- */}
                    <Flex 
                       flexDirection={'column'} 
                       alignItems={'center'}
                       borderWidth={1}
                       borderColor={borderSecondary}
                       paddingX={4}
                       borderRadius={'8px'}
                       
                    >
                       <Text
                          fontSize={"22px"}
                          fontWeight={500}
                          color={textSecondary}
                          letterSpacing={"1px"}
                          
                       >
                          {t("salaryCenter")}
                       </Text>
                       
                       <Text
                          fontSize={"16px"}
                          fontWeight={500}
                          color={textSecondary}
                       >
                          {retirementData[0]?.receipt_center_number}
                       </Text>
                    </Flex>
                    
                    {/* right-3- */}
                    <Flex
                     flexDirection={'column'} 
                     alignItems={'center'}
                     borderWidth={1}
                     borderColor={borderSecondary}
                     paddingX={4}
                     borderRadius={'8px'}
                    >
                       <Text
                          fontSize={"22px"}
                          fontWeight={500}
                          color={textSecondary}
                          letterSpacing={"1px"}
                       >
                          {t("FamilyFile")}
                       </Text>
                       
                       <Flex 
                       gapX={2}
                       >
                          <Flex  flexDirection={'column'}justifyContent={'start'}  alignItems={'center'} alignContent={'start'} paddingX={2}>
                             <Text 
                                fontSize={"22px"}
                                // fontWeight={500}
                                color={textSecondary}
                                // letterSpacing={"1px"}
                             >
                                {t("theWife")}
                             </Text>
                             
                             <Flex  justifyContent={'start'} alignItems={'center'}>
                               <Text
                                  color={iconGray}
                                  fontSize={{xssToXmm:"16px", xmmTo3xl:"20px"}}
                               >
                                  <FaDollarSign />
                               </Text>
                                <Text
                                   fontSize={"18px"}
                                   fontWeight={500}
                                   color={budgetText}
                                >
                                   {retirementData[0]?.Retirement?.Retirement_Family_File[0]?.wife_share}
                                </Text>
                             </Flex>
                          </Flex>
                          
                          <Flex flexDirection={'column'}justifyContent={'start'}  alignItems={'center'} alignContent={'start'} paddingX={2}>
                             <Text
                                fontSize={"22px"}
                                // fontWeight={500}
                                color={textSecondary}
                                // letterSpacing={"1px"}
                             >
                                {t("theChildren")}
                             </Text>
                             
                             
                             <Flex  justifyContent={'start'} alignItems={'center'}>
                               <Text
                                  color={iconGray}
                                  fontSize={{xssToXmm:"16px", xmmTo3xl:"20px"}}
                               >
                                  <FaDollarSign />
                               </Text>
                                <Text
                                   fontSize={"18px"}
                                   fontWeight={500}
                                   color={budgetText}
                                >
                                   {retirementData[0]?.Retirement?.Retirement_Family_File[0]?.children_share}
                                </Text>
                             </Flex>
                          </Flex>
                       </Flex>
                       
                    </Flex>
                 </Flex>
              </Flex>
              
              <FixBottomArea />
              <FixBottomArea />
         </Flex>
       )
   }
  
}

export default RetirementProfilePageContent;