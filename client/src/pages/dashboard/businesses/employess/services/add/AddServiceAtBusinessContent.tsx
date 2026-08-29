//--import--
   import { Box, Flex, Grid, HStack, Span, Switch, Text, VStack } from "@chakra-ui/react";
   import { useLocation, useNavigate } from "react-router-dom";
   import { useForm, Controller } from "react-hook-form";
   import { z } from "zod";
   import { zodResolver } from "@hookform/resolvers/zod";
   import { useEffect, useState } from "react";
   import { useMutation } from "@tanstack/react-query";
   import toast from "react-hot-toast";
   import { FaDollarSign } from "react-icons/fa6";
   import useThemedColors from "../../../../../../hooks/useThemedColors";
   import PageHeadTitle from "../../../../../../components/shared/PageHeadTitle";
   import { capitalize } from "../../../../../../lib/capitalize";
   import { getEmployeeByInsuranceNumber } from "../../../../../../api/employees/getEmployeeByInsuranceNumber";
   import FieldGroup from "../../../../../../components/shared/forms/FieldGroup";
   import { host } from "../../../../../../constants/connection";
   import Control from "../../../../../../components/shared/forms/Control";
   import DatePickerField from "../../../../../../components/shared/forms/DatePickerField";
   import { getFinishedWorkReasons } from "../../../../../../api/services/getServicesRelatedData";
   import FisinshReasonsSelectBox from "../../../../../../components/shared/forms/services/FinishReasonsSelectBox";
   import { getEmployeeServices } from "../../../../../../api/employees/getEmployeeServices";
   import { checkServiceInitiateDateValidation } from "../../../../../../lib/helpers";
   import { ServiceSchema, ServiceSchemaFormData } from "../../../../../../utils/employeeSchema";
   import { useTranslation } from "react-i18next";
import useLangDir from "../../../../../../hooks/useLangDir";
import FixBottomArea from "../../../../../../components/shared/FixBottomArea";

