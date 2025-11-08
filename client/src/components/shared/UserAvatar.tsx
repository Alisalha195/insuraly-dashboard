import { Avatar, Box } from "@chakra-ui/react";
import { userAvatarSize } from "../../constants/images";
import { Suspense } from "react";
import anonymous from "../../assets/anonymous.png"

const UserAvatar = () => {

   return (
      <Box >
         <Box
            borderRadius={'50%'}
            maxWidth={{ xssToXm: userAvatarSize.xs, xmToSm: userAvatarSize.sm, sm: userAvatarSize.sm }}
            maxHeight={{ xssToXm: userAvatarSize.xs, xmToSm: userAvatarSize.sm }}
            overflow={'hidden'}
         >
               <img src={anonymous || "https://bit.ly/sage-adebayo" } width={"100%"} height={"100%"} />
         </Box>
      </Box>
   )
}

export default UserAvatar;