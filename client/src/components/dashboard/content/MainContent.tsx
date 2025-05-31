import { Flex } from "@chakra-ui/react"
import Sidebar from "./sidebar/Sidebar"
import BaseContent from "./baseContent/BaseContent"

const MainContent = () => {
  return (
    <Flex  >
      <Sidebar />
      <BaseContent />
    </Flex>
  )
}

export default MainContent