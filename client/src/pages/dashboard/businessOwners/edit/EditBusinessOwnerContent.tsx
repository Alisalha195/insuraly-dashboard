import {useMutation } from '@tanstack/react-query';
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
 import { checkPersonExist } from '../../../../api/checkPersonExist';
 
 import { useNavigate, useLocation } from 'react-router-dom';
import useThemedColors from '../../../../hooks/useThemedColors';
import BirthFields from '../../../../components/shared/forms/BirthFields';
import FixBottomArea from '../../../../components/shared/FixBottomArea';
import BirthRegistrationFields from '../../../../components/shared/forms/BirthRegistrationFields';
import ContactFields from '../../../../components/shared/forms/ContactFields';
import Control from '../../../../components/shared/forms/Control';
import BasicFieldsSection from '../../../../components/shared/forms/BasicFieldsSection';
import useBusinessOwnerStore from '../../../../store/useAddBusinessOwnerStore';

import toast from 'react-hot-toast' ;
import BackArrow from '../../../../components/shared/BackArrow';


const EditBusinessOwnerContent = () => {
   
   const navigate = useNavigate();
   const location = useLocation();
   const itemData = location.state;
   
   const {textPrimary, textSecondary} = useThemedColors();
   
   const formSchema = z.object({
      firstName: z.string().nonempty('first name can not be empty !'),
      lastName: z.string().nonempty('last name can not be empty !'),
      fatherName: z.string().nonempty('father name can not be empty !'),
      motherName: z.string().nonempty('mother name can not be empty !'),
      
      nationalNumber : z.number().refine((val) => val.toString().length === 11, {
         message: 'national number must be 11 digits !'
      })
      .refine(async(val) =>  {
         if(itemData.personal_informations.national_number != val) {
            const personExist =  await checkPersonExist('national_number',val);
            return personExist;
         }
         return true;
           
      } , {
         message: 'national number is used by another person !'
      }),
      
      gender: z.string() ,
      
      birthDate: z.date() ,
      birthLocation: z.string().nonempty('birth location can not be empty !') ,
      registrationLocation : z.string().nonempty('registration location can not be empty !') ,
      registrationDigit : z.string().nonempty('registration digit can not be empty !') ,
      
      phoneNumber: z.number().refine((val) => val.toString().length === 9, {
         message: 'phone number must be 9 digits !'
      }).refine(async(val) => { 
         if(itemData.personal_informations.phone_number != val) {
            const personExist =  await checkPersonExist('phone_number',val);
            return personExist;
         }
         return true;
         
      } , {
      message: 'phone number is used by another person !'
      }),
      
      
      email : z.string().email({
         message: 'please enter a valid email address !'
      }).nonempty('email can not be empty !').refine(async(val) => { 
         if(itemData.personal_informations.email != val ) {
            const personExist = await checkPersonExist('email',val);
            return personExist;
         }
         return true;
         
         } , {
         message: 'email is used by another person !'
      }),

   });
   
   type FormValues = z.infer<typeof formSchema>;
   const {
      register,
      handleSubmit ,
      formState : {errors},
      control
   } = useForm<FormValues>({
      resolver : zodResolver(formSchema) ,
      defaultValues : {
         firstName:itemData.personal_informations.first_name ,
         lastName:itemData.personal_informations.last_name ,
         fatherName:itemData.personal_informations.father_name ,
         motherName:itemData.personal_informations.mother_name ,
         
         nationalNumber:itemData.personal_informations.national_number ,
         
         birthDate: new Date(itemData.personal_informations.birth_date) ,
         birthLocation: itemData.personal_informations.birth_location ,
         
         registrationLocation : itemData.personal_informations.birth_registration_place ,
         
         registrationDigit : itemData.personal_informations.birth_registration_digit ,
         
         phoneNumber : itemData.personal_informations.phone_number ,
         email : itemData.personal_informations.email ,
         gender:itemData.personal_informations.gender ,
         
         
      }
   });
   
   
   const saveBusinessOwner = useMutation({
      mutationFn : (businessOwner) => fetch("http://localhost:5000/businessOwners/edit",{method:'PUT', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify(businessOwner)}).then(res => res.json()) ,
      
      onSuccess: (response) => {
         if(response.status == 404 || response.status == 400){
            
            toast.error("somethng went wrong")
         } else if(response.status == 200) {
            navigate(-1)
            setTimeout(() => {
               toast.success('Business Owner updated Successfuly !');
            }, 500);
         }
      },
   })
   
   const handleSaveBusinessOwner = (data) => {
      const dataWithId = {...data , personalId : itemData.personal_info_id
      }      
      saveBusinessOwner.mutate(dataWithId);
   }
  return (
   <Flex flexDirection={'column'} maxHeight={'100vh'} overflowY={'scroll'}>
      <BackArrow />
      <Text color={textSecondary} textAlign={'center'} fontWeight={"500"}>
         Edit Business Owner
      </Text>
      <BasicFieldsSection 
         register = {register}
         Controller ={Controller}
         control={control}
         errors={errors }
      />
      
      <BirthFields 
         register = {register}
         Controller ={Controller}
         control={control}
         errors={errors}
      />
      
      
      
      <BirthRegistrationFields 
         register = {register}
         errors={errors}
      
      />
      
      <ContactFields 
         register = {register}
         errors={errors}
      />
      
      <Control click = {handleSubmit(handleSaveBusinessOwner)} />
      
      
      <FixBottomArea />
   </Flex> 
  )

}

export default EditBusinessOwnerContent;

 