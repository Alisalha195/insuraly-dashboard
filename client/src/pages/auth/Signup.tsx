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
import { useNavigate } from "react-router-dom";
import { host } from "../../constants/connection";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import { useContext } from "react";
import { authContext } from "../../providers/AuthContextProvider";
import { signupSchema } from "../../utils/authSchema";
import LanguageToggleButton from "../../components/shared/header/LanguageToggleButton";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabaseClient";

const Signup = () => {
   
   const {authState, setAuthState} = useContext(authContext);
   const navigate = useNavigate();
   const { textPrimary, textSecondary , btnPrimary} = useThemedColors();
   const {t} = useTranslation();

   type FormValues = z.infer<typeof signupSchema>;
   const {
      register,
      handleSubmit,
      formState: { errors },
      control
   } = useForm<FormValues>({
      resolver: zodResolver(signupSchema),
      // defaultValues: {
      //    birthDate: new Date(Date.now())
      // },
      mode: 'onChange'
   });
   
   const signup = useMutation({
      mutationFn: (user) => fetch(`${host}/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) }).then(res => res.json()),

      onError: (error) => {
         console.log("error occured ! :", error)
      },
      // onSuccess: async (response) => {
      //    console.log("signup response :", response);
      //    if (response.status == 404 || response.status == 400) {
            
      //       toast.error("somethng went wrong")
      //    } else if (response.status == 200) {
            
      //       if(response?.session?.access_token && response?.session?.user && response?.session?.refresh_token) {
               
      //          const { error } = await supabase?.auth?.setSession({
      //             access_token: response?.session?.access_token,
      //             refresh_token: response?.session?.refresh_token,
      //          });
               
      //          if (error) {
      //             toast.error("somethng went wrong")
      //             console.log( error );
      //             return;
      //          }
               
      //          setAuthState({
      //             user: response.session.user,
      //             token: response.session.access_token,
      //             isAuthenticated: true,
      //             loading: false
      //          });

      //          navigate("/dashboard")
      //          setTimeout(() => {
      //             toast.success('signed up Successfuly !');
      //          }, 500);
      //       }
      //    } else if (response.status == 201) {
      //       setTimeout(() => {
      //          console.log("session from api ;",response)
      //          navigate("/dashboard")
      //          toast.success(response?.msg);
      //       }, 500);
      //    }
      // },
      onSuccess: async (response) => {
         console.log("Signup response:", response);
       
         // Safely check if a session block actually came back from your API
         if (response?.session?.access_token) {
           const { error } = await supabase.auth.setSession({
             access_token: response.session.access_token,
             refresh_token: response.session.refresh_token || response.session.access_token,
           });
       
           if (error) {
             console.error("Supabase session error:", error);
             toast.error("Session initialization failed");
             return;
           }
       
           setAuthState({
             user: response.session.user,
             token: response.session.access_token,
             isAuthenticated: true,
             loading: false,
           });
       
           navigate("/public/user");
           toast.success('Signed up successfully!');
         } else {
           // This triggers if response.session is null (e.g., status 201 Email confirmation needed)
           toast.error(response?.msg || "Account created! Please verify your email.");
           setAuthState(prev => ({...prev, loading: false}));
         }
       },
   })
   
   
   const handleSignup = (user) => {
      setAuthState(prev => ({...prev, loading: true}));
      
      if(authState?.user?.email !== user.email) {
         signup.mutate(user);
      } else {
         toast.error("you are already logged in !");
      }
      
   }
   return (
      <VStack 
       paddingTop={2}
       
      >
         <Text  mt={2} fontSize={"40px"} >
            INSURALY
         </Text>
         <HStack>
            <ColorModeToggleButton />
            <LanguageToggleButton />
         </HStack>
         {/* <PageHeadTitle 
            backButton={false}
            title={"Sign up"}
         /> */}
         <Text  mt={2} fontSize={{ xssToXs: '12px', xsToXm: "14px", xmToSm: "24px" }} >
            {t("Sign up")}
         </Text>
         <VStack 
            gap={"30px"} 
            // paddingTop={1} 
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
            <FieldGroup
               onchangeValue={null}
               register={register}
               name={'confirmPassword'}
               type={'password'}
               invalid={false}
               label="confirm password"
               placeholder="confirm password"
               error={errors.confirmPassword}
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
               onClick={handleSubmit(handleSignup)}
               // onClick={() => signup.mutate()}
            >
                  {t("Sign up")}
            </Button>
            <Text 
               color={textSecondary} 
               fontSize={{ xssToXs: "11px", xsToXm: "12px", xmToSm: "13px", smToMd: "14px", mdTo3xl: "16px" }}
               fontWeight={"500"}
            >
               {t("already have an account?")} 
               <Span marginLeft={1} style={{textDecoration: 'underline', cursor: 'pointer'}} color={btnPrimary}
                  onClick={() => navigate('/admin/login')}
               >
                  {t("log in")}
               </Span>
            </Text>
         </VStack>
      </VStack>
   )
}

export default Signup;