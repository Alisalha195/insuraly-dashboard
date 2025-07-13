import { Flex } from "@chakra-ui/react"
import DataTable from "../../../../../../shared/DataTable"
import BusinessOwnerTableHeader from "../BusinessOwnerTableHeader"
import BusinessOwnerTableBody from "../BusinessOwnerTableBody"

const SearchResults = ({resultData}) => {
   
  return (
    <Flex flexDirection={'column'} 
          smToMd={{maxWidth:'70vw'}} 
          smDown={{maxWidth:'96vw'}}   
          maxWidth={'98vw'} 
          height={'70vh'}
    >
       <DataTable data={resultData} 
                  TableHeader={BusinessOwnerTableHeader}
                  TableBody={BusinessOwnerTableBody}
                  search={true}
       />
    </Flex>
  )
}

export default SearchResults