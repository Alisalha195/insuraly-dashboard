import { useMutation } from '@tanstack/react-query';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkPersonExist } from '../../../../api/checkPersonExist';
import { host } from "../../../../constants/connection.ts"

import {
   Box, Button, Field, Fieldset, Flex, For, HStack, Input, NativeSelect, Stack, Text, Textarea, VStack,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import useThemedColors from '../../../../hooks/useThemedColors';
import BirthFields from '../../../../components/shared/forms/BirthFields';
import FixBottomArea from '../../../../components/shared/FixBottomArea';
import BirthRegistrationFields from '../../../../components/shared/forms/BirthRegistrationFields';
import ContactFields from '../../../../components/shared/forms/ContactFields';
import Control from '../../../../components/shared/forms/Control';
import BasicFieldsSection from '../../../../components/shared/forms/BasicFieldsSection';
import useAddBusinessOwnerStore from '../../../../store/useAddBusinessOwnerStore';

import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import BackArrow from '../../../../components/shared/BackArrow';

const AddBusinessOwnerContent = () => {

   const { textPrimary, textSecondary } = useThemedColors();

   const formSchema = z.object({
      firstName: z.string().nonempty('first name can not be empty !'),
      lastName: z.string().nonempty('last name can not be empty !'),
      fatherName: z.string().nonempty('father name can not be empty !'),
      motherName: z.string().nonempty('mother name can not be empty !'),

      nationalNumber: z.number().refine((val) => val.toString().length === 11, {
         message: 'national number must be 11 digits !'
      }).refine(async (val) => await checkPersonExist('national_number', val), {
         message: 'national number is used by another person !'
      }),

      gender: z.string(),

      // birthDate: z.date(),
      birthDate: z.date(),

      birthLocation: z.string().nonempty('birth location can not be empty !'),
      registrationLocation: z.string().nonempty('registration location can not be empty !'),
      registrationDigit: z.string().nonempty('registration digit can not be empty !'),

      phoneNumber: z.number().refine((val) => val.toString().length === 9, {
         message: 'phone number must be 9 digits !'
      }).refine(async (val) => await checkPersonExist('phone_number', val), {
         message: 'phone number is used by another person !'
      }),


      email: z.string().email({
         message: 'please enter a valid email address !'
      }).nonempty('email can not be empty !').refine(async (val) => await checkPersonExist('email', val), {
         message: 'email is used by another person !'
      }),

   })

   type FormValues = z.infer<typeof formSchema>;
   const {
      register,
      handleSubmit,
      formState: { errors },
      control
   } = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         birthDate: new Date(Date.now())
      },
      mode: 'onChange'
   });

   const navigate = useNavigate();

   const saveBusinessOwner = useMutation({
      mutationFn: (businessOwner) => fetch(`${host}/businessOwners/create`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(businessOwner) }).then(res => res.json()),

      onError: (error) => {
         console.log("error occured ! :", error)
      },
      onSuccess: (response) => {
         if (response.status == 404 || response.status == 400) {

            toast.error("somethng went wrong")
         } else if (response.status == 200) {
            navigate(-1)
            setTimeout(() => {
               toast.success('Business Owner Added Successfuly !');
            }, 500);
         }
      },
   })

   const handleSaveBusinessOwner = (data) => {
      saveBusinessOwner.mutate(data);
   }

   return (
      <Flex flexDirection={'column'} maxHeight={'100vh'} overflowY={'scroll'}>
         <BackArrow />
         <Text color={textSecondary} textAlign={'center'} fontWeight={"500"}>
            New Business Owner
         </Text>

         <BasicFieldsSection
            register={register}
            Controller={Controller}
            control={control}
            errors={errors}
         />

         <BirthFields
            register={register}
            Controller={Controller}
            control={control}
            errors={errors}
         />

         <BirthRegistrationFields
            register={register}
            errors={errors}
         />

         <ContactFields
            register={register}
            errors={errors}

            Controller={Controller}
            control={control}
         />

         <Control click={handleSubmit(handleSaveBusinessOwner)} />


         <FixBottomArea />
      </Flex>
   )

}

export default AddBusinessOwnerContent;

