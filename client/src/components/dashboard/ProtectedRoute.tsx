import React, { useContext, useEffect, useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { VStack } from '@chakra-ui/react';
import SkeletonLoader from '../shared/Skeleton';
import { authContext } from '../../providers/AuthContextProvider';

const ProtectedRoute = ({children}) => {
   
   const {authState, setAuthState} = useContext(authContext);
   
   // const navigate = useNavigate(); 
   // const access_token = useAuthStore((state) => state.token);
   // let isAuthenticated = useAuthStore((state) => state.isAuthenticated);
   // const authState = useAuthStore((state) => state);
   // const loggedIn = useAuthStore((state) => !!state.token);
   // const loading = useAuthStore((state) => state.loading);
      
   if(authState.loading) {
      return (
         <VStack justifyContent={'center'} height={'50vh'}>
            <SkeletonLoader width='60%'/>
            <SkeletonLoader width='50%'/>
            <SkeletonLoader width='60%' />
            <SkeletonLoader width='50%' />
            <SkeletonLoader width='60%' />
            <SkeletonLoader  width='50%' />
         </VStack>
      )
   }
    
   if(!authState.isAuthenticated) {
      return <Navigate to="/auth/login" replace={true} />;
    }
  return children;
}

export default ProtectedRoute;