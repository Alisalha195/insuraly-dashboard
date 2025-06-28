import { Box, Button, Flex, HStack, Icon, Menu, Popover, Portal, Text } from "@chakra-ui/react"
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
          <Popover.Content width={'35vw'} borderWidth={'1px'} >
            {/* <Popover.Arrow /> */}
            <Popover.Body padding={2}>
            {
               userMenuListData.map((item , index)=>(
                  
                  <Flex key={index} _hover={{backgroundColor:hovering}} className=" btn  [border-radius:7px] text-[24px]"  justifyContent={'start'} marginY={2} paddingLeft={1}>
                     
                     <Link className="hover:[text-decoration:none] " href="www.google.com"   outline={'none'} border={'none'}>
                     <Icon marginRight={1}><item.icon /></Icon>
                     <Text>{item.text}</Text>
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
  
  return (
   
   <Box zIndex={1000}>
      <Menu.Root >
      <Menu.Trigger asChild>  
         <Button padding={0} border={'none'} outline={'none'} backgroundColor={'transparent'}> 
            <UserAvatar />
         </Button>
      </Menu.Trigger>
      <Portal >
        <Menu.Positioner zIndex={1000}>
          <Menu.Content >
          {
            userMenuListData.map((item , index)=>(
               
               
               // <Flex key={index} _hover={{backgroundColor:hovering}} className=" btn  [border-radius:7px] text-[24px]"  justifyContent={'start'} marginBottom={2} paddingLeft={1}>
               //    <Link className="hover:[text-decoration:none] " href="www.google.com"   outline={'none'} border={'none'}>
               //    {item.text}
               //    </Link>
               // </Flex>
               
            <Menu.Item style={{fontSize:"clamp(16px, 20px , 36px)"}} key={index} marginBottom={1} paddingY={0} paddingX={1} className="btn" value="" backgroundColor={'transparent'} _hover={{backgroundColor:hovering}}
                           // onClick={()=> navigate(item.clickLink , {state:itemData})}
                           >
              <HStack  >
                 <item.icon />
                 <Text>{item.text}</Text>
              </HStack>
            </Menu.Item>
               
            ))
            
          }
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
 </Menu.Root>
      
   </Box>
  )
}

export default UserMenu;
