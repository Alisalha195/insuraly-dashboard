
import { Box, Button, Flex, HStack, Menu, Portal, Text } from "@chakra-ui/react"
import { CiMenuKebab } from "react-icons/ci";
import { tableMenuData } from "./TableActionsMenuData";
import useThemedColors from "../../../../../../hooks/useThemedColors";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../DeleteDialog";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { host } from "../../../../../../constants/connection";
import { useTranslation } from "react-i18next";

const BusinessEmployeeActionsMenu = ({personalInfoId ,employeeId, itemData , businessID}:{personalInfoId:number, employeeId:number, itemData:any , businessID:number}) => {
   
   const [waiting , setWaiting] = useState(false)
   const navigate = useNavigate();
   const {hovering} = useThemedColors();
   
   const {t} = useTranslation();
   
   const deleteEmployee = useMutation({
      mutationFn : (dataToMutate) => fetch(`${host}/business/remove-employee-from-business`,{method:'DELETE', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify(dataToMutate)}).then(res => res.json()) ,
      
      
      onSuccess: (data) => {
         toast.success('Business Deleted Successfuly !');
         setWaiting(false);
      }
   });
   
   const handleDelete = () => {
      setWaiting(true);
      const dataToMutate = {employeeId:employeeId, businessID:businessID};
      deleteEmployee.mutate(dataToMutate);
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
                     onClick={()=> navigate(item.clickLink({personalInfoId, businessID, employeeID:employeeId}) , {state:{...itemData, businessID:Number(businessID),employeeID:employeeId}})}
                  >
                    <HStack  >
                       <item.icon />
                       <Text>{t(item.title)}</Text>
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

export default BusinessEmployeeActionsMenu