import { Avatar } from "@chakra-ui/react";

const UserAvatar = () => {
   return (
     <Avatar.Root paddingY={0} className="btn " size={'xs'} >
       <Avatar.Fallback name="Segun Adebayo" />
       <Avatar.Image src="https://bit.ly/sage-adebayo" />
     </Avatar.Root>
   )
 }
 
 export default UserAvatar;