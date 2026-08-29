import { Box, Button, Flex, HStack, Icon, Menu, Popover, Portal, Text } from "@chakra-ui/react"
import UserAvatar from "../../shared/UserAvatar";
import { Link } from "@chakra-ui/react"
import { userMenuListData } from "./userMenuListData";
import useThemedColors from "../../../hooks/useThemedColors";
import { logout } from "../../../api/auth";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authContext } from "../../../providers/AuthContextProvider";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import useLangDir from "../../../hooks/useLangDir";

const UserMenu = () => {
   const { textPrimary, hovering, textSecondary } = useThemedColors();
   const {t} = useTranslation();
   const {isRTL} = useLangDir();
   
   const navigate = useNavigate();
   const {authState, setAuthState} = useContext(authContext);

   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const handleLogout = async () => {
      // console.log("in handle logout");
      setAuthState(prev => ({...prev, loading: true}));
      const status = await logout(authState.token);
      
      if(status == 200) {
         setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false
         });
         localStorage.removeItem("auth");
         navigate("/auth/login", {replace:true});

         toast.success('logout Done!')
      } else {
         toast.error('unable to logout !')
      }

   }
   
   const gotoProfile = () => {
      navigate("/profile/34");
   }
   
   if(authState.loading) return (<h1>Loading...</h1>)
   return (
      <Popover.Root open={isMenuOpen} onOpenChange={(e) => setIsMenuOpen(e.open)}>
         <Popover.Trigger asChild>
            <Button padding={0} border={'none'} outline={'none'} backgroundColor={'transparent'}>
               <UserAvatar />
            </Button>
         </Popover.Trigger>
         <Portal>
            <Popover.Positioner>
               <Popover.Content borderWidth={'1px'} maxWidth={{ xssToXs: "80vw", xsToXm: "70vw", xmToSm: "40vw", smToMd: "28vw", mdTo3xl: "20vw" }}>
                  {/* <Popover.Arrow /> */}
                  <Popover.Body paddingX={1} paddingY={0}>
                     {
                        userMenuListData.map((item, index) => (

                           (item.role == 'logout') 
                           ?
                           <Flex key={index} _hover={{ backgroundColor: hovering }} className=" btn  [border-radius:7px] text-[24px]" justifyContent={isRTL ? "end" : "start"} marginY={2} ps={1} paddingY={1}>

                              <Box className="hover:[text-decoration:none] " outline={'none'} border={'none'}
                              onClick={() => {handleLogout(); setIsMenuOpen(false)}}
                              >
                                  <Flex dir={isRTL ? "rtl" : "ltr"} alignItems={'center'} gapX={1} color={textSecondary}   >
                                    <Icon marginRight={1}><item.icon /></Icon>
                                    <Text>{t(item.text)}</Text>
                                 </Flex>
                              </Box>

                           </Flex>
                           :
                           <Flex 
                              key={index} 
                              _hover={{ backgroundColor: hovering }} 
                              className=" btn  [border-radius:7px] text-[24px]" 
                              justifyContent={isRTL ? "end" : "start"} 
                              marginY={2} 
                              paddingLeft={1} 
                              paddingY={1}
                              onClick={()=>{item.click(gotoProfile); setIsMenuOpen(false)}}
                           >

                              <Flex dir={isRTL ? "rtl" : "ltr"} alignItems={'center'} gapX={1} color={textSecondary}>
                                 <Icon marginRight={1}><item.icon /></Icon>
                                 <Text>{t(item.text)}</Text>
                              </Flex>

                           </Flex>
                        ))
                     }
                  </Popover.Body>
               </Popover.Content>
            </Popover.Positioner>
         </Portal>
      </Popover.Root>

   )

}

export default UserMenu;
