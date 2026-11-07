import React from 'react'
import AdminProfilePageContent from './AdminProfilePageContent'
import { useAuthPostCustomQuery } from '@/hooks/useCustomQuery';
import { host } from '@/constants/connection';

const AdminProfile = () => {
   
   const { data, error, isSuccess ,isLoading, refetch } = useAuthPostCustomQuery(`insuranceNumber-${"alisalha1weqweqweqw95@gmail.com"}`, `${host}/personalInformations/getInsuranceNumberByEmail`, {email: "alisalha1weqweqweqw95@gmail.com"},);
  
   console.log("insyrance number in (useInsuranceNumber) :",data)
   
   // const { data:retirementCountData, error:retirementCountError, isSuccess:retirementCountSuccess ,isLoading:retirementCountLoading } = useAuthPostCustomQuery(`Retirement-salary-${"alisalha1weqweqweqw95@gmail.com"}`, `${host}/retirement/getRetirementSalaryAmountByEmail`, {email: "alisalha1weqweqweqw95@gmail.com"},);
   
   // console.log("retirementCountData in (insurance tab) :",retirementCountData)
   
   // const { data:businessesCountData, error:businessesCountError, isSuccess:businessesCountSuccess ,isLoading:businessesCountLoading } = useAuthPostCustomQuery(`Businesses-count-${"alisalha1weqweqweqw95@gmail.com"}`, `${host}/businessOwners/getBusinessesCountByEmail`, {email: "alisalha1weqweqweqw95@gmail.com"});
   
   // console.log("retirementCountData in (insurance tab) :",businessesCountData)
   
   // const { data:servicesCountData, error:servicesCountError, isSuccess:servicesCountSuccess ,isLoading:servicesCountLoading } = useAuthPostCustomQuery(`Services-count-${"alisalha1weqweqweqw95@gmail.com"}`, `${host}/services/getServicesCountByEmail`, {email: "alisalha1weqweqweqw95@gmail.com"});
   
   // console.log("servicesCountData in (insurance tab) :",servicesCountData)
   
   // const { data:retirementData, error:retirementError, isSuccess:retirementSuccess ,isLoading:retirementLoading } = useAuthPostCustomQuery(`Retirement-salary-${"alisalha1weqweqweqw95@gmail.com"}`, `${host}/retirement/getRetirementSalaryByEmail`, {email: "alisalha1weqweqweqw95@gmail.com"},);
   
   // console.log("retirementData in (retirement salary tab) :",retirementData)
   
  return (
    <AdminProfilePageContent />
  )
}

export default AdminProfile;