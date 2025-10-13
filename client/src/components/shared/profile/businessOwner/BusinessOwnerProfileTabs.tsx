import { Tabs, Box } from "@chakra-ui/react"
import { LuFolder, LuUser } from "react-icons/lu";
import AboutTab from "./AboutTab";
import BusinessesTab from "./BusinessesTab";

const BusinessOwnerProfileTabs = ({ businessOwnerData }) => {
   return (
      <Box paddingTop={2}>
         <Tabs.Root defaultValue="about">
            <Tabs.List>
               <Tabs.Trigger value="about">
                  <LuUser />
                  about
               </Tabs.Trigger>
               <Tabs.Trigger value="businesses">
                  <LuFolder />
                  Businesses
               </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="about"  >
               <AboutTab businessOwnerData={businessOwnerData} />
            </Tabs.Content>

            <Tabs.Content value="businesses">
               <BusinessesTab businessOwnerId={businessOwnerData?.business_owner_id} />
            </Tabs.Content>

         </Tabs.Root>
      </Box>
   )
}

export default BusinessOwnerProfileTabs;

