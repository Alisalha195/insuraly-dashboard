import React from 'react'
import FieldGroup from './FieldGroup'
import useBusinessOwnerStore from '../../../store/useAddBusinessOwnerStore'

const PhoneNumberField = ({register,error}) => {
   // const {dataObject, setPhoneNumber} = data;
  return (
   <FieldGroup
      register={register}
      name={"phoneNumber"}
      type={'number'}
      invalid = {false} 
      preInputText = "+963"
      label = "phone number"
      placeholder = ""
      error = {error}
      
      // value={dataObject.phoneNumber}
      // setValue={setPhoneNumber}
      
   />
  )
}

export default PhoneNumberField