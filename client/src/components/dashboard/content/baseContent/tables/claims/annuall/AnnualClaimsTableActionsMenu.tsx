import { HStack, Menu, Portal, Text, Popover, Box } from "@chakra-ui/react"
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useThemedColors from "../../../../../../../hooks/useThemedColors.ts";
import DeleteDialog from "../../DeleteDialog.tsx";
import { host } from "../../../../../../../constants/connection.ts";
import { annualClaimsTableMenuData } from "./annualClaimsTableMenuData.ts";
import { useTranslation } from "react-i18next";


const AnnualClaimsTableActionsMenu = ({ itemId, itemData }) => {

   const [waiting, setWaiting] = useState(false)
   const navigate = useNavigate();
   const { hovering } = useThemedColors();
   const {t} = useTranslation();
   
   const deleteClaim = useMutation({
      mutationFn: (itemId) => fetch(`${host}/claims/delete`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ claimID: itemId }) }).then(res => res.json()),

      onSuccess: (data) => {
         toast.success('Claim Deleted Successfuly !');
         setWaiting(false);
      }
   })

   const handleDelete = () => {
      setWaiting(true);
      deleteClaim.mutate(itemId);
   }
   
   return (
      <Menu.Root >
         <Menu.Trigger asChild>
            <CiMenuKebab className="btn" />
         </Menu.Trigger>
         <Portal>
            <Menu.Positioner >
               <Menu.Content >
                  {
                     
                     annualClaimsTableMenuData.map((item, index) => (
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
                              onClick={() => navigate(item.clickLink(itemData?.claim_id), { state: itemData  })}
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

export default AnnualClaimsTableActionsMenu;



