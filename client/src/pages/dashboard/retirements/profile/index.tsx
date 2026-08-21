import React from 'react'
import RetirementProfilePageContent from './RetirementProfilePageContent'
import { useParams } from 'react-router-dom';

const RetirementProfile = () => {
   const params = useParams();
  return (
    <RetirementProfilePageContent retirementID={params?.id}/>
  )
}

export default RetirementProfile;