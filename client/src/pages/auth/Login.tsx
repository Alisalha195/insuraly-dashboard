import { Button, HStack, Span, Text, VStack } from "@chakra-ui/react";
import PageHeadTitle from "../../components/shared/PageHeadTitle";
import FieldGroup from "../../components/shared/forms/FieldGroup";
import useThemedColors from '../../hooks/useThemedColors';
import { z } from "zod";
import { checkPersonExist } from "../../api/checkPersonExist";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmailField from "../../components/shared/forms/EmailField";
import ColorModeToggleButton from "../../components/shared/header/ColorModeToggleButton";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { host } from "../../constants/connection";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import { useContext, useEffect } from "react";
import { authContext } from "../../providers/AuthContextProvider";
import { loginSchema } from "../../utils/authSchema";
// import { useAuthContext } from "../../providers/AuthContextProvider";

const Login = () => {
   
   const {authState, setAuthState} = useContext(authContext);
   const navigate = useNavigate();
   const { textPrimary, textSecondary , btnPrimary} = useThemedColors();

   // useEffect(()=>{
   //    const channel = new BroadcastChannel('auth');
      
   
   //    channel.onmessage = (event) => {
   //       if(event.data === 'login') {
   //          // if(loggedIn) {
   //             navigate('/dashboard', {replace:true});
   //          // }  
   //       } 
         
   //    } 
   // },[JSON.parse( localStorage.getItem('auth'))]);

   type FormValues = z.infer<typeof loginSchema>;
   const {
      register,
      handleSubmit,
      formState: { errors },
      control
   } = useForm<FormValues>({
      resolver: zodResolver(loginSchema),
      // defaultValues: {
      //    birthDate: new Date(Date.now())
      // },
      mode: 'onChange'
   });
   
   const login = useMutation({
      mutationFn: (user) => fetch(`${host}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) }).then(res => res.json()),

      onError: (error) => {
         console.log("error occured ! :", error)
      },
      onSuccess: (response) => {
         if (response.status == 404 || response.status == 400) {

            toast.error("somethng went wrong")
         } else if (response.status == 200) {
            
            if(response?.session?.access_token && response?.session?.user) {
               
               setAuthState({
                  user: response.session.user,
                  token: response.session.access_token,
                  isAuthenticated: true,
                  loading: false
               });
               localStorage.setItem('auth', JSON.stringify({
                  user: response.session.user,
                  token: response.session.access_token,
                  isAuthenticated: true,
                  loading: false
               }));
               // const channel = new BroadcastChannel('auth');
               // channel.postMessage("login");
               // channel.close();
               
               navigate("/dashboard", {replace:true});
               
               setTimeout(() => {
                  toast.success('logged in Successfuly !');
               }, 500);
            }
         }
      },
      
   })
   
   const handleLogin = (user) => {
      
      setAuthState(prev => ({...prev, loading: true}));
      // console.log("user.email :",user.email)
      // console.log("authState?.user?.email :",authState?.user?.email)
      
      if(authState?.user?.email !== user.email) {
         login.mutate(user);
      } else {
         toast.error("you are already logged in !");
      }

   }
   
   return (
      <VStack 
       paddingTop={2}
       
      >
         <HStack>
            <ColorModeToggleButton />
         </HStack>
         <PageHeadTitle 
            backButton={false}
            title={"Log in"}
         />
         <VStack 
            gap={"30px"} 
            paddingTop={2} 
            backgroundColor={"transparent"} 
            width={{xssToXs: "96%", xsToXm: "94%", xmToSm: "90%", smToMd: "70%", mdTo3xl: "60%" }}
         >
            <EmailField
               register={register}
               error={errors.email}
            />
            <FieldGroup
               onchangeValue={null}
               register={register}
               name={'password'}
               type={'password'}
               invalid={false}
               label="password"
               placeholder="password"
               error={errors.password}
               preInputText={null}
            />
            <Button 
               width={'100%'} 
               height={'auto'}
               fontSize={{ xssToXs: "11px", xsToXm: "12px", xmToSm: "13px", smToMd: "14px", mdTo3xl: "16px" }}
               paddingY={{ xssToXs: "3px", xsToXm: "4px", xmToSm: "5px", smToMd: "5px", mdTo3xl: "6px" }}
               paddingX={2}
               backgroundColor={btnPrimary} 
               color={"#eee"}
               onClick={handleSubmit(handleLogin)}
            >
                  Log in
            </Button>
            <Text 
               color={textSecondary} 
               fontSize={{ xssToXs: "11px", xsToXm: "12px", xmToSm: "13px", smToMd: "14px", mdTo3xl: "16px" }}
               fontWeight={"500"}
            >
               do not you have an account? create a new one 
               <Span marginLeft={1} style={{textDecoration: 'underline', cursor: 'pointer'}} color={btnPrimary}
                  onClick={() => navigate('/auth/signup')}
               >
                  sign up
               </Span>
            </Text>
         </VStack>
      </VStack>
   )
}

export default Login;