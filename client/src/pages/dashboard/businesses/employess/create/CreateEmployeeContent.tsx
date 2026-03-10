//--imports--
   import { Box, Flex, Grid, Span, Switch, Text } from "@chakra-ui/react";
   import BackArrow from "../../../../../components/shared/BackArrow";
   import BasicFieldsSection from "../../../../../components/shared/forms/BasicFieldsSection";
   import BirthFields from "../../../../../components/shared/forms/BirthFields";
   import BirthRegistrationFields from "../../../../../components/shared/forms/BirthRegistrationFields";
   import ContactFields from "../../../../../components/shared/forms/ContactFields";
   import Control from "../../../../../components/shared/forms/Control";
   import FixBottomArea from "../../../../../components/shared/FixBottomArea";
   import useThemedColors from "../../../../../hooks/useThemedColors";
   import { z } from "zod";
   import { checkPersonExist } from "../../../../../api/checkPersonExist";
   import { Controller, useForm } from "react-hook-form";
   import { zodResolver } from "@hookform/resolvers/zod";
   import { useLocation, useNavigate } from "react-router-dom";
   import { useMutation } from "@tanstack/react-query";
   import { host } from "../../../../../constants/connection";
   import toast from "react-hot-toast";
   import FieldGroup from "../../../../../components/shared/forms/FieldGroup";
   import { FaDollarSign } from "react-icons/fa";
   import DatePickerField from "../../../../../components/shared/forms/DatePickerField";
   import { useEffect, useState } from "react";
   import { getFinishedWorkReasons } from "../../../../../api/services/getServicesRelatedData";
   import FisinshReasonsSelectBox from "../../../../../components/shared/forms/services/FinishReasonsSelectBox";
   import { capitalize } from "../../../../../lib/capitalize";
   import { NewEmployeeSchema, NewEmployeeSchemaFormData } from "../../../../../utils/employeeSchema";

