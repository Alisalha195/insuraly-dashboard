//--imports--
   import {useMutation } from '@tanstack/react-query';
   import * as z from 'zod';
   import {zodResolver} from '@hookform/resolvers/zod';
   import { host } from '../../../../constants/connection.ts';
   import { Box,  Flex, Span, Text, VStack,} from "@chakra-ui/react";
   import { useNavigate, useNavigation } from 'react-router-dom';
   import {useForm, Controller} from 'react-hook-form';
   import useThemedColors from '../../../../hooks/useThemedColors';
   import FixBottomArea from '../../../../components/shared/FixBottomArea';
   import Control from '../../../../components/shared/forms/Control';
   import toast from 'react-hot-toast' ;
   import {  useState } from 'react';
   import BackArrow from '../../../../components/shared/BackArrow';
   import BusinessGeneralFields from '../../../../components/shared/forms/business/BusinessGeneralFields';
   import AddressFields from '../../../../components/shared/forms/business/AddressFields';
   import { getBusinessOwnerByInsuranceNumber } from '../../../../api/businessOwner/getBusinessOwnerByInsuranceNumber';
   import { BusinessSchema } from '../../../../utils/businessSchema.ts';
   import PageHeadTitle from '../../../../components/shared/PageHeadTitle.tsx';
   import { capitalize } from '../../../../lib/capitalize.ts';
   import SkeletonLoader from '../../../../components/shared/Skeleton.tsx';


const AddBusinessContent = () => {
   
   const navigate = useNavigate();
   const [contentLoaded , setContentLoaded] = useState({
      businessGeneralFields : false ,
      addressFields : false ,
   })
   
   const [businessOwner ,setBusinessOwner] = useState({});
   const [businessOwnerName ,setBusinessOwnerName] = useState("");
   const {textPrimary, textSecondary, btnGreen} = useThemedColors();
   
   const handleViewBusinessOwnerName = async(val) => {
      
      let isBusinessOwner = false;
      const businessOwner = await getBusinessOwnerByInsuranceNumber(val);
      if(businessOwner)  {
         
         setBusinessOwnerName(`${capitalize(businessOwner?.personal_informations?.first_name)} ${capitalize(businessOwner?.personal_informations?.father_name)} ${capitalize(businessOwner?.personal_informations?.last_name)}`)
         
         setBusinessOwner(businessOwner);
         
         setValue('businessOwnerId' ,businessOwner?.business_owner_id
         );
         console.log("businessOwner :",businessOwner?.business_owner_id);
         
         isBusinessOwner = true;
      }
      else {
         setBusinessOwnerName("");
         setBusinessOwner({});
      }
         return isBusinessOwner ;
   }
   
   const businessSchema = BusinessSchema({handleViewBusinessOwnerName});
   
   type FormValues = z.infer<typeof businessSchema>;
   const {
      register,
      handleSubmit ,
      watch ,
      setValue,
      formState : {errors},
      control ,
      trigger
   } = useForm<FormValues>({
      resolver : zodResolver(businessSchema) ,
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
   
   const saveBusiness = useMutation({
      mutationFn : (business) => fetch(`${host}/business/create`,{method:'POST', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify(business)}).then(res => res.json()) ,
      
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
      // saveBusiness.mutate({...data, lawInitiativeDate: new Date(data.lawInitiativeDate.toISOString())});
      saveBusiness.mutate(data);
   }
   
  return (
   <Flex flexDirection={'column'} maxHeight={'100vh'} overflowY={'scroll'}>
      
      {
         (contentLoaded.businessGeneralFields && contentLoaded.addressFields)
         ? 
         <>
            <PageHeadTitle
               backButton={true}
               title={"New Business"}
            />
         
         </>
         :    <VStack justifyContent={'center'} height={'50vh'}>
                  <SkeletonLoader width='60%'/>
                  <SkeletonLoader width='50%'/>
               </VStack>
      }
      
      <Box>
         <Flex flexDirection={'row'}  fontSize={'16px'}>
            <Span marginRight={1} >owner :</Span>
            <Text className='btn' 
               // _hover={{color : "#F00"}}
               fontSize={'16px'} 
               fontWeight={"500"} 
               color={btnGreen} 
               onClick={()=> navigate(`/profile/${businessOwner?.personal_informations?.personal_info_id}`)}
            >
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

 