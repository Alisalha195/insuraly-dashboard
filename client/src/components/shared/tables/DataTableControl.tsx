import {
   Table,
   Box,
   Flex,
   Text,
   Button,
   Select,
} from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import useThemedColors from '../../../hooks/useThemedColors';
import { useTranslation } from 'react-i18next';
import useLangDir from '../../../hooks/useLangDir';
import { capitalize } from '../../../lib/capitalize';

const DataTableControl = ({ currentpage, setCurrentPage, pageSize, completeDataCount }) => {

   const { btnSecondary, textPrimary } = useThemedColors();

   const totalItems = completeDataCount;
   const totalPages = Math.ceil(totalItems / pageSize);
   const startIndex = (currentpage - 1) * pageSize;
   const endIndex = startIndex + pageSize;

   const {t} = useTranslation();
   const {isRTL, dir} = useLangDir();
      
   const handlePageChange = (page) => {
      setCurrentPage(page);
   };
   return (
      <Flex justifyContent="space-between" mt={4} alignItems="center">

         <Text
            fontSize={{ xssToXm: "12px" }}
         >
            {startIndex + 1}-{Math.min(endIndex, totalItems)} {t("of")} {totalItems}
         </Text>
         <Flex>
            <Flex
               as={'button'}
               className={currentpage === 1 ? 'btn-disabled' : 'btn'}
               // borderWidth={'1px'}
               borderColor={btnSecondary}
               alignItems={'center'}
               onClick={() => handlePageChange(currentpage - 1)}
               disabled={currentpage === 1}
               paddingX={'10px'}
               paddingY={'6px'}
               fontSize={{ xssToXm: "14px" }}
               borderRadius={'7px'}
               marginRight={{ xssToXs: "2px", xsToSm: "6px", smTo2xl: "8px" }}
            >

               <Text _rtl={{transform : "rotate(180deg)"}} transition='.3s ease'>
                  <LuChevronLeft fontSize={{ xssToXm: "14px" }} />
               </Text>
                {capitalize(t('previous'))}

            </Flex>
            <Flex
               as={'button'}
               className={currentpage === totalPages ? 'btn-disabled' : 'btn'}
               // borderWidth={'1px'}
               borderColor={btnSecondary}
               alignItems={'center'}
               onClick={() => handlePageChange(currentpage + 1)}
               disabled={currentpage === totalPages}
               paddingX={'10px'}
               paddingY={'6px'}
               fontSize={{ xssToXm: "14px" }}
               borderRadius={'7px'}
               
            >
               {capitalize(t('next'))}
               <Text _rtl={{transform : "rotate(180deg)"}} transition='.3s ease'>
                  <LuChevronRight fontSize={{ xssToXm: "14px" }} />
               </Text>
               
            </Flex>
         </Flex>
      </Flex>
   )
}

export default DataTableControl