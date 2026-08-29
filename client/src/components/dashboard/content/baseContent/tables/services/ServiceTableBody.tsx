import { Flex, Table, Text, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import useThemedColors from '../../../../../../hooks/useThemedColors';
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin2Line } from "react-icons/ri";
import ServiceActionsMenu from "./ServiceActionsMenu";
import { useTranslation } from "react-i18next";


const ServiceTableBody = ({ data }) => {

   console.log("data e body :" , data)
   const {t} = useTranslation();
   
   const navigate = useNavigate();
   const { tableItem,btnGreen, btnDanger } = useThemedColors();

   if (data && data?.length > 0) {

      return ( 
         <Table.Body>
            {data?.map((item, index) => (
               <Table.Row key={index} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>

                  <Table.Cell textAlign="start" textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item?.service_id}
                     </Text>
                  </Table.Cell>
                  
                  <Table.Cell  textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item?.Business_Employee?.Businesses?.insurance_number}
                     </Text>
                  </Table.Cell>
                  
                  <Table.Cell  textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item?.initiate_start_date}
                     </Text>
                  </Table.Cell>
                  
                  
                  
                  <Table.Cell  textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item?.finish_date}
                     </Text>
                  </Table.Cell>
                  
                  <Table.Cell  textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        $ {item?.apply_salary}
                     </Text>
                  </Table.Cell>
                  
                  <Table.Cell  textWrap={"nowrap"}>
                     <Text color={tableItem} fontSize={{ xssToXs: "12px", xsToXm: "14px", xmToSm: "16px" }}>
                        {item?.puplic_sector ? t("public"): t("private")}
                     </Text>
                  </Table.Cell>


                        <Table.Cell color={tableItem} fontSize={"20px"} textWrap={"nowrap"}>
                           <ServiceActionsMenu 
                             businessID={item?.Business_Employee?.business_id}
                             serviceID={item?.service_id}
                             employeeID={item?.Business_Employee?.employee_id}
                             itemData={item} 
                            
                             />
                        </Table.Cell>
                  
               </Table.Row>
            ))}
         </Table.Body>
      )
   } 
}

export default ServiceTableBody;