import { Flex } from "@chakra-ui/react"
import DataTable from "../../../../../shared/tables/DataTable"
import TableHeader from "../../../../../shared/tables/TableHeader";
import { Suspense } from "react";
const SearchResults = ({ resultData, isSuccess,headerData, tableBody }) => {

   
   if(isSuccess && resultData)   return (
      <Flex flexDirection={'column'}
         smToMd={{ maxWidth: '70vw' }}
         smDown={{ maxWidth: '96vw' }}
         Width={'98vw'}
         maxHeight={'50vh'}
         overflowY={'auto'}
         
      >

         <DataTable
            maxHeight={"50vh"}
            data={resultData}
            TableHeader={
               <TableHeader headerData={headerData} />
            }
            TableBody={tableBody}
            search={false}
         />
      </Flex>
   )
}

export default SearchResults;