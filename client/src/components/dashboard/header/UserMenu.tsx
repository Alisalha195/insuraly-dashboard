import { Button, Flex, Popover, Portal } from "@chakra-ui/react"
import UserAvatar from "../../shared/UserAvatar";
import { Link } from "@chakra-ui/react"
import { userMenuListData } from "./userMenuListData";
import useThemedColors from "../../../hooks/useThemedColors";

const UserMenu = () => {
   const {textPrimary, hovering} = useThemedColors();  
  return (
   <Popover.Root>
      <Popover.Trigger asChild>
      <Button padding={0} border={'none'} outline={'none'} backgroundColor={'transparent'}> 
          <UserAvatar />
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content width={'40vw'} borderWidth={'1px'} borderColor={textPrimary}>
            {/* <Popover.Arrow /> */}
            <Popover.Body >
            {
               userMenuListData.map((item , index)=>(
                  <Flex key={index} _hover={{backgroundColor:hovering}} className=" btn  [border-radius:7px] text-[24px]"  justifyContent={'start'} marginBottom={2} paddingLeft={1}>
                     <Link className="hover:[text-decoration:none] " href="www.google.com"   outline={'none'} border={'none'}>
                     {item.text}
                     </Link>
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
