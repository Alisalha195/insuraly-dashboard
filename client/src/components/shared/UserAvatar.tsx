import { Avatar, Box } from "@chakra-ui/react";
import { userAvatarSize } from "../../constants/images";

const UserAvatar = () => {
   // return (
   //    <Avatar.Root paddingY={0} className="btn " >
   //       <Avatar.Fallback name="Segun Adebayo" />
   //       <Avatar.Image src="https://bit.ly/sage-adebayo" />
   //    </Avatar.Root>
   // )

   return (
      <Box >
         <Box backgroundColor={"#f00"}
            borderRadius={'50%'}
            maxWidth={{ xssToXm: userAvatarSize.xs, xmToSm: userAvatarSize.sm, sm: userAvatarSize.md }}
            maxHeight={{ xssToXm: userAvatarSize.xs, xmToSm: userAvatarSize.sm }}
            overflow={'hidden'}
         >
            <img src="https://bit.ly/sage-adebayo" width={"100%"} height={"100%"} />
         </Box>
      </Box>
   )
}

export default UserAvatar;