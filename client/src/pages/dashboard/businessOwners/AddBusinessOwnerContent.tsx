import {useMutation } from '@tanstack/react-query';
import {
   Box,
   Button,
   Field,
   Fieldset,
   Flex,
   For,
   Input,
   NativeSelect,
   Stack,
   Text,
   Textarea,
   VStack,
 } from "@chakra-ui/react";
 import { useNavigate } from 'react-router-dom';
import useThemedColors from '../../../hooks/useThemedColors';
import BirthFields from '../../../components/shared/forms/BirthFields';
import FixBottomArea from '../../../components/shared/FixBottomArea';
import BirthRegistrationFields from '../../../components/shared/forms/BirthRegistrationFields';
import ContactFields from '../../../components/shared/forms/ContactFields';
import Control from '../../../components/shared/forms/Control';
import BasicFieldsSection from '../../../components/shared/forms/BasicFieldsSection';
import useBusinessOwnerStore from '../../../store/useBusinessOwnerStore';

import toast from 'react-hot-toast' ;
const AddBusinessOwnerContent = () => {
   
   const navigate = useNavigate();
   const {businessOwner } = useBusinessOwnerStore();
   
   const saveBusinessOwner = useMutation({
      mutationFn : (businessOwner) => fetch("http://localhost:5000/businessOwners/create",{method:'POST', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify(businessOwner)}).then(res => res.json()) ,
      
      onSuccess: (data) => {
         toast.success('Business Owner Added Successfuly !');
      }
   })
   
   const handleSaveBusinessOwner = () => {
      console.log("businessOwner :",businessOwner)
      
      saveBusinessOwner.mutate(businessOwner);
      // navigate(-1)
      
   }
   
  const {textPrimary, textSecondary} = useThemedColors();
  return (
   <Flex flexDirection={'column'} maxHeight={'100vh'} overflowY={'scroll'}>
      <Text color={textSecondary} textAlign={'center'} fontWeight={"500"}>
         New Business Owner
      </Text>
      <BasicFieldsSection />
      <BirthFields />
      <BirthRegistrationFields />
      <ContactFields />
      
      <Control click = {handleSaveBusinessOwner} />
      
      
      <FixBottomArea />
   </Flex> 
  )

// return (
//    <div>
//       <h1>Age : {user.age}</h1>
//       <button onClick={incrementAge}>+</button>
//       <button onClick={decrementAge}>-</button>
//       {/* <button onClick={reset}>reset</button> */}
//    </div>
// )
}

export default AddBusinessOwnerContent;

 