
import { Box, Flex, HStack, Stack, VStack } from '@chakra-ui/react';

import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import SkeletonLoader from '../shared/Skeleton';
import { authContext } from '../../providers/AuthContextProvider';

const ProtectedAuthRoute = ({children}) => {
   
   const navigate = useNavigate();
   // const access_token = useAuthStore((state) => state.token);
   // const loading = useAuthStore((state) => state.loading);
   // const setUser = useAuthStore((state) => state.setUser);
   // const setToken = useAuthStore((state) => state.setToken);
   // const loggedIn = useAuthStore((state) => !!state.token);
   // const authState = useAuthStore((state) => state);
   // let isAuthenticated = useAuthStore((state) => state.isAuthenticated);
   
   const {authState, setAuthState} = useContext(authContext);

   // useEffect(()=>{
   //    const channel = new BroadcastChannel('auth');
      
   
   //    channel.onmessage = (event) => {
   //       if(event.data === 'login') {
   //          // if(loggedIn) {
   //             navigate('/dashboard', {replace:true});
   //          // }  
   //       } 
         
   //    } 
   // },[authState.isAuthenticated]);
   
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
       if(authState.isAuthenticated) {
        return <Navigate to="/dashboard" replace={true} />;
      }
      return children;
 }
 
 export default ProtectedAuthRoute;