const AddServiceAtBusinessContent = () => {
   
   const navigate = useNavigate();
   const location =  useLocation();
   const [serviceFinish, setServiceFinish] = useState(false);
   // const [checkServiceValidation, setCheckServiceValidation] = useState(false);
   const [serviceValidation , setServiceValidation] = useState({state: 0, msg:""});
   const { textPrimary, textSecondary, titleTextSecondary, borderSecondary , inputContainerBg, switchBtnBgOff , switchBtnBgOn} = useThemedColors();
   const {reasonsData, isSuccessReasonsData, isLoadingReasonsData} = getFinishedWorkReasons();

   const {t} = useTranslation();
   const {isRTL} = useLangDir();
   
   const serviceSchema = ServiceSchema();

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
   } = useForm<ServiceSchemaFormData>({
      resolver : zodResolver(serviceSchema) ,
      defaultValues : {
         // businessID : location?.state?.businessID || 0,
         initiateDate : new Date(Date.now()),
         initiateRegistrationDate : new Date(),
         initiateRegistrationNumber:0,
         initiateSalary:0,
         finishDate :new Date(Date.now()),
         finishRegistrationDate : new Date(Date.now()),
         finishRegistrationNumber : 0,
         // employeeID : 0,
         finishReason : "age"
      },
      mode:'all'
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
   
   useEffect(()=>{

      const handleCheckValidInitiateDate = async () => {
         const employeeServices = await getEmployeeServices( location?.state?.Employees?.personal_informations?.personal_info_id, location?.state?.businessID);
         
         let isValidService = true;
         // compare initiate date in all services with the included one for new service
         if(employeeServices?.success) {
            
            isValidService = checkServiceInitiateDateValidation(employeeServices.services, getValues().initiateDate, getValues().finishDate, serviceFinish);
            
            if(isDirty ) {
               if(!isValidService || errors.initiateDate || errors.finishDate) {
                  toast.error("service is not accepted");
                  setServiceValidation({state:0, msg:"not accepted"});
               } else {
                  setServiceValidation({state:1, msg:"accepted"});
                  toast.success("service accepted");
               }
            }
         }
         
      }
      handleCheckValidInitiateDate();
      

   },[getValues().initiateDate, getValues().finishDate]);
   
   const saveService = useMutation({
      mutationFn : (service) => fetch(`${host}/employees/add-service`,{method:'POST', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify(service)}).then(res => res.json()) ,
      
      onError : (error) => {
         console.log("error occured ! :",error)
      },
      onSuccess: (response) => {
         if(response?.status == 404 || response?.status == 400){
            
            toast(response?.msg || "somethng went wrong",{duration:2500, position:"top-center", style:{backgroundColor:"#FF5555", color:"#fff"}});
         } else if(response?.status == 200) {
            navigate(-1)
            setTimeout(() => {
               toast(response?.msg || "Service Added Successfuly !",{duration:2500, position:"top-center", style:{backgroundColor:"#22bb22", color:"#fff"}})
            }, 1000);
         }
      },
   })
   const handleSaveService = (data) => {
      // setValue( "employeeID",employee?.emp_id)
      
      data.finishReason = serviceFinish ? data.finishReason : null ;
      data.finishDate = serviceFinish ? data.finishDate : null ;
      data.finishRegistrationDate = serviceFinish ? data.finishRegistrationDate : null ;
      data.finishRegistrationNumber = serviceFinish ? data.finishRegistrationNumber : null ;
      if(serviceValidation.state == 1) {
         toast.loading("saving service ..", {position:"top-center", style:{backgroundColor:"#22bb22", color:"#fff"}})
         saveService.mutate({...data, businessID : location?.state?.businessID || 0, employeeID:location?.state?.employeeID});
      } else {
         toast.error("service is not accepted, can not save !", {position:"top-center", style:{backgroundColor:"#FF5555", color:"#fff"}})
      }
         // saveService.mutate({...data, businessID : location?.state?.businessID || 0, employeeID:location?.state?.employeeID});
   }
      
//   const handleViewEmployeeName = async(val) => {
//      let isEmployee = false;
//      const employee = await getEmployeeByInsuranceNumber(val);
//      if(employee)  {
//       setEmployeeName(`${employee?.first_name} ${employee?.father_name} ${employee?.last_name}`)
//       setValue( "employeeID",employee?.emp_id)

//         isEmployee = true;
//      }
//      else {
//          setEmployeeName("");
//      }
//         return isEmployee ;
//   }

   // const handleCheckValidInitiateDate = async () => {
      // const employeeServices = await getEmployeeServices( location?.state?.Employees?.personal_informations?.personal_info_id, location?.state?.businessID);
      
      // let isValidService = true;
      // let waiting = true;
      // // compare initiate date in all services with the included one for new service
      // if(employeeServices?.success) {
         
      //    // console.log("initiateDate ::",getValues().initiateDate);
      //    // console.log("finishDate ::",getValues().finishDate);
         
      //    isValidService = checkServiceInitiateDateValidation(employeeServices.services, getValues().initiateDate, getValues().finishDate, serviceFinish);
         
      //    waiting = false;
      // }
      
      // console.log("isValidService in handleCheckValidInitiateDate ::",isValidService); 
      
      // if(!waiting) {
      //    setCheckServiceValidation(isValidService)
      //    return isValidService;
      // }
   // }

  return (
    <Flex flexDirection={'column'} maxHeight={'100vh'} overflowY={'auto'} >
      <PageHeadTitle 
         title={ !isRTL
         ?
         <>
         <Span fontWeight={"500"} color={textSecondary} >Add Service At </Span> 
            <Span
               fontWeight={"700"} color={textSecondary}
            > { 
            (location?.state?.businessName && location?.state?.businessName != undefined)
            ? 
               capitalize(location?.state?.businessName)
              
            : "business" 
            } 
            </Span>
            <Span> for </Span> 
            <Span fontWeight={"700"} color={textSecondary}>
            {location?.state?.employeeName || "Add Service"}
           </Span>
           </>
         :
         <>
         <Span fontWeight={"500"} color={textSecondary} >إضافة خدمة عند  </Span> 
            <Span
               fontWeight={"700"} color={textSecondary}
            > { 
            (location?.state?.businessName && location?.state?.businessName != undefined)
            ? 
               capitalize(location?.state?.businessName)
              
            : "business" 
            } 
            </Span>
            <Span> للعامل </Span> 
            <Span fontWeight={"700"} color={textSecondary}>
            {location?.state?.employeeName || "Add Service"}
           </Span>
           </>
         } 
         backButton={true}
      />
      
         {/* Employee insurance number */}
         

         {/* work initiate  */}
         <Box  padding={1} marginY={2} borderWidth={1} borderColor={borderSecondary}
            paddingBottom={2} backgroundColor={inputContainerBg} >
            <Text marginBottom={4} color={titleTextSecondary}
               fontSize={{ xssToXs: "16px", xsToXm: "17px", xmToSm: "18px", smToMd: "20px", mdTo3xl: "22px" }}
            >
               {t("initiateWorkDetails")} {serviceValidation.state == 1 && <Span color={"#22bb22"}>{serviceValidation.msg}</Span>} {serviceValidation.state == 0 && <Span color={"#FF5555"}>{serviceValidation.msg}</Span>}
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
               {t("finishWorkDetails")}
            </Text>
            <Switch.Root
               checked={serviceFinish}
               onCheckedChange={(e) => setServiceFinish(e.checked)}
               size={"sm"}
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
          <Control click = {handleSubmit(handleSaveService)} />
          <FixBottomArea />
    </Flex>
  )

}

export default AddServiceAtBusinessContent;