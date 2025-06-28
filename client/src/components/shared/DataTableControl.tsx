import {
   Table,
   Box,
   Flex,
   Text,
   Button,
   Select,
} from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const DataTableControl = ({ currentpage, setCurrentPage, pageSize, completeDataCount }) => {
   
   const totalItems = completeDataCount;
   const totalPages = Math.ceil(totalItems / pageSize);
   const startIndex = (currentpage - 1) * pageSize;
   const endIndex = startIndex + pageSize;
   
   const handlePageChange = (page) => {
      setCurrentPage(page);
   };
  return (
    <Flex justifyContent="space-between" mt={4} alignItems="center">
    
       <Text>
          {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}
       </Text>
       <Flex>
          <Button
             onClick={() => handlePageChange(currentpage - 1)}
             disabled={currentpage === 1}
             mr={2}
             size={"xs"}
             paddingLeft={0}
          >
             <LuChevronLeft /> Previous
          </Button>
          <Button
             onClick={() => handlePageChange(currentpage + 1)}
             disabled={currentpage === totalPages}
             size={"xs"}
             paddingRight={0}
          >
             Next<LuChevronRight />
          </Button>
       </Flex>
    </Flex>
  )
}

export default DataTableControl