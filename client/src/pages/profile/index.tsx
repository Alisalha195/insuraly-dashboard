import React from 'react'
import ProfileContent from './ProfileContent'
import { useParams } from 'react-router-dom'

const Profile = ({personId}) => {
   // const {id} = useParams;
   const params = useParams();
  return (
    <ProfileContent personId={params?.personId} />
  )
}

export default Profile;