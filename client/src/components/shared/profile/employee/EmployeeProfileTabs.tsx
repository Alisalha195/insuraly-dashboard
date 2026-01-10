import { Tabs, Box } from "@chakra-ui/react"
import { LuFolder, LuUser } from "react-icons/lu";
// import AboutTab from "./AboutTab";
// import BusinessesTab from "./BusinessesTab";
import AboutTab from "./AboutTab";
import ServicesTab from "./ServicesTab";

const EmployeeProfileTabs = ({ employeeData }) => {
   return (
      <Box paddingTop={2}>
         <Tabs.Root defaultValue="about">
            <Tabs.List>
               <Tabs.Trigger value="about">
                  <LuUser />
                  About
               </Tabs.Trigger>
               <Tabs.Trigger value="businesses">
                  <LuFolder />
                  Services
               </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="about"  >
               <AboutTab employeeData={employeeData} />
            </Tabs.Content>

            <Tabs.Content value="businesses">
               <ServicesTab employeeId={employeeData?.emp_id} />
            </Tabs.Content>

         </Tabs.Root>
      </Box>
   )
}

export default EmployeeProfileTabs;

