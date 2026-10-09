import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient';

const initState = {
   authState : {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false
   },
   setAuthState: (authState) => {}
}

export const authContext = createContext(initState);

const AuthContextProvider = ({children}) => {
   
   // const [authState , setAuthState] = useState<typeof initState>(
   //    () => {
   //       const storedAuth = localStorage.getItem('auth');
   //       return storedAuth ? JSON.parse(storedAuth) : initState;
   //    }
   // );
   
   const [authState , setAuthState] = useState({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: true
   });
   /*
   useEffect(() => {
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
         if (event === 'SIGNED_IN') {
            setAuthState({
               user: session?.user || null,
               token: session?.access_token || null,
               isAuthenticated: true,
               loading: false
            });
            localStorage.setItem('auth', JSON.stringify({
               user: session?.user || null,
               token: session?.access_token || null,
               isAuthenticated: true,
               loading: false
            }));  
         }
         if (event === 'SIGNED_OUT') {
            setAuthState({
               user: null,
               token: null,
               isAuthenticated: false,
               loading: false
            });
            localStorage.removeItem('auth');
         }
      });

      return () => {
         authListener?.unsubscribe();
      };
   }, []);
   */
  
   useEffect(() => {
      const initializeAuth = async () => {
         try {
            const { data: { session } } = await supabase.auth.getSession();
            setAuthState({
               user: session?.user || null,
               token: session?.access_token || null,
               isAuthenticated: !!session,
               loading: false
            });
            
         } catch (error) {
            console.error('Error initializing auth:', error);
         }
      }
      initializeAuth();
      
      const {data : {subscription}} = supabase.auth.onAuthStateChange((_event, currentSession) => {
         setAuthState({
            user: currentSession?.user || null,
            token: currentSession?.access_token || null,
            isAuthenticated: !!currentSession,
            loading: false
         });
      });
      return () => {
         subscription?.unsubscribe();
      }
   },[]);
   
   return (
      <authContext.Provider value={{
         authState ,
         setAuthState
      }}>
         {children}
      </authContext.Provider>
   )
}
export default AuthContextProvider;

// export const useAuthContext = useContext(authContext);