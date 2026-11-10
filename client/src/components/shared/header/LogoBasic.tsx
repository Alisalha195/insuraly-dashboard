import { useIsAdmin } from '@/hooks/useIsAdmin';
import { authContext } from '@/providers/AuthContextProvider';
import { Flex, Span } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const LogoBasic = () => {
   
   const navigate = useNavigate();
   const {authState, setAuthState} = useContext(authContext);
   const {isAdmin} = useIsAdmin(authState.user?.email);
  return (
      <Flex 
       justifyContent={'center'}
      //  onClick={()=>navigate("/dashboard")}
      onClick={()=>{
         if(isAdmin) {
            navigate("/dashboard");
         } else {
            navigate("/user");
         }
      }}
      
      >
       <Span
          backgroundColor={"#999"}
          borderTopLeftRadius={"8px"}
          borderBottomRightRadius={"8px"}
       >
          <Span
             fontSize={{xmDown:"19px"}} 
             className="btn [font-style:italic] [font-weight:bold]" 
             // color={logoText}
             maxWidth={'auto'}
             maxHeight={'auto'}
             // backgroundColor={logoBackground}
             // borderWidth={1}   
             // borderColor={logoText} 
             paddingX={2}
             // borderRadius="5px 12px 5px 12px"
             borderTopLeftRadius={"80px"}
             borderBottomRightRadius={"80px"}
             background="linear-gradient(90deg, #4A90E2, #50E3C2)"
             color={"#022d8e"}
             letterSpacing={"1px"}
             fontStyle={'italic'}
          >
             <Span fontStyle={'italic'}>
               I
             </Span>
             NSURAL
             <Span fontStyle={'italic'}>
               Y
             </Span>
          </Span>
       </Span>
      </Flex>
  )
}

export default LogoBasic