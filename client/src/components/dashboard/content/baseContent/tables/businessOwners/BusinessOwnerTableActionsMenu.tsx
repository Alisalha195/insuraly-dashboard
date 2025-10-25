import { HStack, Menu, Portal, Text } from "@chakra-ui/react"
import { CiMenuKebab } from "react-icons/ci";
import { tableMenuData } from "./TableActionsMenuData";
import useThemedColors from "../../../../../../hooks/useThemedColors";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../DeleteDialog";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { host } from "../../../../../../constants/connection.ts";


const BusinessOwnerTableActionsMenu = ({ itemId, itemData }) => {

   const [waiting, setWaiting] = useState(false)
   const navigate = useNavigate();
   const { hovering } = useThemedColors();

   const deleteBusinessOwner = useMutation({
      mutationFn: (itemId) => fetch(`${host}/businessOwners/delete`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ businessOwnerId: itemId }) }).then(res => res.json()),

      onSuccess: (data) => {
         toast.success('Business Owner Deleted Successfuly !');
         setWaiting(false);
      }
   })

   const handleDelete = () => {
      setWaiting(true);
      deleteBusinessOwner.mutate(itemId);
   }
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
                              key={index}
                              fontSize={{ xssToXm: "14px", xmToSm: "15px", smToMd: "16px" }}
                              marginTop={1}
                              paddingY={0}
                              paddingX={1}
                              className="btn"
                              value=""
                              backgroundColor={'transparent'}
                              _hover={{ backgroundColor: hovering }}
                              onClick={() => navigate(item.clickLink, { state: itemData })}
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

export default BusinessOwnerTableActionsMenu;



