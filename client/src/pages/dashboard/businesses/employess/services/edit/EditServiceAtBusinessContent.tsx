import { Box, Flex, Grid, HStack, Switch, Text, VStack } from "@chakra-ui/react";
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
import { getEmployeeByID } from "../../../../../../api/employees/getEmployeeByID";

const EditServiceAtBusinessContent = () => {
   
   const navigate = useNavigate();
   const location =  useLocation();
   console.log("location state : ", location?.state);
   const [serviceFinish, setServiceFinish] = useState(false);
   const [employeeName, setEmployeeName] = useState("");
   
   const { textPrimary, textSecondary, titleTextSecondary, borderSecondary } = useThemedColors();
   
   const {reasonsData, isSuccessReasonsData, isLoadingReasonsData} = getFinishedWorkReasons();
   
   const formSchema = z.object({

      initiateDate : z.date().refine((date) => date <= new Date(), {
         message: "initiate date can not be in the future",
      }),
      initiateSalary : z.number().nonnegative(),
      initiateRegistrationDate :  z.date().refine((date) => date <= new Date(), {
         message: "initiate registration date can not be in the future",
      }),
      initiateRegistrationNumber: z.number().nonnegative() , 
      finishReason : z.string().optional(),
      finishDate : z.date().optional().refine((date) => date <= new Date(), {
         message: "finish date can not be in the future",
      }),
      finishRegistrationDate :  z.date().optional().refine((date) => date <= new Date(), {
         message: "finish registration date can not be in the future",
      }),
      finishRegistrationNumber: z.number().nonnegative().optional(),
   });
   
   const partialFormSchema = formSchema.partial({
      finishRegistrationDate: true,
      finishDate:true,
      finishRegistrationNumber:true,
      finishReason:true
   });
      
   type FormValues = z.infer<typeof partialFormSchema>;
   const {
      register,
      handleSubmit ,
      watch ,
      setValue,
      setError ,
      clearErrors ,
      formState : {errors},
      control ,
      trigger
   } = useForm<FormValues>({
      resolver : zodResolver(partialFormSchema) ,
      defaultValues : {
         // businessID : location?.state?.businessID || 0,
         initiateDate : new Date(location?.state?.initiate_start_date),
         initiateRegistrationDate : new Date(location?.state?.initiate_registration_date),
         initiateRegistrationNumber : location?.state?.initiate_registration_number || 0,
         
         finishDate : location?.state?.finish_date ? new Date(location?.state?.finish_date) : null,
         finishRegistrationDate :location?.state?.finish_registration_date ? new Date(location?.state?.finish_registration_date
         ) :  null ,
         
         finishRegistrationNumber : location?.state?.finish_registration_number || 0,
         // employeeID : 0,
         finishReason :location?.state?.finish_reason ? location?.state?.finish_reason : "age",
         initiateSalary : location?.state?.apply_salary
         || 0,
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
      
   const saveService = useMutation({
      mutationFn : (service) => fetch(`${host}/employees/edit-service`,{method:'POST', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify(service)}).then(res => res.json()) ,
      
      onError : (error) => {
         console.log("error occured ! :",error)
      },
      onSuccess: (response) => {
         if(response?.status == 404 || response?.status == 400){
            
            toast(response?.msg || "somethng went wrong",{duration:2500, position:"top-center", style:{backgroundColor:"#FF5555", color:"#fff"}}); 
         } else if(response?.status == 200) {
            navigate(-1)
            setTimeout(() => {
               // toast.success('');
               toast(response?.msg || "Service Updated Successfuly !",{duration:2500, position:"top-center", style:{backgroundColor:"#22bb22", color:"#fff"}})
            }, 1000);
         }
      },
   })
   const handleSaveService = (data) => {
      // setValue( "employeeID",employee?.emp_id)
      
      data.finishReason = serviceFinish ? data.finishReason : null ;
      data.finishDate = serviceFinish ? new Date(data.finishDate.getTime() - data.finishDate.getTimezoneOffset() * 60000) : null ;
      data.finishRegistrationDate = serviceFinish ? new Date(data.finishRegistrationDate.getTime() - data.finishRegistrationDate.getTimezoneOffset() * 60000) : null ;
      
      data.finishRegistrationNumber = serviceFinish ? data.finishRegistrationNumber : null ;
      
      saveService.mutate({...data, businessID : location?.state?.Business_Employee?.Businesses?.business_id
         || 0, employeeID:location?.state?.employeeID, serviceID: location?.state?.service_id});
   }
      
   useEffect(() => {
      const handleViewEmployeeName = async(val) => {
         const employee = await getEmployeeByID(val);
         if(employee)  {
          setEmployeeName(`${employee?.personal_informations?.first_name} ${employee?.personal_informations?.father_name} ${employee?.personal_informations?.last_name}`)
         }
         else {
             setEmployeeName("");
         }
      }
      
      handleViewEmployeeName(location?.state?.employeeID)
   },[location?.state?.employeeID]);
   
  return (
    <Box>
      <PageHeadTitle 
         title={`Edit Service at 
            ${ 
            (location?.state?.Business_Employee?.Businesses?.business_name && location?.state?.Business_Employee?.Businesses?.business_name != undefined)
            ? capitalize(location?.state?.Business_Employee?.Businesses?.business_name)
            : "business" 
            } for ${employeeName}` || "Edit Service"
         } 
         backButton={true}
      />
      
         {/* Employee insurance number */}
         

         {/* work initiate  */}
         <Box  padding={1} marginY={2} borderWidth={1} borderColor={borderSecondary}
            paddingBottom={2}
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
         paddingBottom={2}
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
            >
               <Switch.HiddenInput />
               <Switch.Control>
                  <Switch.Thumb />
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
                     defaultValue={location?.state?.finish_reason || "moving"}
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
    </Box>
  )

}

export default EditServiceAtBusinessContent;