import { Box, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import PageHeadTitle from "../../../../../components/shared/PageHeadTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalize } from "../../../../../lib/capitalize";
// import EmployeeInsuranceNumberField from "../../../../../components/shared/forms/business/EmployeeInsuranceNumberField";
import { FaDollarSign } from "react-icons/fa6";
import useThemedColors from "../../../../../hooks/useThemedColors";
import FieldGroup from "../../../../../components/shared/forms/FieldGroup";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { getEmployeeByInsuranceNumber } from "../../../../../api/employees/getEmployeeByInsuranceNumber";
import DatePickerField from "../../../../../components/shared/forms/DatePickerField";
import Control from "../../../../../components/shared/forms/Control";
import { useMutation } from "@tanstack/react-query";
import { host } from "../../../../../constants/connection";
import toast from "react-hot-toast";

const AddEmployeeContent = () => {
   
   const navigate = useNavigate();
   const location =  useLocation();
   const { textPrimary, textSecondary, titleTextSecondary, borderSecondary } = useThemedColors();
   
   const [employeeName ,setEmployeeName] = useState("");
   
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
      initiateRegistrationNumber: z.number().nonnegative()
   })
      
   type FormValues = z.infer<typeof formSchema>;
   const {
      register,
      handleSubmit ,
      watch ,
      setValue,
      formState : {errors},
      control ,
      trigger
   } = useForm<FormValues>({
      resolver : zodResolver(formSchema) ,
      defaultValues : {
         // businessID : location?.state?.businessID || 0,
         initiateDate : new Date(Date.now()),
         initiateRegistrationDate : new Date(Date.now()),
      },
      mode:'onChange'
   });
      
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
      prompt("saving..");
      saveEmployee.mutate({...data, businessID : location?.state?.businessID || 0});
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
    <Box>
      <PageHeadTitle 
         title={`Add Employee To ${ capitalize(location?.state?.businessName) }` || "Add Employee"} 
         backButton={true}
      />
      
         {/* Employee insurance number */}
         <Box  padding={1} marginY={2} borderWidth={1} borderColor={borderSecondary}
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
          <Control click = {handleSubmit(handleSaveEmployee)} />
    </Box>
  )
}

export default AddEmployeeContent;