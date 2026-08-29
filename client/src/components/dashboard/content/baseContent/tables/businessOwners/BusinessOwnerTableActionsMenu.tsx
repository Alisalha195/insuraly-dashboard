import { HStack, Menu, Portal, Text, Popover, Box } from "@chakra-ui/react"
import { CiMenuKebab } from "react-icons/ci";
import { tableMenuData } from "./TableActionsMenuData";
import useThemedColors from "../../../../../../hooks/useThemedColors";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../DeleteDialog";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { host } from "../../../../../../constants/connection.ts";
import { useTranslation } from "react-i18next";
import useLangDir from "../../../../../../hooks/useLangDir.ts";


const BusinessOwnerTableActionsMenu = ({ itemId, itemData }) => {

   const [waiting, setWaiting] = useState(false)
   const navigate = useNavigate();
   const { hovering } = useThemedColors();
   const {t} = useTranslation();
   const {isRTL, dir} = useLangDir();
   
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
                        item.role == 'delete'
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
                           <Box
                              key={index}
                              fontSize={{ xssToXm: "14px", xmToSm: "15px", smToMd: "16px" }}
                              marginTop={1}
                              paddingY={0}
                              paddingX={1}
                              className="btn"
                              value=""
                              backgroundColor={'transparent'}
                              _hover={{ backgroundColor: hovering }}
                              onClick={() => navigate(item.clickLink(itemData?.personal_informations?.personal_info_id), { state: itemData  })}
                           >
                              <HStack  >
                                 <item.icon />
                                 <Text>{t(item.title)}</Text>
                              </HStack>
                           </Box>
                     ))
                  }
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
   )
}

export default BusinessOwnerTableActionsMenu;



