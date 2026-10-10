
import {
   Table,
   Box,
   Flex,
   Text,
   Button,
   Select,
} from '@chakra-ui/react';
import React from 'react';
import useThemedColors from '../../../hooks/useThemedColors';

type DataRableType = {
   TableHeader: React.ReactNode,
   TableBody: React.ReactNode,
   maxHeight?: String,
}

const DataTable = ({ TableHeader, TableBody, ...props }: DataRableType): React.ReactNode => {
   const { textSecondary } = useThemedColors();

    return (
         <Box>
            <Table.ScrollArea borderWidth="1px" maxHeight={props?.maxHeight || "300px"} overflowX={'auto'} 
            {...props} >
               <Table.Root size="sm" stickyHeader interactive showColumnBorder>
                  {TableHeader}
                  {TableBody}
               </Table.Root>
            </Table.ScrollArea>
         </Box>
   );
};

export default DataTable;