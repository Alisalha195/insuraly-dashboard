 
 import {  useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import {useQuery, } from '@tanstack/react-query';
 import DataTable from '../../../components/shared/DataTable';
 import { getTableRowsCount } from '../../../api/getTableRowsCount';
 import BusinessOwnerTableHeader from '../../../components/dashboard/content/baseContent/tables/businessOwners/BusinessOwnerTableHeader'; 
 import BusinessOwnerTableBody from '../../../components/dashboard/content/baseContent/tables/businessOwners/BusinessOwnerTableBody';
 import { Box,  HStack,Flex ,  Text, VStack} from '@chakra-ui/react';
 import { AiFillPlusCircle } from "react-icons/ai";
 import useThemedColors from '../../../hooks/useThemedColors';
import BackArrow from '../../../components/shared/BackArrow';
import DataTableControl from '../../../components/shared/DataTableControl';
 
 const BusinessOwnersPageContent = () => {
   const navigate = useNavigate()
   
   const [currentpage, setCurrentPage] = useState(1);
   const pageSize = 5;
   
   const {btnSecondary, textPrimary} = useThemedColors();
   const businessOwnersCount = getTableRowsCount('businessOwners');
   
   const {data:businessOwnerData, 
         error:businessOwnerDataError, 
         isLoading:businessOwnerDataIsLoading, 
        } = useQuery({ 
      queryKey: ['business-owners',currentpage ], 
      queryFn: () => fetch(`http://localhost:5000/businessOwners/get?page=${currentpage}&pageSize=${pageSize}`).then(res =>  res.json()),
         refetchInterval : 5000,
         keepPreviousData: true ,
         staleTime : 30000,
   });
      
   if(businessOwnerDataIsLoading )
      return <h1>Loading.......</h1>  
   if(businessOwnerData )
      return (
         <Box >
            <BackArrow />
            <HStack marginBottom={2} padding={2}  justifyContent={"space-around"}>
               <Text color={textPrimary}>Business Owners</Text>
               <Box className='btn' padding={1} color={btnSecondary}>
                  <Text onClick={()=>navigate("/dashboard/business-owners/add")} fontSize={"40px"}>
                     <AiFillPlusCircle  />
                  </Text>
               </Box>
            </HStack>
            
            <Flex flexDirection={'column'} 
                  smToMd={{maxWidth:'70vw'}} 
                  smDown={{maxWidth:'96vw'}}   
                  maxWidth={'98vw'} 
                  height={'70vh'}
            >
               <DataTable data={businessOwnerData} 
                          TableHeader={BusinessOwnerTableHeader}
                          TableBody={BusinessOwnerTableBody}
               />
               <DataTableControl 
                           currentpage={currentpage}
                           setCurrentPage={setCurrentPage}
                           completeDataCount={businessOwnersCount}
                           pageSize={pageSize}
                           />
            </Flex>
         </Box>
      );
      
      
 };
 
 export default BusinessOwnersPageContent;
 
 import { Table } from "@chakra-ui/react"

// const Demo = () => {
//   return (
//     <Table.ScrollArea borderWidth="1px" maxW="xl">
//       <Table.Root size="sm" variant="outline">
//         <Table.Header>
//           <Table.Row>
//             <Table.ColumnHeader minW="400px">Product</Table.ColumnHeader>
//             <Table.ColumnHeader minW="400px">Category</Table.ColumnHeader>
//             <Table.ColumnHeader minW="200px" textAlign="end">
//               Price
//             </Table.ColumnHeader>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           {items.map((item) => (
//             <Table.Row key={item.id}>
//               <Table.Cell>{item.name}</Table.Cell>
//               <Table.Cell>{item.category}</Table.Cell>
//               <Table.Cell textAlign="end">{item.price}</Table.Cell>
//             </Table.Row>
//           ))}
//         </Table.Body>
//       </Table.Root>
//     </Table.ScrollArea>
//   )
// }

// const items = [
//   { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
//   { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
//   { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
//   { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
//   { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
// ]
