import { Flex, Text, VStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import z from 'zod';
import BackArrow from '../../../components/shared/BackArrow';
import useThemedColors from '../../../hooks/useThemedColors';
import BasicFieldsSection from '../../../components/shared/forms/BasicFieldsSection';
import BirthFields from '../../../components/shared/forms/BirthFields';
import BirthRegistrationFields from '../../../components/shared/forms/BirthRegistrationFields';
import ContactFields from '../../../components/shared/forms/ContactFields';
import Control from '../../../components/shared/forms/Control';
import FixBottomArea from '../../../components/shared/FixBottomArea';
import PageHeadTitle from '../../../components/shared/PageHeadTitle';
import { host } from '../../../constants/connection';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkPersonExist } from '../../../api/checkPersonExist';
import { useCustomQuery } from '../../../hooks/useCustomQuery';
import SkeletonLoader from '../../../components/shared/Skeleton';
import Error from '../../../components/shared/Error';
import { PersonalSchemaFormData, PersonalSchema } from '../../../utils/personalSchema';

const EditProfileContent = () => {
   
   const {textSecondary} = useThemedColors();
   const navigate = useNavigate();
   
   const params = useParams()
   // const location = useLocation();
   // const itemData = location.state;
   
   const {data, error, isLoading, isSuccess } = useCustomQuery(
      [`personalInfo-${params?.personId}`], 
      `${host}/personalInformations/get/id?id=${params?.personId}` 
   );
   
   console.log("data", data?.person);  
   const personalSchema = PersonalSchema({checkPersonExist});
   
   const {
      register,
      handleSubmit,
      formState: { errors },
      control
   } = useForm<PersonalSchemaFormData>({
      resolver: zodResolver(personalSchema),
      values:(data && data?.person) ? {
         firstName: data?.person?.first_name ,
         lastName: data?.person?.last_name ,
         fatherName: data?.person?.father_name,
         motherName: data?.person?.mother_name,
         
         nationalNumber: data?.person?.national_number,
         
         birthDate: new Date(data?.person?.birth_date || Date.now()),
         birthLocation: data?.person?.birth_location,
         
         registrationLocation: data?.person?.birth_registration_place,
         
         registrationDigit: data?.person?.birth_registration_digit,
         
         phoneNumber: data?.person?.phone_number,
         email: data?.person?.email,
         gender: data?.person?.gender,
      } : {
         firstName:"" ,
         lastName: "" ,
         fatherName: "",
         motherName: "",
         
         nationalNumber:"",
         
         birthDate: new Date(Date.now()),
         birthLocation:"",
         
         registrationLocation:"",
         
         registrationDigit:"",
         
         phoneNumber:"",
         email:"",
         gender:"",
      } ,
       mode: 'onChange'
   });
   
   const saveInfo = useMutation({
      mutationFn : (info) => fetch(`${host}/personalInformations/edit?personID=${params?.personId}`,{method:'PUT', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify(info)}).then(res => res.json()) ,
      
      onSuccess: (response) => {
         if(response.status == 404 || response.status == 400){
            
            toast.error("somethng went wrong")
         } else if(response.status == 200) {
            navigate(-1)
            setTimeout(() => {
               toast.success('Personal Data updated Successfuly !');
            }, 500);
         }
      },
   });
   
   const handleSaveData = (data) => {
      // const dataWithId = {...data , personalId : itemData.personal_info_id
      // }      
      saveInfo.mutate(data);
   };
   
      
   if(isLoading) {
      return (
         <VStack justifyContent={'center'} height={'50vh'}>
            <SkeletonLoader width='60%'/>
            <SkeletonLoader width='50%'/>
            <SkeletonLoader width='60%' />
            <SkeletonLoader width='50%' />
            <SkeletonLoader width='60%' />
            <SkeletonLoader  width='50%' />
         </VStack>
      )
   } else if(error) { 
      return <Error message={"something went wrong"}/>
   }
   else if(isSuccess && data.person.personal_info_id) {
     return (
      <Flex flexDirection={'column'} maxHeight={'100vh'} overflowY={'scroll'}>
         {/* <BackArrow />
         <Text color={textSecondary} textAlign={'center'} fontWeight={"500"}>
            Edit Personal Data
         </Text> */}
         <PageHeadTitle
            backButton={true}
            title={ "Edit Personal Data"}
         />
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
            Controller ={Controller}
            control={control}
         />
      
         <Control click = {handleSubmit(handleSaveData)} />
      
      
         <FixBottomArea />
      </Flex> 
     )
  }
}

export default EditProfileContent;