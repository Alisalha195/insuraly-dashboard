
import { Box, Button, Flex, HStack, Menu, Portal, Text } from "@chakra-ui/react"
import { CiMenuKebab } from "react-icons/ci";
// import { tableMenuData } from "./TableActionsMenuData";
// import useThemedColors from "../../../../../../hooks/useThemedColors";
import { useNavigate } from "react-router-dom";
// import DeleteDialog from "../DeleteDialog";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useThemedColors from "../../../../../../../hooks/useThemedColors";
import { host } from "../../../../../../../constants/connection";
import { tableMenuData } from "./annualRetirementsTableMenuData";
import DeleteDialog from "../../DeleteDialog";
// import { host } from "../../../../../../constants/connection";

const AnnualRetirementsTableActionsMenu = ({retirementID}:{retirementID:Number}) => {
   
   const [waiting , setWaiting] = useState(false)
   const navigate = useNavigate();
   const {hovering} = useThemedColors();
   
   const deleteRetirement = useMutation({
      mutationFn : (dataToMutate) => fetch(`${host}/retirement/delete-retirement`,{method:'DELETE', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify(dataToMutate)}).then(res => res.json()) ,
      
      
      onSuccess: (data) => {
         toast.success('Retirement Deleted Successfuly !');
         setWaiting(false);
      }
   });
   
   const handleDelete = () => {
      setWaiting(true);
      const dataToMutate = {retirementID:retirementID};
      deleteRetirement.mutate(dataToMutate);
   };
   
  return (
   <Menu.Root >
      <Menu.Trigger asChild>
        <CiMenuKebab className="btn" />
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content >
            {
               tableMenuData.map((item, index) => (
                  item.title == 'delete' 
                  ?
                  <DeleteDialog 
                       key={index}
                       msg={""}
                       click={handleDelete} 
                       item={item}
                       waiting={waiting} 
                       styles={{
                        marginTop: 2
                     }}
                     
                  />
                  :
                  <Menu.Item 
                     fontSize={{ xssToXm: "14px", xmToSm: "15px", smToMd: "16px" }} 
                     key={index} 
                     marginBottom={1} 
                     paddingY={1} 
                     paddingX={1} 
                     className="btn" 
                     value="" 
                     backgroundColor={'transparent'} 
                     _hover={{backgroundColor:hovering}}
                     onClick={()=> navigate(item.clickLink({retirementID:retirementID}) , {state:{retirementID:retirementID}})}
                  >
                    <HStack  >
                       <item.icon />
                       <Text>{item.title}</Text>
                    </HStack>
                  </Menu.Item>
               ))
            }
            
            
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default AnnualRetirementsTableActionsMenu