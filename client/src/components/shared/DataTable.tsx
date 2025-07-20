
import {
   Table,
   Box,
   Flex,
   Text,
   Button,
   Select,
} from '@chakra-ui/react';

const DataTable = ({maxHeight, data, TableHeader, TableBody , search  }) => {``
 
   if(data?.status == 400 || data?.status == 404)
      return(<h1>No Data  Found!</h1>)
   return (
      <Box >
         <Table.ScrollArea borderWidth="1px" maxW="xl" maxHeight={maxHeight}>
         <Table.Root size="sm" stickyHeader interactive showColumnBorder>
            <TableHeader />
            <TableBody data={data} search={search}/>
         </Table.Root>
         </Table.ScrollArea>

      </Box>
   );
};

export default DataTable;