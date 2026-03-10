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
import { BusinessOwnerSchema, BusinessOwnerSchemaFormData } from '../../../../utils/businessOwnerSchema.ts';

const AddBusinessOwnerContent = () => {

   const { textPrimary, textSecondary } = useThemedColors();

   const businessOwnerSchema = BusinessOwnerSchema({checkPersonExist});
   
   const {
      register,
      handleSubmit,
      formState: { errors },
      control
   } = useForm<BusinessOwnerSchemaFormData>({
      resolver: zodResolver(businessOwnerSchema),
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

