import { Box, Flex, Span, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import PageHeadTitle from '../../../../components/shared/PageHeadTitle'
import { useNavigate } from 'react-router-dom';
import useThemedColors from '../../../../hooks/useThemedColors';
import { getFinishedWorkReasons } from '../../../../api/services/getServicesRelatedData';
import FisinshReasonsSelectBox from '../../../../components/shared/forms/services/FinishReasonsSelectBox';
import { Controller, useForm } from 'react-hook-form';
import { RetirementSchema, RetirementSchemaFormData } from '../../../../utils/retirementSchema';

import {  getEmployeeToRetireByInsuranceNumber } from '../../../../api/employees/getEmployeeByInsuranceNumber';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from '../../../../lib/capitalize';
import FieldGroup from '../../../../components/shared/forms/FieldGroup';
import SkeletonLoader from '../../../../components/shared/Skeleton';
import { useMutation } from '@tanstack/react-query';
import { host } from '../../../../constants/connection';
import toast from 'react-hot-toast';

const AddRetirementPageContent = () => {
  
   const navigate = useNavigate();
   
   const [employeeName ,setEmployeeName] = useState("");
   const [employee ,setEmployee] = useState({});
   
   const {textPrimary, textSecondary, btnGreen, btnPrimary} = useThemedColors();
   
   const {reasonsData, isSuccessReasonsData, isLoadingReasonsData} = getFinishedWorkReasons();
   
   const handleViewEmployeedName = async (val) => {
      let isEmployee = false;
      const employee = await getEmployeeToRetireByInsuranceNumber(val);
      
      if(employee)  {
         
         console.log("employee in handleViewEmployeedName :",employee);
       setEmployeeName(`${capitalize(employee?.first_name)} ${capitalize(employee?.father_name)} ${capitalize(employee?.last_name)}`);
       
       setEmployee(employee);
       
      //  setValue( "employeeID" , employee?.emp_id);
       // console.log("person?.personal_info_id :",person?.personal_info_id)
 
       isEmployee = true;
      }
      else {
          setEmployeeName("");
          setEmployee({});
      }
         return isEmployee ;
   }
   
   
   const serviceSchema = RetirementSchema({handleViewEmployeedName});

   const {
      register,
      handleSubmit ,
      watch ,
      setValue,
      getValues,
      setError ,
      clearErrors ,
      formState : {errors, isDirty},
      control ,
      trigger
   } = useForm<RetirementSchemaFormData>({
      resolver : zodResolver(serviceSchema) ,
      defaultValues : {
         finishReason : "age"
      },
      mode:'all'
   });
   
   const saveRetirement = useMutation({
      mutationFn : (retirement) => fetch(`${host}/retirement/create-retirement`,{method:'POST', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify({employeeID:employee?.emp_id , reason:retirement?.finishReason})}).then(res => res.json()) ,
      
      onError : (error) => {
         console.log("error occured ! :",error)
      },
      onSuccess: (response) => {
         if(response.status == 404 || response.status == 400){
            
            toast.error("somethng went wrong")
         } else if(response.status == 200) {
            console.log("response.data :",response?.retirement_id);
            navigate("/dashboard/retirements/new/extending", {state : {employee : employee, retirementID:response?.retirement_id}});
            // setTimeout(() => {
            //    toast.success('Business Added Successfuly !');
            // }, 1000);
         }
      },
   });
   
   const handleSaveRetirement = (data) => {
      console.log("data to save retirement :",data);
      // saveBusiness.mutate({...data, lawInitiativeDate: new Date(data.lawInitiativeDate.toISOString())});
      saveRetirement.mutate(data);
   }
   
   
//??======================Presentation=========================
   if(reasonsData && isSuccessReasonsData && !isLoadingReasonsData) {
      return (
      
         <Flex flexDirection={'column'} maxHeight={'100vh'} overflowY={'scroll'}>
            <Box width={"100%"}>
               <PageHeadTitle 
                  title={<Text fontSize={30}>New Retirement Profile</Text>}
                  backButton={true} 
               />
            </Box>
            
            <Box>
               <Flex flexDirection={'row'}  fontSize={'16px'}>
                  <Span marginRight={1} >employee :</Span>
                  <Text className='btn' 
                     // _hover={{color : "#F00"}}
                     fontSize={'16px'} 
                     fontWeight={"500"} 
                     color={btnGreen} 
                     onClick={()=> navigate(`/profile/${employee?.personal_informations?.personal_info_id}`)}
                  >
                      {employeeName} 
                  </Text> 
               </Flex>
               
            </Box>
            
            {/* main input fields container */}
            <Flex flexDirection={"column"} justifyContent={'space-between'} alignItems={'center'} marginBottom={3} marginTop={5}>
               
               <Box width={"50%"} marginBottom={3}>
                  <FieldGroup 
                  onchangeValue={null}
                  register = {register}
                  name={'employeeInsuranceNumber'}
                  type={'number'}
                  invalid = {false} 
                  label = "employee insurance number" 
                  placeholder = ""
                  error = {errors.employeeInsuranceNumber}
                  preInputText={null}
                  
                  // onchangeValue={onChangeBusinessOwner}
                  // disabled={props?.disabledFields?.includes('bOwnerInsuranceNumber') ? true : false}
               />
               </Box>
            
            { (reasonsData && isSuccessReasonsData && !isLoadingReasonsData)
            ?
               <Box width={"50%"} marginBottom={3} >
                     <FisinshReasonsSelectBox 
                     data={reasonsData?.data}
                     label="finish reason" 
                     Controller={Controller}
                     control={control}
                     error={errors.finishReason}
                     defaultValue={"age"}
                     disabled={false}
                  />
               </Box>
            : <>Loading..</>
            }
            </Flex>
            
            <Flex flexDirection={'row'} justifyContent={'end'} width={'100%'} marginTop={5}>
               
               <Box  paddingX={3} paddingY={1} borderRadius={5} marginRight={3} className='btn' onClick={()=> navigate(-1)} borderWidth={1} borderColor={textSecondary}>
                  <Text fontSize={16} color={textSecondary}>Cancel</Text>
               </Box>
               {/* handleSubmit */}
               <Box backgroundColor={btnPrimary} paddingX={3} paddingY={1} borderRadius={5} marginRight={3} borderWidth={1} borderColor={btnPrimary} className='btn' 
               onClick={handleSubmit(handleSaveRetirement)}>
                  <Text fontSize={16} color={"#fff"}>Next</Text>
               </Box>
            </Flex>
         </Flex>
         
      );
   } else {
      return (
         <VStack justifyContent={'center'} height={'50vh'}>
            <SkeletonLoader width='60%'/>
            <SkeletonLoader width='50%'/>
            <SkeletonLoader width='60%' />
            <SkeletonLoader width='50%' />
            <SkeletonLoader width='60%' />
            <SkeletonLoader  width='50%' />
         </VStack>
      );
   }
   
}

export default AddRetirementPageContent;

