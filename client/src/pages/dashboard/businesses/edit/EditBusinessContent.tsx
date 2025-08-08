import {useMutation } from '@tanstack/react-query';
import {host} from "../../../../constants/connection.ts";
import {
   Box,
   Button,
   Field,
   Fieldset,
   Flex,
   For,
   HStack,
   IconButton,
   Input,
   NativeSelect,
   Stack,
   Text,
   Textarea,
   VStack,
 } from "@chakra-ui/react";
 
 
 import * as z from 'zod';
 import {zodResolver} from '@hookform/resolvers/zod';
  import {useForm, Controller} from 'react-hook-form';
//  import { checkPersonExist } from '../../../../api/checkPersonExist';
 
import { useNavigate, useLocation } from 'react-router-dom';
import useThemedColors from '../../../../hooks/useThemedColors';
import FixBottomArea from '../../../../components/shared/FixBottomArea';
import Control from '../../../../components/shared/forms/Control';
import toast from 'react-hot-toast' ;
import BackArrow from '../../../../components/shared/BackArrow';
import { getBusinessOwnerByInsuranceNumber } from '../../../../api/businessOwner/getBusinessOwnerByInsuranceNumber';
import { useState } from 'react';
import BusinessGeneralFields from '../../../../components/shared/forms/business/BusinessGeneralFields';
import AddressFields from '../../../../components/shared/forms/business/AddressFields';
const EditBusinessContent = () => {
   
   const navigate = useNavigate();
   const location = useLocation();
   const itemData = location.state;
   
   const [contentLoaded , setContentLoaded] = useState({
      businessGeneralFields : false ,
      addressFields : false ,
   })
   const [businessOwnerName ,setBusinessOwnerName] = useState("");
   
   const {textPrimary, textSecondary} = useThemedColors();
   
   const formSchema = z.object({
      businessName: z.string().nonempty("business name can not be empty !"),
      commercialType: z.string().nonempty('commercial type can not be empty !'),
      stage: z.string().nonempty('stage can not be empty !'),
      status: z.string().nonempty('status can not be empty !'),
      lawInitiativeDate: z.date() ,
      
      bOwnerInsuranceNumber : z.number().nonnegative()
      .min(1,{message:"can not be empty"}).refine(async(val) => await handleViewBusinessOwnerName(val) , {
         message: "not a business owner"
      }),
      
      country: z.string().nonempty('country can not be empty !'),
      city: z.string().nonempty('city can not be empty !'),
      
      businessOwnerId :z.number(),

   });
   
   type FormValues = z.infer<typeof formSchema>;
   const {
      register,
      handleSubmit ,
      setValue,
      formState : {errors},
      control
   } = useForm<FormValues>({
      resolver : zodResolver(formSchema) ,
      defaultValues : {
         
         businessName: itemData.business_name,
         commercialType: itemData.commercial_type,
         stage: itemData.stage,
         status: itemData.status,
         lawInitiativeDate: new Date(itemData.law_initiative_date),

         bOwnerInsuranceNumber : itemData.Business_owners.personal_informations.insurance_number,

         country: itemData.country,
         city: itemData.state,

         // businessOwnerId :itemData.business_name,
         
      }
   });
   
   
   const saveBusiness = useMutation({
      mutationFn : (business) => fetch(`${host}/business/edit`,{method:'PUT', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify(business)}).then(res => res.json()) ,
      
      onSuccess: (response) => {
         if(response.status == 404 || response.status == 400){
            
            toast.error("somethng went wrong")
         } else if(response.status == 200) {
            navigate(-1)
            setTimeout(() => {
               toast.success('Business updated Successfuly !');
            }, 500);
         }
      },
   })
   
   const handleSaveBusiness = (data) => {
      const dataWithId = {...data , businesslId : itemData.business_id}      
      saveBusiness.mutate(dataWithId);
   }
   
   const handleViewBusinessOwnerName = async(val) => {
      
      let isBusinessOwner = false;
      const businessOwner = await getBusinessOwnerByInsuranceNumber(val);
      if(businessOwner)  {
         setBusinessOwnerName(`${businessOwner?.personal_informations?.first_name} ${businessOwner?.personal_informations?.father_name} ${businessOwner?.personal_informations?.last_name}`)
         
         setValue('businessOwnerId' ,businessOwner?.business_owner_id
         );
         console.log("businessOwner :",businessOwner?.business_owner_id);
         
         isBusinessOwner = true;
      }
      else {
         setBusinessOwnerName("");
      }
         return isBusinessOwner ;
   }
   return (
      <Flex flexDirection={'column'} maxHeight={'100vh'} overflowY={'scroll'}>
         
         <BackArrow />
         <Text color={textSecondary} textAlign={'center'} fontWeight={"500"}>
            Edit Business
         </Text>
         <Box>
            <Flex flexDirection={'row'} justifyContent={'center'} fontSize={'16px'}>
               
               <Text fontSize={'16px'} fontWeight={"500"}>
                  {businessOwnerName}
               </Text> 
            </Flex>
            <Flex textAlign={'center'}  >
               
            </Flex>
         </Box>
         
         <BusinessGeneralFields 
            setContentLoaded={setContentLoaded}
            register={register}
            errors={errors}
            Controller={Controller}
            control={control}
            onChangeBusinessOwner={handleViewBusinessOwnerName}
            businessOwnerName={businessOwnerName}
         />
         <AddressFields 
            setContentLoaded={setContentLoaded}
            errors={errors}
            Controller={Controller}
            control={control}
         />
         
         {
         (contentLoaded.businessGeneralFields && contentLoaded.addressFields)
         &&
         <Control click = {handleSubmit(handleSaveBusiness)} />
         }
         
         <FixBottomArea />
         
      </Flex> 
     )

}

export default EditBusinessContent;

 