import React from 'react'
import AdminProfilePageContent from './AdminProfilePageContent'
import { useAuthPostCustomQuery } from '@/hooks/useCustomQuery';
import { host } from '@/constants/connection';

const AdminProfile = () => {
   
   // const { data, error, isSuccess ,isLoading, refetch } = useAuthPostCustomQuery(`insuranceNumber-${"alisalha1weqweqweqw95@gmail.com"}`, `${host}/personalInformations/getInsuranceNumberByEmail`, {email: "alisalha1weqweqweqw95@gmail.com"},);
  
   // console.log("insyrance number in (useInsuranceNumber) :",data)
   
   const { data:businessesData, error:businessesError, isSuccess:businessesSuccess ,isLoading:businessesLoading } = useAuthPostCustomQuery([`Businesses-list-${"alisalha1weqweqweqw95@gmail.com"}`], `${host}/businessOwners/getBusinessesByEmail`, {email: "alisalha1weqweqweqw95@gmail.com"},);
          
      console.log("businessesData", businessesData);
      
   
      const { data:servicesData, error:servicesError, isSuccess:servicesSuccess ,isLoading:servicesLoading } = useAuthPostCustomQuery([`Services-list-${"alisalha1weqweqweqw95@gmail.com"}`], `${host}/services/getServicesByEmail`, {email: "alisalha1weqweqweqw95@gmail.com"},);
      
         console.log("servicesData", servicesData);
   
  return (
    <AdminProfilePageContent />
  )
}

export default AdminProfile;