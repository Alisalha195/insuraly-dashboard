import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useThemedColors from '../../../../../../hooks/useThemedColors';
import { useMutation } from '@tanstack/react-query';
import { HStack, Menu, Portal, Text } from '@chakra-ui/react';
import { CiMenuKebab } from 'react-icons/ci';
import DeleteDialog from '../DeleteDialog';
import { tableMenuData } from './serviceActionsMenuData';
import { host } from '../../../../../../constants/connection';
import toast from 'react-hot-toast';

const ServiceActionsMenu = ({serviceID, employeeID, itemData}) => {
  
   const [waiting , setWaiting] = useState(false)
   const navigate = useNavigate();
   const {hovering} = useThemedColors();
   
   const deleteService = useMutation({
      mutationFn : (dataToMutate) => fetch(`${host}/services/delete`,{method:'DELETE', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify(dataToMutate)}).then(res => res.json()) ,
      
      
      onSuccess: (data) => {
         toast.success('Service Deleted Successfuly !');
         setWaiting(false);
      }
   });
   
   const handleDelete = () => {
      setWaiting(true);
      // const dataToMutate = {employeeId:employeeId, businessID:businessID};
      const dataToMutate = {employeeId:employeeID, serviceID: serviceID};
      deleteService.mutate(dataToMutate);
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
                        onClick={()=> navigate(item.clickLink({ employeeID:employeeID, serviceID:serviceID}) , {state:{...itemData,employeeID:employeeID}})}
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

export default ServiceActionsMenu