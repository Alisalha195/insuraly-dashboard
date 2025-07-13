import React from 'react'
// import FieldGroup from './FieldGroup'
import useBusinessOwnerStore from '../../../store/useAddBusinessOwnerStore'
import LimitedFieldGroup from './LimitedFieldGroup'
import { phoneNumberLimit } from '../../../constants/forms';

const PhoneNumberField = ({error, Controller, control}) => {
   
  return (
   <LimitedFieldGroup
      Controller={Controller}
      control={control}
      onchangeValue={null}
      name={"phoneNumber"}
      type={'number'}
      invalid = {false} 
      preInputText = "+963"
      label = "phone number"
      placeholder = ""
      error = {error}
      limit={phoneNumberLimit}
   />
  )
}

export default PhoneNumberField