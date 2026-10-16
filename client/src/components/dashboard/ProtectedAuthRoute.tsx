
import { Box, Flex, HStack, Stack, VStack } from '@chakra-ui/react';

import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import SkeletonLoader from '../shared/Skeleton';
import { authContext } from '../../providers/AuthContextProvider';
import { useIsAdmin } from '../../hooks/useIsAdmin';

const ProtectedAuthRoute = ({children}) => {
   
   const navigate = useNavigate();
   
   const {authState, setAuthState} =useContext(authContext);
   const { isAdmin, isLoading: isRoleLoading } = useIsAdmin(authState.user?.email);
   
   //    channel.onmessage = (event) => {
   //       if(event.data === 'login') {
   //          // if(loggedIn) {
   //             navigate('/dashboard', {replace:true});
   //          // }  
   //       } 
         
   //    } 
   // },[authState.isAuthenticated]);
   
      if(authState.loading || (authState.isAuthenticated && isRoleLoading)) {
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
       
       if (authState.isAuthenticated) {
         return isAdmin ? <Navigate to="/dashboard" replace /> : <Navigate to="/user" replace />;
       }

      return children;
 }
 
 export default ProtectedAuthRoute;