import { Table, Text } from "@chakra-ui/react";

import useThemedColors from '../../../hooks/useThemedColors';
import { useTranslation } from "react-i18next";
import useLangDir from "../../../hooks/useLangDir";

const TableHeader = ({ headerData, ...props}:{headerData:string[]}) => {

   const { tableHead, tableHeaderBg } = useThemedColors();
   
   const {t} = useTranslation();
   const {isRTL, dir} = useLangDir();
   // if(!props?.display) {
   //    return null;
   // }
   return (
      <Table.Header>
         <Table.Row backgroundColor={tableHeaderBg}>
            {headerData?.map((item, index) => (
               <Table.ColumnHeader key={index} fontSize={{ xssToXs: "13px", xsToXm: "15px", xmToSm: "16px" }} textWrap={"nowrap"} >
                  <Text color={tableHead}>
                     {t(item)}
                  </Text>
               </Table.ColumnHeader>
            ))}
            <Table.ColumnHeader></Table.ColumnHeader>
         </Table.Row>
      </Table.Header>
   );
};

export default TableHeader;
