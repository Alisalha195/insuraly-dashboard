import {useMutation } from '@tanstack/react-query';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { checkPersonExist } from '../../../../api/checkPersonExist';

import {
   Box,
   Button,
   Field,
   Fieldset,
   Flex,
   For,
   HStack,
   Input,
   NativeSelect,
   Stack,
   Text,
   Textarea,
   VStack,
 } from "@chakra-ui/react";
 import { useNavigate } from 'react-router-dom';
 import {useForm, Controller} from 'react-hook-form';
import useThemedColors from '../../../../hooks/useThemedColors';
import BirthFields from '../../../../components/shared/forms/BirthFields';
import FixBottomArea from '../../../../components/shared/FixBottomArea';
import BirthRegistrationFields from '../../../../components/shared/forms/BirthRegistrationFields';
import ContactFields from '../../../../components/shared/forms/ContactFields';
import Control from '../../../../components/shared/forms/Control';
import BasicFieldsSection from '../../../../components/shared/forms/BasicFieldsSection';
import useAddBusinessOwnerStore from '../../../../store/useAddBusinessOwnerStore';

import toast from 'react-hot-toast' ;
import { useEffect, useState } from 'react';
import BackArrow from '../../../../components/shared/BackArrow';
import BusinessGeneralFields from '../../../../components/shared/forms/business/BusinessGeneralFields';
import AddressFields from '../../../../components/shared/forms/business/AddressFields';
import { getBusinessOwnerByInsuranceNumber } from '../../../../api/businessOwner/getBusinessOwnerByInsuranceNumber';

const AddBusinessContent = () => {
   
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
         lawInitiativeDate: new Date(Date.now()),
         country: "Syria",
         city: "Damascus Governorate",
         status:"active",
         stage:"1",
         commercialType:"food/resturants"
      },
      mode:'onChange'
   });
   
   const navigate = useNavigate();
   
   const saveBusiness = useMutation({
      mutationFn : (business) => fetch("http://localhost:5000/business/create",{method:'POST', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify(business)}).then(res => res.json()) ,
      
      onError : (error) => {
         console.log("error occured ! :",error)
      },
      onSuccess: (response) => {
         if(response.status == 404 || response.status == 400){
            
            toast.error("somethng went wrong")
         } else if(response.status == 200) {
            navigate(-1)
            setTimeout(() => {
               toast.success('Business Added Successfuly !');
            }, 1000);
         }
      },
   })
   
   const handleSaveBusiness = (data) => {
      saveBusiness.mutate(data);
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
         
         {
            (contentLoaded.businessGeneralFields && contentLoaded.addressFields)
            ? 
            <>
               <BackArrow />
               <Text color={textSecondary} textAlign={'center'} fontWeight={"500"}>
                  New Business
               </Text>
            
            </>
            : <p>Loading....</p>
         }
         
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

export default AddBusinessContent;

 