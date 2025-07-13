
import useBusinessOwnerStore from "../../../store/useAddBusinessOwnerStore";
import FieldGroup from "./FieldGroup"
const EmailField = ({register, error}) => {
   // const {dataObject, setEmail} = data;
  return (
   <FieldGroup 
       onchangeValue={null}
       register={register}
       name={'email'} 
       type={'email'}
       invalid = {false} 
       label = "email" 
       placeholder = "email@a.com"
       error = {error}
       preInputText={null}
    />
  )
}

export default EmailField;