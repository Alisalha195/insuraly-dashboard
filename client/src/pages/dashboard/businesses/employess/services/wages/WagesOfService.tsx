import { Box, Button, Dialog, Drawer, Flex, HStack, Portal, Span, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import DatePickerField from '../../../../../../components/shared/forms/DatePickerField';
import FieldGroup from '../../../../../../components/shared/forms/FieldGroup';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { base64url, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PageHeadTitle from '../../../../../../components/shared/PageHeadTitle';
import { capitalize } from '../../../../../../lib/capitalize';
import { useLocation, useNavigate } from 'react-router-dom';
import useThemedColors from '../../../../../../hooks/useThemedColors';
import { LuDelete } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { PiBuildingOffice } from "react-icons/pi";
import { getEmployeeByID } from '../../../../../../api/employees/getEmployeeByID';
import { useMutation, useQuery } from '@tanstack/react-query';
import { host } from '../../../../../../constants/connection';
import toast from 'react-hot-toast';
import {  WagesSchema, WagesSchemaFormData } from '../../../../../../utils/employeeSchema';
import { useCustomQuery } from '../../../../../../hooks/useCustomQuery';
import { FaExpand } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';


// const wageSchema = z.object({
   
//    wageDate : z.date().refine((date) => date <= new Date(), {
//       message: "wage date can not be in the future",
//    }),
//    wageAmount : z.number().min(0, "Amount must be a positive number")
// });

// const totalWageSchema = z.object({
//    wages: z.array(wageSchema).min(1, "At least one wage entry is required"),
// });

// type WageFormValues = z.infer<typeof totalWageSchema>;

const WagesOfService = () => {
   
   const wagesSchema = WagesSchema();
   
   const [employeeName, setEmployeeName] = useState("");
   const [wagesBoxOpen, setWagesBoxOpen] = useState(false);
   
   // const { isOpen, onOpen, onClose } = useDisclosure()
   // const [defaultWages, setDefaultWages] = useState([{ wageDate: null, wageAmount: 0 }]);
   
   const  location = useLocation();
   const {t} = useTranslation();
   
   const navigate = useNavigate();
   const {btnGreen, btnPrimary, bgSecondary, borderSecondary, InfoCardBorder, textSecondary, bgPrimary, bgLight, cardBasicColor, BasicBackground} = useThemedColors();
   
   // console.log( location.state);
   
   useEffect(() => {
      const getEmployee = async() => await getEmployeeByID(location?.state?.employeeID)
      .then((res) => {
         if(res) {
            setEmployeeName(capitalize(res?.personal_informations?.first_name) + " " + capitalize(res?.personal_informations?.last_name));
         } 
      });
      getEmployee(); 
   },[location.state]);
   
   
   // const {
   //       data: previousWages,
   //       error: previousWagesError,
   //       isLoading: previousWagesIsLoading,
   //       isSuccess: previousWagesIsSuccess,
   // } = useQuery({
   //    queryKey: ["wages-for-service", location?.state?.service_id ,location?.state?.employeeID],
   //    queryFn: () =>
   //       fetch(
   //          `${host}/servicesWages/getWagesByServiceID?serviceID=${location?.state?.service_id}`
   //       ).then((res) => res.json()),
   //    refetchInterval: 5000,
   //    keepPreviousData: true,
   //    staleTime: 30000,
   // });
   
   const { data : previousWages, 
           error:previousWagesError, 
           isSuccess : previousWagesIsSuccess ,
           isLoading : previousWagesIsLoading
         } = useCustomQuery(
      ["wages-for-service", location?.state?.service_id ,location?.state?.employeeID],
      `${host}/servicesWages/getWagesByServiceID?serviceID=${location?.state?.service_id}`
   );
    
   useEffect(() => {
      if (previousWagesIsSuccess && previousWages?.wages) {
         
         // console.log("prev wages :",previousWages?.wages)
         const formattedWages = previousWages.wages.map(wage => ({
            wageDate: new Date(wage.service_wage_date),
            wageAmount: wage.wage_amount
         }));
         
         console.log("formated wages :",formattedWages);
         setValue("wages", formattedWages);
         // setDefaultWages(formattedWages);
      }
   }, [previousWages, previousWagesError, previousWagesIsLoading, previousWagesIsSuccess]);
   

   const form = useForm<WagesSchemaFormData>({
      resolver: zodResolver(wagesSchema),
      defaultValues: {
         wages: [{ wageDate: null, wageAmount: 0 }], // Initial default value
       },
       mode: 'all'
   })
   const {register,watch ,setValue ,control, handleSubmit, setError, clearErrors, formState: { errors } } = form;

   const { fields, append, prepend, remove, update } = useFieldArray({
      control,
      name: "wages",
   });

   const saveWages = useMutation({
      mutationFn : (wages) => fetch(`${host}/servicesWages/save`,{method:'POST', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify(wages)}).then(res => res.json()) ,
      
      onError : (error) => {
         console.log("error occured ! :",error)
      },
      onSuccess: (response) => {
         console.log(response)
         if(response?.status == 404 || response?.status == 400){
            
            toast(response?.msg || "somethng went wrong",{duration:2500, position:"top-center", style:{backgroundColor:"#FF5555", color:"#fff"}})
         } else if(response?.status == 200) {
            navigate(-1)
            setTimeout(() => {
               // toast.success('Employee Added Successfuly !');
               toast(response?.msg || "saved successfuly",{duration:2500, position:"top-center", style:{backgroundColor:"#22bb22", color:"#fff"}})
            }, 1000);
         }
      },
   })
   
   const handleAddingWage = () => {
      
      prepend({ wageDate:null , wageAmount: 0 })
      // handleSortByDate();      
      console.log( "fields :",fields);
   }
      

   const handleChangeWageDate = (date, index) => {
      
      const fieldPath = `wages.${index}.wageDate`;
      const fields = form.getValues("wages");
      clearErrors(fieldPath);
      
      // check if repeated wage date
      fields.map((field, index) => {
         if(field.wageDate && date && field.wageDate.getTime() === date.getTime()) {
            // prompt("Wage date cannot be repeated.");
            
            // clearErrors(fieldPath);
            toast("Wage date cannot be repeated",{duration:2500, position:"top-center", style:{backgroundColor:"#FF5555", color:"#fff"}})
            setTimeout(() => {
               update(index, { wageDate: null, wageAmount: fields[index]?.wageAmount || 10 });
            }, 1000);
            // setError(fieldPath, {
            //    type: 'manual', 
            //    message: 'Wage date cannot be repeated',
            //  }, { shouldFocus: true });
             
            
            return;
         }  else {
            
         }
      });
      // console.log("changed date to :" , date);
      if(location?.state?.initiate_start_date) {
         const initiateDate = new Date(location.state.initiate_start_date);
         if (date < initiateDate) {
            // clearErrors(fieldPath); 
            
            clearErrors(fieldPath);
            setError(fieldPath, {
               type: 'manual', 
               message: 'Wage date cannot be before service initiate date',
             }, { shouldFocus: true });
             
            // update(index, { wageDate: null, wageAmount: fields[index]?.wageAmount || 10 });
            return;
         } 
         // else {
         //    update(index, { wageDate: new Date(date), wageAmount: fields[index]?.wageAmount || 10 });
         // }
      } 
      if(location?.state?.finish_date) {
         const finishDate = new Date(location.state.finish_date);
         if (date > finishDate) {
            
            clearErrors(fieldPath);
            setError(fieldPath, {
               type: 'manual', 
               message: 'Wage date cannot be after the service finish date',
             }, { shouldFocus: true });
             
            // update(index, { wageDate: null, wageAmount: fields[index]?.wageAmount || 10 });
            return;
         } 
         // else {
         //    update(index, { wageDate: new Date(date), wageAmount: fields[index]?.wageAmount || 10 });
         // }
      } 
      // prompt("Wage date updated successfully.");
      update(index, { wageDate: new Date(date), wageAmount: fields[index]?.wageAmount || 0 });
      // console.log("updated fields :" , form.getValues("wages"));
      setTimeout(() => {
         handleSortByDate();
      }, 1000);
   }
   
   const handleSortByDate = () => {

      const fields = form.getValues("wages");
      const sortedFields = new Array(...fields).sort((a, b) => {
      //   return new Date(a.wageDate) - new Date(b.wageDate);
        return a.wageDate - b.wageDate;
      });

      const sortedValues = sortedFields.map(field => ({ wageAmount: field.wageAmount, wageDate: field.wageDate }));
     
      setValue("wages", sortedValues, { shouldDirty: true });
   };
   
   const handleSavingWages = (data) => {
      console.log("valid data to submit :" , data);
      data?.wages.map(wage => {
         wage.wageDate = new Date(wage.wageDate.getTime() - wage.wageDate.getTimezoneOffset() * 60000);
         // wage.wageDate.setHours(0,0,0,0);
      });
      console.log("data to submit after setting hours to 0 :" , data.wages);
      saveWages.mutate({serviceID: location?.state?.service_id , wages: data?.wages});
         
      // handleSubmit((data) => {
      //    console.log("valid data to submit :" , data);
      //    saveWages.mutate({serviceID: location?.state?.service_id , wages: data});
      // })
   }
   
   useEffect(()=> {
      console.log("errors :",errors)
   }, [errors])
   
  return (
   <>
   <Flex
      justifyContent={'center'}
      flexGrow={1}
   >
    <VStack
      width={"100%"}
      // backgroundColor={"#fff"}
    >
      {/* header line */}
      <Box
         width={"100%"}
      >
         <PageHeadTitle 
            title={  capitalize(t("wages")) }
            backButton={true}
         />
      </Box>
      {/* business & employee info */}
      <Box
         width={"100%"}
      >
         <VStack
            alignItems={"start"}
            borderBottomWidth={1}
            paddingBottom={1}
            marginBottom={1}
            width={"100%"}
         >
            <HStack
               justifyContent={"start"}
            >
               <Text>
                  <GoPerson />
               </Text>
                  
               <Text>
                  {employeeName}
               </Text>
            </HStack>
            <HStack>
               <Text>
                  <PiBuildingOffice />
               </Text>
                  
               <Text 
                  
               >
                  {location?.state?.Business_Employee?.Businesses?.business_name || t("Business")}
               </Text>
            </HStack>
         </VStack>
      </Box>
      
      <Flex 
         flexDirection={{xssToXmm:"column", xmmTo3xl:"row"}}
         justifyContent={"space-around"}
         width={"100%"}
         paddingX={4}
         // backgroundColor={"#f00"}
         
      >
         
         {/* service basic info */}  
         <Box
         width={"70%"}
         >
            <Flex
               // backgroundColor={"#f00"}
               flexDirection={{xssToXmm:"column", xmmTo3xl:"row"}}
               justifyContent={'space-around'}
               marginBottom={3}
            >
               <VStack
                  // backgroundColor={"#0f0"}
               >
                  <Text>
                     {t("initiateDate")}
                  </Text>
                  <Text>
                     {location?.state?.initiate_start_date
                     }
                  </Text>
               </VStack>
               
               <VStack
                  // backgroundColor={"#0f0"}
               >
                  <Text>
                  {t("applySalary")}
                  </Text>
                  <Text>
                     ${location?.state?.apply_salary
                     }
                  </Text>
               </VStack>
            </Flex>
         </Box>
      
         {/*//todo======================== wages ==============================*/}
         <Box
            borderColor={InfoCardBorder}
            borderWidth={2}
            
            // width ={wagesBoxOpen ? '100vw' : ''}
            // height ={wagesBoxOpen ? '100vh' : ''}
         >
            <HStack
               justifyContent={"space-between"}
               
               // paddingBottom={1}
               borderColor={InfoCardBorder}
               borderBottomColor={InfoCardBorder}
               borderBottomWidth={1}
               position={'relative'}
            >
               <Span 
                  className='btn'
                  position={'absolute'} 
                  top={0}
                  right={'50%'}
                  onClick={()=>setWagesBoxOpen(prev => !prev)}
               >
                  <Text color={textSecondary} >
                     <FaExpand />
                  </Text>
               </Span>
               
               <Text
                  className='btn' 
                  onClick={() => handleAddingWage()}
                  color={btnGreen}
                  padding={2}
               >
                  {t("newWage")}
               </Text>
               <Text
                  className='btn' 
                  onClick={handleSubmit(handleSavingWages)}
                  
                  color={btnPrimary}
                  padding={2}
               >
                  {t("save")}
               </Text>
            </HStack>
            <Box
               overflow={"auto"}
               maxHeight={"450px"}
               padding={2}
            >
            {
               fields.map((field, index) => (
                  <Flex 
                     flexDirection={{xssToXm:"column", xmTo3xl : "row"}}
                     key={field.id}
                     marginTop={2}
                     
                     borderTopColor={InfoCardBorder}
                     borderTopWidth={1}
                     padding={1}
                     transition={"ease-in 2s"}
                  >
                     
                     <DatePickerField 
                        label={t("Date")}
                        name={`wages.${index}.wageDate`}
                        control={control}
                        Controller={Controller}
                        error={errors.wages?.[index]?.wageDate}
                        // register={{...form.register(`wages.${index}.wageDate`)}}
                        register={register}
                        onChangeValue ={handleChangeWageDate}
                        index={index}
                     />
                     <FieldGroup 
                        register={register}
                        // register={{...form.register(`wages.${index}.wageAmount`, { valueAsNumber: true })}}
                        label={t("Amount")}
                        type={"number"}
                        error={errors.wages?.[index]?.wageAmount}
                        name={`wages.${index}.wageAmount`}
                        preInputText={"$"}
                        invalid={!!errors.wages?.[index]?.wageAmount}
                        placeholder={"0.00"}
                        onchangeValue={undefined}
                     
                     />
                     <Box
                        alignContent={'center'}
                        ms={5}
                     >
                        <Text 
                           className='btn'
                           // backgroundColor={"#f00"}
                           marginTop={3}
                           fontSize={32}
                           color={textSecondary}
                           onClick={() => remove(index)}
                           _rtl={{transform : "rotate(180deg)"}} transition='.2s ease'
                           >
                              <LuDelete />
                              
                        </Text>
                     </Box>
                  </Flex>
                  
               ))
            }
            </Box>
            
         </Box>
      </Flex>
      
    </VStack>
    </Flex>
    
    {/* //?=========Expanded Wages Box============= */}
    <Dialog.Root open={wagesBoxOpen} onOpenChange={(e) => setWagesBoxOpen(e.open)} size="full">
      <Portal>
         <Dialog.Backdrop />
         <Dialog.Positioner>
            <Dialog.Content 
               paddingTop={0}
               backgroundColor={BasicBackground}
               // backgroundColor={}
            >
               {/* <Drawer.Header borderBottom={'4px solid #fff'} borderColor={bgPrimary}
                  paddingTop={"10px"}
                  paddingLeft={'10px'}
                  paddingBottom={'10px'}
               >
                  
               </Drawer.Header> */}
               <Dialog.Body
                  pe={'10px'}
                  ps={'20px'}
               >
                  {/*//?=========== modal body ============ */}
                  <Flex 
                  width={'100%'}
                  flexDirection={'row'}
                  justifyContent={'center'}
                  >
                     <Box
                     borderColor={InfoCardBorder}
                     borderWidth={2}
                     minWidth={'60%'}
                     maxWidth={'80%'}
                     // width ={wagesBoxOpen ? '100vw' : ''}
                     // height ={wagesBoxOpen ? '100vh' : ''}
                     >
                        <HStack
                           justifyContent={"space-between"}
                           
                           // paddingBottom={1}
                           borderColor={InfoCardBorder}
                           borderBottomColor={InfoCardBorder}
                           borderBottomWidth={1}
                           position={'relative'}
                        >
                           <Span 
                              className='btn'
                              position={'absolute'} 
                              top={0}
                              right={'50%'}
                              onClick={()=>setWagesBoxOpen(prev => !prev)}
                           >
                              <Text>
                                 <FaExpand />
                              </Text>
                           </Span>
                           
                           <Text
                              className='btn' 
                              onClick={() => handleAddingWage()}
                              color={btnGreen}
                              padding={2}
                              fontWeight={'500'}
                           >
                              {t("newWage")}
                           </Text>
                           <Text
                              className='btn' 
                              onClick={handleSubmit(handleSavingWages)}
                              
                              color={btnPrimary}
                              padding={2}
                              fontWeight={'500'}
                           >
                              {t("save")}
                           </Text>
                        </HStack>
                        <Box
                           overflow={"auto"}
                           maxHeight={"550px"}
                           padding={2}
                        >
                        {
                           fields.map((field, index) => (
                              <Flex 
                                 flexDirection={{xssToXm:"column", xmTo3xl : "row"}}
                                 key={field.id}
                                 marginTop={2}
                                 
                                 borderTopColor={InfoCardBorder}
                                 borderTopWidth={1}
                                 padding={1}
                                 transition={"ease-in 2s"}
                              >
                                 
                                 <DatePickerField 
                                    label={t("Date")}
                                    name={`wages.${index}.wageDate`}
                                    control={control}
                                    Controller={Controller}
                                    error={errors.wages?.[index]?.wageDate}
                                    // register={{...form.register(`wages.${index}.wageDate`)}}
                                    register={register}
                                    onChangeValue ={handleChangeWageDate}
                                    index={index}
                                 />
                                 <FieldGroup 
                                    register={register}
                                    // register={{...form.register(`wages.${index}.wageAmount`, { valueAsNumber: true })}}
                                    label={t("Amount")}
                                    type={"number"}
                                    error={errors.wages?.[index]?.wageAmount}
                                    name={`wages.${index}.wageAmount`}
                                    preInputText={"$"}
                                    invalid={!!errors.wages?.[index]?.wageAmount}
                                    placeholder={"0.00"}
                                    onchangeValue={undefined}
                                 
                                 />
                                 <Box
                                    alignContent={'center'}
                                    ms={5}
                                 >
                                    <Text 
                                       className='btn'
                                       // backgroundColor={"#f00"}
                                       marginTop={3}
                                       fontSize={32}
                                       color={textSecondary}
                                       onClick={() => remove(index)}
                                       _rtl={{transform : "rotate(180deg)"}} transition='.2s ease'
                                       >
                                          <LuDelete />
                                          
                                    </Text>
                                 </Box>
                              </Flex>
                              
                           ))
                        }
                        </Box>
                        
                     </Box>
                  </Flex>
                  
               </Dialog.Body>

               {/* <Dialog.CloseTrigger padding={0} asChild>
                  <Box
                     padding={0}
                     border={'none'}
                     outline={'none'}
                     _hover={{ backgroundColor: 'transparent' }}

                  >
                     close
                  </Box>
               </Dialog.CloseTrigger> */}
            </Dialog.Content>
         </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  </>
  )
}

export default WagesOfService;