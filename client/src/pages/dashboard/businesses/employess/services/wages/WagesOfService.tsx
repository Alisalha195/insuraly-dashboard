import { Box, Button, Flex, HStack, Span, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import DatePickerField from '../../../../../../components/shared/forms/DatePickerField';
import FieldGroup from '../../../../../../components/shared/forms/FieldGroup';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
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


const wageSchema = z.object({
   
   wageDate : z.date().refine((date) => date <= new Date(), {
      message: "wage date can not be in the future",
   }),
   wageAmount : z.number().min(0, "Amount must be a positive number")
});

const totalWageSchema = z.object({
   wages: z.array(wageSchema).min(1, "At least one wage entry is required"),
});

const WagesOfService = () => {
   
   const [employeeName, setEmployeeName] = useState("");
   const  location = useLocation();
   const navigate = useNavigate();
   const {btnGreen, btnPrimary} = useThemedColors();
   
   // console.log( location.state);
   
   useEffect(() => {
      const getEmployee = async() => await getEmployeeByID(location?.state?.employeeID)
      .then((res) => {
         if(res) {
            setEmployeeName(res?.personal_informations?.first_name + " " + res?.personal_informations?.last_name);
         } 
      });
      getEmployee(); 
   },[location.state]);
   
   
   const {
         data: previousWages,
         error: previousWagesError,
         isLoading: previousWagesIsLoading,
         isSuccess: previousWagesIsSuccess,
      } = useQuery({
         queryKey: ["wages-for-service", location?.state?.service_id ,location?.state?.employeeID],
         queryFn: () =>
            fetch(
               `${host}/business/get-employees?page=${currentpage}&pageSize=${pageSize}&businessId=${params?.id}`
            ).then((res) => res.json()),
         refetchInterval: 5000,
         keepPreviousData: true,
         staleTime: 30000,
      });
   type WageFormValues = z.infer<typeof totalWageSchema>;

   const form = useForm<WageFormValues>({
      resolver: zodResolver(totalWageSchema),
      defaultValues: {
         wages: [{ wageDate: null, wageAmount: 10 }], // Initial default value
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
            // navigate(-1)
            setTimeout(() => {
               // toast.success('Employee Added Successfuly !');
               toast(response?.msg || "saved successfuly",{duration:2500, position:"top-center", style:{backgroundColor:"#55ff55", color:"#fff"}})
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
      // setTimeout(() => {
      //    handleSortByDate();
      // }, 1000);
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
            title={  capitalize("wages") }
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
                  
               <Text>
                  {location?.state?.Business_Employee?.Businesses?.business_name || "Business"}
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
                     initiate date
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
                     apply salary
                  </Text>
                  <Text>
                     ${location?.state?.apply_salary
                     }
                  </Text>
               </VStack>
            </Flex>
         </Box>
      
         {/* wages */}
         <Box
            borderColor={"#444"}
            borderWidth={1}
         >
            <HStack
               justifyContent={"space-between"}
               
               // paddingBottom={1}
               borderColor={"#444"}
               borderBottomColor={"#444"}
               borderBottomWidth={1}
            >
               <Text
                  className='btn' 
                  onClick={() => handleAddingWage()}
                  color={btnGreen}
                  padding={2}
               >
                  new wage
               </Text>
               <Text
                  className='btn' 
                  onClick={handleSubmit(handleSavingWages)}
                  
                  color={btnPrimary}
                  padding={2}
               >
                  save
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
                     
                     borderTopColor={"#444"}
                     borderTopWidth={1}
                     padding={1}
                     transition={"ease-in 2s"}
                  >
                     
                     <DatePickerField 
                        label={"Date"}
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
                        label={"Amount"}
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
                        marginLeft={5}
                     >
                        <Text 
                           className='btn'
                           // backgroundColor={"#f00"}
                           marginTop={3}
                           fontSize={32}
                           
                           onClick={() => remove(index)}
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
  )
}

export default WagesOfService;