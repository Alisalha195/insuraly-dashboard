import React, { useContext, useEffect, useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { VStack } from '@chakra-ui/react';
import SkeletonLoader from '../shared/Skeleton';
import { authContext } from '../../providers/AuthContextProvider';
import { useIsAdmin } from '../../hooks/useIsAdmin';

const ProtectedRoute = ({children, requiredRole }) => {
   
   const {authState, setAuthState} = useContext(authContext);
   const { isAdmin, isLoading } = useIsAdmin(authState.user?.email);
      
   if(authState.loading || isLoading) {
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
      return <Navigate to="/admin/login" replace={true} />;
   } 

    if (requiredRole === 'admin' && !isAdmin) {
      return <Navigate to="/user" replace={true} />; 
   }
   
   if (requiredRole === 'user' && isAdmin) {
      return <Navigate to="/dashboard" replace={true} />;
   }
   
  return children;
}

export default ProtectedRoute;