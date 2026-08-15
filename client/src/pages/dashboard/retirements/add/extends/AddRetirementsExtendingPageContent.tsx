import React, { useEffect } from 'react'
import { ExtindingSchema, RetirementExtindingSchemaFormData } from '../../../../../utils/retirementSchema'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import useThemedColors from '../../../../../hooks/useThemedColors';
import FieldGroup from '../../../../../components/shared/forms/FieldGroup';
import { FaDollarSign } from 'react-icons/fa';
import DatePickerField from '../../../../../components/shared/forms/DatePickerField';
import { getSalaryReceiptCenters } from '../../../../../api/retirements/getSalaryReceiptCenters';
import SalaryReceiptCentersSelectBox from '../../../../../components/shared/forms/retirements/SalaryReceiptCentersSelectBox';
import FixBottomArea from '../../../../../components/shared/FixBottomArea';
import Control from '../../../../../components/shared/forms/Control';
import { dataTagSymbol, useMutation } from '@tanstack/react-query';
import { host } from '../../../../../constants/connection';
import toast from 'react-hot-toast';
import { deleteRetirement } from '../../../../../api/retirements/deleteReirement';
import z from 'zod';

const AddRetirementsExtendingPageContent = () => {
   
   const navigate = useNavigate();
   const location = useLocation();
   // console.log("location.state :",location.state); 
   
   if(!location?.state?.retirementID) {
      navigate("/dashboard/retirements/new");
   }
   const wifeShareAmount = 3500;
   const childrenShareAmount = 2500;
   
   const {receiptCentersData, isSuccesscReceiptCentersData, isLoadingReceiptCentersData} = getSalaryReceiptCenters();
   
   const { textPrimary, textSecondary, titleTextSecondary, borderSecondary , inputContainerBg, switchBtnBgOff , switchBtnBgOn} = useThemedColors();
   
   
   // zod schema
   const extindingSchema = ExtindingSchema() ;
   type FormValues = z.infer<typeof extindingSchema>;
   // type FormValues = z.infer<ReturnType<typeof extindingSchema>>
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
   } = useForm<FormValues>({
      resolver : zodResolver(extindingSchema) ,
      defaultValues : {
         salaryReceiptCenter: "city_1",
         salaryInitiateDate: new Date(Date.now()),
         
         accumulations: 0,
         indemnification : 0,
         
         wifeShare: wifeShareAmount,
         childrenShare: childrenShareAmount,
         
      },
      mode:'all'
   });
   
   const saveRetirementExtending = useMutation({
      mutationFn : (retirementExtending) => fetch(`${host}/retirement/create-retirement-extending`,{method:'POST', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify(retirementExtending)}).then(res => res.json()) ,
      
      onError : (error) => {
         console.log("error occured ! :",error)
      },
      onSuccess: (response) => {
         console.log("response ::::::",response)
         if(response.status == 404 || response.status == 400){
            
            toast.error("somethng went wrong")
         } else if(response.status == 200) {
            navigate("/dashboard/retirements");
            setTimeout(() => {
               toast.success('Retirement Profile Added Successfuly !');
            }, 1000);
         }
      },
   })
   const handleSaveRetirementExtending = (data) => {
      saveRetirementExtending.mutate({...data, retirementID : location?.state?.retirementID });
   }
   
   const handleCancelation = async () => {
      const deleted = await deleteRetirement(location?.state?.retirementID);
      if(deleted) {
         setTimeout(() => {
            toast.success('Retirement Profile Deleted Successfuly !');
         }, 1000);
      } else {
         setTimeout(() => {
            toast.error('Failed to proceed !');
         }, 1000);
         
      }
      navigate("/dashboard/retirements");
   }
   
//======================Presentation=========================
  return (
     <Flex flexDirection={'column'} maxHeight={'100vh'} overflowY={'scroll'} >
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
         
         {/*----Indemnification  */}
         <Box padding={1} marginY={2} borderWidth={1} borderColor={borderSecondary}
               paddingBottom={2} backgroundColor={inputContainerBg}>
            
            <Text marginBottom={4} color={titleTextSecondary}
                  fontSize={{ xssToXs: "16px", xsToXm: "17px", xmToSm: "18px", smToMd: "20px", mdTo3xl: "22px" }}
               >
               Indemnification 
            </Text>
            <Flex flexDirection={"column"} justifyContent={'space-between'} alignItems={'center'} marginBottom={3} marginTop={5} >
               
               <Box width={"100%"} marginBottom={3}>
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
            </Flex>
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
         
         <Control click = {handleSubmit(handleSaveRetirementExtending)} cancel={handleCancelation}/>
     <FixBottomArea />
     
     </Flex>
  )
}

export default AddRetirementsExtendingPageContent;