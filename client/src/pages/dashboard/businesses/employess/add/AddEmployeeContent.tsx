import { Box, Flex, Grid, HStack, Icon, Text, VStack, Switch, Center  } from "@chakra-ui/react";
import PageHeadTitle from "../../../../../components/shared/PageHeadTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalize } from "../../../../../lib/capitalize";
import { FaDollarSign } from "react-icons/fa6";
import useThemedColors from "../../../../../hooks/useThemedColors";
import FieldGroup from "../../../../../components/shared/forms/FieldGroup";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { getEmployeeByInsuranceNumber } from "../../../../../api/employees/getEmployeeByInsuranceNumber";
import DatePickerField from "../../../../../components/shared/forms/DatePickerField";
import Control from "../../../../../components/shared/forms/Control";
import { useMutation } from "@tanstack/react-query";
import { host } from "../../../../../constants/connection";
import toast from "react-hot-toast";
import { LuSearch } from "react-icons/lu";
import FixBottomArea from "../../../../../components/shared/FixBottomArea";
import { getFinishedWorkReasons } from "../../../../../api/services/getServicesRelatedData";
import FisinshReasonsSelectBox from "../../../../../components/shared/forms/services/FinishReasonsSelectBox";
import { checkZodErrors } from "../../../../../lib/helpers";