const CreateEmployeeContent = () => {
   
   const navigate = useNavigate();
   const [serviceFinish, setServiceFinish] = useState(false);
   const location = useLocation();
   const { textPrimary, textSecondary, borderSecondary, titleTextSecondary, inputContainerBg, switchBtnBgOff , switchBtnBgOn } = useThemedColors();
   const {reasonsData, isSuccessReasonsData, isLoadingReasonsData} = getFinishedWorkReasons();

   const newEmployeeSchema = NewEmployeeSchema({checkPersonExist});
   const {
      register,
      handleSubmit ,
      watch ,
      setError ,
      clearErrors ,
      formState : {errors},
      control ,
   } = useForm<NewEmployeeSchemaFormData>({
      resolver: zodResolver(newEmployeeSchema),
      defaultValues: {
         birthDate: new Date(Date.now()),
         initiateDate : new Date(Date.now()),
         initiateRegistrationDate : new Date(Date.now()),
         
         finishDate :new Date(Date.now()),
         finishRegistrationDate : new Date(Date.now()),
         finishRegistrationNumber : 0,
         // employeeID : 0,
         finishReason : "age"
      },
      mode: 'all'
   });
      
   const initiateDate = watch("initiateDate");
   const initiateRegistrationDate = watch("initiateRegistrationDate");
   const finishDate = watch('finishDate');
   const finishRegistrationDate = watch('finishRegistrationDate');
   
   useEffect(()=> {
    
      if(initiateDate && initiateRegistrationDate) {
         const initDate =  new Date( initiateDate );
         const initRegDate = new Date ( initiateRegistrationDate );
         
         initDate.setHours(0,0,0,0);
         initRegDate.setHours(0,0,0,0);
         
         if(initRegDate < initDate ) {
               
            clearErrors(['initiateDate']);
            // prompt("error here")
            setTimeout(() => {
               setError('initiateDate', {
                  // type: 'manual',
                  message:"initiate registration date can not be before initiate date"
               }, {shouldFocus:false});
            }, 600);
            
         } else {
            if(initiateDate <= new Date() ) {
               clearErrors(['initiateDate']);
            }
            if(initiateRegistrationDate <= new Date()) {
               clearErrors(['initiateRegistrationDate']);
            }
         }
      }
      
      if( finishDate && initiateDate ) {
         
         const finDate =  new Date( finishDate );
         finDate.setHours(0,0,0,0);
         
         const initDate =  new Date( initiateDate );
         initDate.setHours(0,0,0,0);
         
         if(finDate < initDate) {
            clearErrors(['finishDate']);
            // prompt("error here")
            setTimeout(() => {
               setError('finishDate', {
                  // type: 'manual',
                  message:"finish date can not be before init date"
               }, {shouldFocus:false});
            }, 600);
         } 
      }
      
      if(finishDate && finishRegistrationDate) {
         const finDate =  new Date( finishDate );
         const finishRegDate = new Date ( finishRegistrationDate );
         
         finDate.setHours(0,0,0,0);
         finishRegDate.setHours(0,0,0,0);
         
         if(finishRegDate < finDate ) {
               
            clearErrors(['finishDate']);
            // prompt("error here")
            setTimeout(() => {
               setError('finishDate', {
                  // type: 'manual',
                  message:"finish registration date can not be before finish date"
               }, {shouldFocus:false});
            }, 600);
            
         } else {
            if(finishDate <= new Date() ) {
               clearErrors(['finishDate']);
            }
            if(finishRegistrationDate <= new Date()) {
               clearErrors(['finishRegistrationDate']);
            }
         }
      }
      
   },[initiateDate, initiateRegistrationDate , finishDate, finishRegistrationDate ]);

   const saveEmployee = useMutation({
      mutationFn: (employee) => fetch(`${host}/business/create-employee-for-business`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(employee) }).then(res => res.json()),

      onError: (error) => {
         console.log("error occured ! :", error)
      },
      onSuccess: (response) => {
         if (response.status == 404 || response.status == 400) {

            toast.error("somethng went wrong")
         } else if (response.status == 200) {
            navigate(`/dashboard/businesses/${location?.state?.businessID}/employees`, { replace: true });
            setTimeout(() => {
               toast.success('Employee Added Successfuly !');
            }, 500);
         }
      },
   })

   const handleSaveEmployee = (data) => {
      
      data.finishReason = serviceFinish ? data.finishReason : null ;
      data.finishDate = serviceFinish ? data.finishDate : null ;
      data.finishRegistrationDate = serviceFinish ? data.finishRegistrationDate : null ;
      data.finishRegistrationNumber = serviceFinish ? data.finishRegistrationNumber : null ;
      
      saveEmployee.mutate({...data, businessID : location?.state?.businessID || 0});
   }

   return ( 
      <Flex flexDirection={'column'} maxHeight={'100vh'} overflowY={'scroll'}>
         <BackArrow />
         <Text color={textSecondary} textAlign={'center'} fontWeight={"500"}>
            <Span>New Employee for </Span> 
            <Span fontWeight={"700"}>{capitalize(location?.state?.businessName)}
               </Span> 
         </Text>

         <BasicFieldsSection
            register={register}
            Controller={Controller}
            control={control}
            errors={errors}
         />

         <BirthFields
            register={register}
            Controller={Controller}
            control={control}
            errors={errors}
         />

         <BirthRegistrationFields
            register={register}
            errors={errors}
         />

         <ContactFields
            register={register}
            errors={errors}

            Controller={Controller}
            control={control}
         />

         {/* work initiate  */}
         <Box  padding={1} marginY={2} borderWidth={1} borderColor={borderSecondary}
            paddingBottom={2} backgroundColor={inputContainerBg}
         >
            <Text marginBottom={4} color={titleTextSecondary}
               fontSize={{ xssToXs: "16px", xsToXm: "17px", xmToSm: "18px", smToMd: "20px", mdTo3xl: "22px" }}
            >
               initiate Work Details
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
                  name={'initiateSalary'}
                  type={'number'}
                  invalid={false}
                  label="initiate salary"
                  placeholder=""
                  error={errors.initiateSalary}
                  preInputText={<FaDollarSign />}
               />
               <DatePickerField 
                  name={"initiateDate"}
                  register={register}
                  label="initiate date" 
                  Controller={Controller}
                  control={control}
                  error={errors.initiateDate}
               />
                  
               <FieldGroup
                  onchangeValue={null}
                  register={register}
                  name={'initiateRegistrationNumber'}
                  type={'number'}
                  invalid={false}
                  label="initiate registration number"
                  placeholder=""
                  error={errors.initiateRegistrationNumber}
                  preInputText={null}
               />
                  
               <DatePickerField 
                  name={"initiateRegistrationDate"}
                  register={register}
                  label="initiate registration date" 
                  Controller={Controller}
                  control={control}
                  error={errors.initiateRegistrationDate}  
               />
            </Grid>
         </Box>

         {/* work finish  */}
         <Box  padding={1} marginY={2} borderWidth={1} borderColor={borderSecondary}
         paddingBottom={2} backgroundColor={inputContainerBg}
         >
            <Flex justifyContent={'start'} alignItems={"center"}  marginBottom={4}>

            <Text padding={1} marginRight={2} color={titleTextSecondary}
            fontSize={{ xssToXs: "16px", xsToXm: "17px", xmToSm: "18px", smToMd: "20px", mdTo3xl: "22px" }}
            >
               finish Work Details
            </Text>
            <Switch.Root
               checked={serviceFinish}
               onCheckedChange={(e) => setServiceFinish(e.checked)}
               size={"sm"}
               colorPalette={"gray"}
            >
               <Switch.HiddenInput />
               <Switch.Control backgroundColor={!serviceFinish ? switchBtnBgOff : switchBtnBgOn }>
                  <Switch.Thumb backgroundColor={"#fff"} />
               </Switch.Control>
               <Switch.Label />
            </Switch.Root>
            </Flex>
            <Grid   
               display={!serviceFinish ? "none" :"grid"}
               
               templateColumns={{  mdTo2xl:"repeat(2, 1fr)"}}    
               gapX={{ base:"30px" , md:"80px"}}
               gapY={{ base:5 , md:"40px"}}
               
            >
               { (reasonsData && isSuccessReasonsData && !isLoadingReasonsData)
               ?
                  <FisinshReasonsSelectBox 
                     data={reasonsData?.data}
                     label="finish reason" 
                     Controller={Controller}
                     control={control}
                     error={errors.finishReason}
                     defaultValue={"age"}
                     disabled={false}
                  />
               : <>Loading..</>
               }
               
               <DatePickerField 
                  name={"finishDate"}
                  register={register}
                  label="finish date" 
                  Controller={Controller}
                  control={control}
                  error={errors.finishDate}
               />
                  
               <FieldGroup
                  onchangeValue={null}
                  register={register}
                  name={'finishRegistrationNumber'}
                  type={'number'}
                  invalid={false}
                  label="finish registration number"
                  placeholder=""
                  error={errors.finishRegistrationNumber}
                  preInputText={null}
               />
                  
               <DatePickerField 
                  name={"finishRegistrationDate"}
                  register={register}
                  label="finish registration date" 
                  Controller={Controller}
                  control={control}
                  error={errors.finishRegistrationDate}  
               />
            </Grid>
         </Box>
         
         <Control click={handleSubmit(handleSaveEmployee)} />


         <FixBottomArea />
      </Flex>
   )
}

export default CreateEmployeeContent;