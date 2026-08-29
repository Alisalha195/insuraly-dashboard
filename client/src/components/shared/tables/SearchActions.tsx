import { Box, Flex, Tabs } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';

import { LuUser } from "react-icons/lu";

const SearchActions = ({searchContentData, searchValue, ...params}) => {
   const {t} = useTranslation();
  return (
    <Box width={"100%"} >
       <Flex justifyContent={'center'} paddingTop={2} textAlign={'center'} width={"100%"} >
          <Tabs.Root defaultValue={searchContentData[0].value} >
             <Tabs.List width={'100%'} justifyContent={'center'}>
                {searchContentData.map((tabItem,index)=>(
                   <Tabs.Trigger key={index} value={tabItem.value}>
                      <LuUser />
                      {t(tabItem.tabHeaderTitle)}
                   </Tabs.Trigger>
                ))}
                
             </Tabs.List>
             
             {searchContentData.map((tabItem,index)=>(
                
                <Tabs.Content value={tabItem.value}  >
                   <tabItem.searchContent searchValue={searchValue} {...params}/>
                </Tabs.Content>
             ))}   
          </Tabs.Root>
       </Flex>
    </Box>
  )
}

export default SearchActions