const AddEmployeeContent = () => {
   
   const navigate = useNavigate();
   const location = useLocation();

   const [serviceFinish, setServiceFinish] = useState(false);
   const [employeeName ,setEmployeeName] = useState("");
   
   const { textPrimary, textSecondary, btnSecondary, titleTextSecondary, borderSecondary } = useThemedColors();
   
   const {reasonsData, isSuccessReasonsData, isLoadingReasonsData} = getFinishedWorkReasons();
   
   // zod....
   const formSchema = z.object({
      employeeID : z.number(),
      employeeInsuranceNumber : z.number().nonnegative()
      .refine(async(val) => await handleViewEmployeeName(val) , {
         message: "not an employee"
      }),
      // businessID : z.number(),
      initiateDate : z.date().refine((date) => date <= new Date(), {
         message: "initiate date can not be in the future",
      }),
      initiateSalary : z.number().nonnegative(),
      initiateRegistrationDate :  z.date().refine((date) => date <= new Date(), {
         message: "initiate registration date can not be in the future",
      }),
      initiateRegistrationNumber: z.number().nonnegative(),

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
         initiateDate : new Date(Date.now()),
         initiateRegistrationDate : new Date(),
         finishDate :new Date(Date.now()),
         finishRegistrationDate : new Date(Date.now()),
         finishRegistrationNumber : 0,
         employeeID : 0,
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
      
   // useEffect(()=> {
      
   //    if(finishDate && finishRegistrationDate) {
   //       const finDate =  new Date( finishDate );
   //       const finishRegDate = new Date ( finishRegistrationDate );
         
   //       finDate.setHours(0,0,0,0);
   //       finishRegDate.setHours(0,0,0,0);
         
   //       if(finishRegDate < finDate ) {
               
   //          clearErrors(['finishDate']);
   //          // prompt("error here")
   //          setTimeout(() => {
   //             setError('finishDate', {
   //                // type: 'manual',
   //                message:"finish registration date can not be before finish date"
   //             }, {shouldFocus:false});
   //          }, 600);
            
   //       } else {
   //          if(finishDate <= new Date() ) {
   //             clearErrors(['finishDate']);
   //          }
   //          if(finishRegistrationDate <= new Date()) {
   //             clearErrors(['finishRegistrationDate']);
   //          }
   //       }
   //    }
   // },[finishDate, finishRegistrationDate ]);
   
   const saveEmployee = useMutation({
      mutationFn : (employee) => fetch(`${host}/business/add-employee-to-business`,{method:'POST', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify(employee)}).then(res => res.json()) ,
      
      onError : (error) => {
         console.log("error occured ! :",error)
      },
      onSuccess: (response) => {
         if(response?.status == 404 || response?.status == 400){
            
            toast.error(response?.msg || "somethng went wrong");
         } else if(response?.status == 200) {
            navigate(-1)
            setTimeout(() => {
               toast.success('Employee Added Successfuly !');
            }, 1000);
         }
      },
   })
   const handleSaveEmployee = (data) => {
      // console.log("data before sending to backend :",data);

      data.finishReason = serviceFinish ? data.finishReason : null ;
      data.finishDate = serviceFinish ? data.finishDate : null ;
      data.finishRegistrationDate = serviceFinish ? data.finishRegistrationDate : null ;
      data.finishRegistrationNumber = serviceFinish ? data.finishRegistrationNumber : null ;
      
      saveEmployee.mutate({...data, businessID : location?.state?.businessID || 0  });

   }
      
  const handleViewEmployeeName = async(val) => {
     let isEmployee = false;
     const employee = await getEmployeeByInsuranceNumber(val);
     if(employee)  {
      setEmployeeName(`${employee?.first_name} ${employee?.father_name} ${employee?.last_name}`)
      setValue( "employeeID",employee?.emp_id)

        isEmployee = true;
     }
     else {
         setEmployeeName("");
     }
        return isEmployee ;
  }
   
  return (
    <Flex flexDirection={'column'} maxHeight={'100vh'} overflowY={'auto'}>
      <PageHeadTitle 
         title={`Add New Employee To 
            ${ 
            (location?.state?.businessName && location?.state?.businessName != undefined)
            ? capitalize(location?.state?.businessName)
            : capitalize(location?.state?.businessName) 
            }` || "Add Employee"
         } 
         backButton={true}
      />
      
         {/* upper control */}
         <HStack justifyContent={"start"} >
            <Flex flexDirection={'column'} justifyContent={'center'} paddingY={0} paddingX={1} onClick={() => navigate("/dashboard/business-owners/search")}>
               <Icon
                  fontSize={{ xssToXs: "16px", xsToXm: "18px", xmToSm: "20px" }}
               >
                  <LuSearch
                     className='btn'
                  />
               </Icon>
            </Flex>
            
            <Box className='btn' color={btnSecondary}>
               <Text
                  onClick={() => navigate(`/dashboard/businesses/${location?.state?.businessID}/employees/create` ,{state: {businessName: location?.state?.businessName , businessID: location?.state?.businessID}})}
                  fontSize={{ xssToXs: "14px", xsToXm: "16px", xmToSm: "18px" }}
                  marginLeft={2}
               >
                  create new employee
                  {/* <AiFillPlusCircle /> */}
               </Text>
            </Box>
         </HStack>
         
         
         
         {/* Employee insurance number */}
         <Box  padding={1} marginY={1} borderWidth={1} borderColor={borderSecondary}
            paddingBottom={2}
         >
            <Text marginBottom={4} color={titleTextSecondary}
               fontSize={{ xssToXs: "16px", xsToXm: "17px", xmToSm: "18px", smToMd: "20px", mdTo3xl: "22px" }}
            >
               Employee Insurance Number
            </Text>
            <Flex flexDirection={{xssToMd:"column", mdTo3xl:'row'}}
               justifyContent={'space-between'}
            >
               {/* <EmployeeInsuranceNumberField /> */}
               <Box width={{xssToMd:"100%", mdTo3xl:'48%'}}>
                  <FieldGroup
                     onchangeValue={null}
                     register={register}
                     name={'employeeInsuranceNumber'}
                     type={'number'}
                     invalid={false}
                     label=""
                     placeholder=""
                     error={errors.employeeInsuranceNumber}
                     preInputText={null}
                  />
               </Box>
               <VStack>
                  {
                     employeeName 
                     ? 
                     <Text color={"#0a0"}>
                        {employeeName}
                     </Text>
                     :
                     <Text color={"#a00"}>
                        no employee found
                     </Text>
                  }
               </VStack>
            </Flex>
         </Box>

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
          <Control disabled={checkZodErrors(errors)} click = {handleSubmit(handleSaveEmployee)} />
          
          <FixBottomArea />
    </Flex>
  )
}

export default AddEmployeeContent;