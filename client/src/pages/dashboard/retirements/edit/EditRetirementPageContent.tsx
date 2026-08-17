import { Box, Center, Flex, Grid, Icon, Span, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import PageHeadTitle from '../../../../components/shared/PageHeadTitle'
import { useNavigate, useParams } from 'react-router-dom';
import useThemedColors from '../../../../hooks/useThemedColors';
import { getFinishedWorkReasons } from '../../../../api/services/getServicesRelatedData';
import FisinshReasonsSelectBox from '../../../../components/shared/forms/services/FinishReasonsSelectBox';
import { Controller, useForm } from 'react-hook-form';
import { EditRetirementSchema, EditRetirementSchemaFormData, RetirementSchema, RetirementSchemaFormData } from '../../../../utils/retirementSchema';

import {  getEmployeeToRetireByInsuranceNumber } from '../../../../api/employees/getEmployeeByInsuranceNumber';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from '../../../../lib/capitalize';
import FieldGroup from '../../../../components/shared/forms/FieldGroup';
import SkeletonLoader from '../../../../components/shared/Skeleton';
import { useMutation } from '@tanstack/react-query';
import { host } from '../../../../constants/connection';
import toast from 'react-hot-toast';
import BackArrow from '../../../../components/shared/BackArrow';
import { FaDollarSign } from 'react-icons/fa';
import { getSalaryReceiptCenters } from '../../../../api/retirements/getSalaryReceiptCenters';
import SalaryReceiptCentersSelectBox from '../../../../components/shared/forms/retirements/SalaryReceiptCentersSelectBox';
import DatePickerField from '../../../../components/shared/forms/DatePickerField';
import FixBottomArea from '../../../../components/shared/FixBottomArea';
import { useCustomQuery } from '../../../../hooks/useCustomQuery';
import { CgProfile } from "react-icons/cg";

const EditRetirementPageContent = () => {
  
   const navigate = useNavigate();
   const params = useParams();
   // console.log('params :',params);
   const [employeeName ,setEmployeeName] = useState("");
   const [employee ,setEmployee] = useState({});
   
   const {textPrimary, textSecondary, btnGreen, btnPrimary,borderSecondary, inputContainerBg, titleTextSecondary} = useThemedColors();
   
   const {reasonsData, isSuccessReasonsData, isLoadingReasonsData, isErrorReasonsData} = getFinishedWorkReasons();
   
   const wifeShareAmount = 3500;
   const childrenShareAmount = 2500;
   
   const {receiptCentersData, isSuccesscReceiptCentersData, isLoadingReceiptCentersData} = getSalaryReceiptCenters();
   
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
   
   

   // data retreving
   const {data , error, isLoading, isSuccess } = useCustomQuery(
      [`retirementInfo-${params?.id}`], 
      `${host}/retirement/get/id?id=${params?.id}`
   );
   
   // .....show retired name......

   useEffect(()=>{
      if(data && data?.length > 0) {
         setEmployeeName(`${capitalize(data[0]?.Retirement?.Employees?.personal_informations?.first_name)} ${capitalize(data[0]?.Retirement?.Employees?.personal_informations?.father_name)} ${capitalize(data[0]?.Retirement?.Employees?.personal_informations?.last_name)}`)
      }
   },[isLoading,isSuccess]);
   
   
   console.log("data in edit :::",data);
   const serviceSchema = EditRetirementSchema({handleViewEmployeedName});

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
   } = useForm<EditRetirementSchemaFormData>({
      resolver : zodResolver(serviceSchema) ,
      values : (data && (data?.length > 0) && (data[0]?.Retirement)) ? {
         salary:data[0]?.salary_amount,
         salaryInitiateDate:new Date(data[0]?.initiate_date) ,
         finishReason : data[0]?.Retirement?.reason ,
         indemnification : data[0]?.Retirement?.Retirement_Indemnification[0]?.amount ,
         accumulations : data[0]?.Retirement?.Retirements_Accumulations[0]?.amount ,
         wifeShare : data[0]?.Retirement?.Retirement_Family_File[0]?.wife_share ,
         childrenShare : data[0]?.Retirement?.Retirement_Family_File[0]?.children_share,
         salaryReceiptCenter : data[0]?.receipt_center_number 
      } : {
         salary: 0,
         salaryInitiateDate: new Date(),
         finishReason :"quite",
         indemnification : 0,
         accumulations : 0,
         wifeShare : 0,
         childrenShare : 0,
         salaryReceiptCenter :'city_1'
      },
      mode:'all'
   });
   
   
   const updateRetirement = useMutation({
      mutationFn : (dataToSave) => fetch(`${host}/retirement/update-retirement`,{method:'POST', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify(dataToSave)}).then(res => res.json()) ,
      
      onError : (error) => {
         console.log("error occured ! :",error);
         toast.error("somethng went wrong");
      },
      onSuccess: (response) => {
         // console.log("response :", response)
         if(!response.executed){
            toast.error("somethng went wrong")
         } else if(response.executed) {
            navigate("/dashboard/retirements/",);
            setTimeout(() => {
               toast.success('Retirement Updated Successfuly !');
            }, 1000);
         }
      },
   });
   
   const handleSaveRetirement = (dataToSave) => {
      // console.log("data to save retirement :",dataToSave);
      // saveBusiness.mutate({...data, lawInitiativeDate: new Date(data.lawInitiativeDate.toISOString())});
      updateRetirement.mutate({...dataToSave, retirementId :params?.id});
   }
   
   
//??======================Presentation=========================
   if(reasonsData && isSuccessReasonsData && !isLoadingReasonsData && data && data?.length > 0) {
      return (
      
         <Flex flexDirection={'column'} maxHeight={'100vh'} overflowY={'scroll'}>
            <Box width={"100%"}>
               <PageHeadTitle 
                  title={<Text fontSize={30}>Edit Retirement Profile</Text>}
                  backButton={true} 
               />
               <Flex >
                  <Flex flexDirection={'column'} justifyContent={'center'}>
                     <CgProfile />
                  </Flex>
                  <Text className='btn' onClick={()=>navigate(`/profile/${data[0]?.Retirement?.Employees?.personal_informations?.personal_info_id}`)} color={btnGreen} paddingX={1}>
                     {employeeName}
                  </Text>
               </Flex>
            </Box>
            
            {/* <Box>
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
               
            </Box> */}
            
            {/* main input fields container */}
            <Flex flexDirection={"row"} justifyContent={'space-between'} alignItems={'center'} marginBottom={3} marginTop={5}>
               
               {/* <Box width={"50%"} marginBottom={3}>
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
               </Box> */}
            
            { (reasonsData && isSuccessReasonsData && !isLoadingReasonsData)
            ?
               <Box width={"45%"} marginBottom={3} >
                     <FisinshReasonsSelectBox 
                     data={reasonsData?.data}
                     label="finish reason" 
                     Controller={Controller}
                     control={control}
                     error={errors.finishReason}
                     defaultValue={data[0]?.Retirement?.reason || "age"}
                     disabled={false}
                  />
               </Box>
            : <>Loading..</>  
            }
            
            {/*----Indemnification  */}
            {/* <Box padding={1} marginY={2} borderWidth={1} borderColor={borderSecondary}
                  paddingBottom={2} backgroundColor={inputContainerBg}> */}
               <Box width={"45%"} marginBottom={3}>
                  
                  <Box width={"100%"}  >
                     <FieldGroup 
                        onchangeValue={null}
                        register = {register}
                        name={'indemnification'}
                        type={'number'}
                        invalid = {false} 
                        label = "indemnification" 
                        placeholder = ""
                        error = {errors.indemnification}
                        preInputText={<FaDollarSign />}
                        
                        // onchangeValue={onChangeBusinessOwner}
                        // disabled={props?.disabledFields?.includes('bOwnerInsuranceNumber') ? true : false}
                     />
                  </Box>
               
            </Box>
            </Flex>
            
            {/* -----Salary------ */}
            <Box  padding={1} marginY={2} borderWidth={1} borderColor={borderSecondary}
                  paddingBottom={2} backgroundColor={inputContainerBg} >
                  <Text marginBottom={4} color={titleTextSecondary}
                     fontSize={{ xssToXs: "16px", xsToXm: "17px", xmToSm: "18px", smToMd: "20px", mdTo3xl: "22px" }}
                  >
                     Salary 
                  </Text>
                  <Grid   
                     className=' ' 
                     templateColumns={{  mdTo2xl:"repeat(2, 1fr)"}}    
                     gapX={{ base:"30px" , md:"80px"}}
                     gapY={{ base:5 , md:"40px"}}
                     
                  >
                     <FieldGroup
                        onchangeValue={null}
                        register={register}
                        name={'salary'}
                        type={'number'}
                        invalid={false}
                        label="salary"
                        placeholder=""
                        error={errors.salary}
                        preInputText={<FaDollarSign />}
                     />
                     
                     <FieldGroup
                        onchangeValue={null}
                        register={register}
                        name={'accumulations'}
                        type={'number'}
                        invalid={false}
                        label="accumulations"
                        placeholder=""
                        error={errors.accumulations}
                        preInputText={<FaDollarSign />}
                     />
                     
                     { (receiptCentersData && isSuccesscReceiptCentersData && !isLoadingReceiptCentersData)
                     ?
                        <Box width={"50%"} marginBottom={3} >
                           <SalaryReceiptCentersSelectBox 
                              data={receiptCentersData?.data}
                              label="receipt center" 
                              Controller={Controller}
                              control={control}
                              error={errors.salaryReceiptCenter}
                              disabled={false}
                              defaultValue={data[0]?.receipt_center_number || "city_1"}
                           />
                        </Box>
                     : <>Loading..</>
                     }
                     
                     <DatePickerField 
                        name={"salaryInitiateDate"}
                        register={register}
                        label="initiate date" 
                        Controller={Controller}
                        control={control}
                        error={errors.salaryInitiateDate}
                     />
                        
                     
                  </Grid>
            </Box>
            
            
            
            {/*----family------  */}
            <Box padding={1} marginY={2} borderWidth={1} borderColor={borderSecondary}
                  paddingBottom={2} backgroundColor={inputContainerBg}>
               
               <Text marginBottom={4} color={titleTextSecondary}
                     fontSize={{ xssToXs: "16px", xsToXm: "17px", xmToSm: "18px", smToMd: "20px", mdTo3xl: "22px" }}
                  >
                  Family Shares
               </Text>
               <Flex flexDirection={"row"} justifyContent={'space-between'} alignItems={'center'} marginBottom={3} marginTop={5} >
                  
                  <Box width={"45%"} marginBottom={3}>
                     <FieldGroup 
                        onchangeValue={null}
                        register = {register}
                        name={'wifeShare'}
                        type={'number'}
                        invalid = {false} 
                        label = "wife share" 
                        placeholder = ""
                        error = {errors.wifeShare}
                        preInputText={<FaDollarSign />}
                        disabled={true}
                        
                        // onchangeValue={onChangeBusinessOwner}
                        // disabled={props?.disabledFields?.includes('bOwnerInsuranceNumber') ? true : false}
                     />
                  </Box>
                  <Box width={"45%"} marginBottom={3}>
                     <FieldGroup 
                        onchangeValue={null}
                        register = {register}
                        name={'childrenShare'}
                        type={'number'}
                        invalid = {false} 
                        label = "children share" 
                        placeholder = ""
                        error = {errors.childrenShare}
                        preInputText={<FaDollarSign />}
                        disabled={true}
                        
                        // onchangeValue={onChangeBusinessOwner}
                        // disabled={props?.disabledFields?.includes('bOwnerInsuranceNumber') ? true : false}
                     />
                  </Box>
               </Flex>
            </Box>
            
            <Flex flexDirection={'row'} justifyContent={'end'} width={'100%'} marginTop={5}>
               
               <Box  paddingX={3} paddingY={1} borderRadius={5} marginRight={3} className='btn' onClick={()=> navigate(-1)} borderWidth={1} borderColor={textSecondary}>
                  <Text fontSize={16} color={textSecondary}>Cancel</Text>
               </Box>
               {/* handleSubmit */}
               <Box backgroundColor={btnPrimary} paddingX={3} paddingY={1} borderRadius={5} marginRight={3} borderWidth={1} borderColor={btnPrimary} className='btn' 
               onClick={handleSubmit(handleSaveRetirement)}>
                  <Text fontSize={16} color={"#fff"}>Save</Text>
               </Box>
            </Flex>
            
            <FixBottomArea />
            <FixBottomArea />
         </Flex>
         
      );
   } else if(isLoadingReasonsData) {
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
   } else if(isErrorReasonsData || reasonsData?.data < 1) {
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
   }
   
}

export default EditRetirementPageContent;

