
import {
   Table,
   Box,
   Flex,
   Text,
   Button,
   Select,
} from '@chakra-ui/react';


const DataTable = ({ data, TableHeader, TableBody  }) => {``
 
   return (
      <Box >
         <Table.ScrollArea borderWidth="1px" maxW="xl">
         <Table.Root size="sm"   stickyHeader interactive showColumnBorder>
            <TableHeader />
            <TableBody data={data} />
         </Table.Root>
         </Table.ScrollArea>

      </Box>
   );
};

export default DataTable;