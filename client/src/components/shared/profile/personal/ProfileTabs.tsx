import { Box, Tabs } from '@chakra-ui/react'
import React from 'react'
import { LuFolder, LuUser } from 'react-icons/lu'
// import BusinessesTab from '../businessOwner/BusinessesTab';
// import ServicesTab from '../employee/ServicesTab';
import AboutTab from './AboutTab';
import ServicesTab from './tabs/ServicesTab';
import BusinessesTab from './tabs/BusinessesTab';
import RetirementTab from './tabs/RetirementsTab';

const ProfileTabs = ({personData, personRules}) => {
   console.log("personRules :",personRules);

   let namedRules = Object.getOwnPropertyNames(personRules)
   console.log("obj :",namedRules);
   
//   if(true) 
//    return <></> 
return (
   <Box paddingTop={2}>
      <Tabs.Root defaultValue="about">
         
       {/* tabs buttons */}
       <Tabs.List>
          <Tabs.Trigger value="about">
             <LuUser />
             about
          </Tabs.Trigger>
          
          {
            namedRules.map((item) => {
               if(item == "owner") {
                  return (
                   <Tabs.Trigger value="businesses">
                      <LuFolder />
                      businesses
                   </Tabs.Trigger>
                  )
               } 
               if(item == "employee") {
                  return (
                  <Tabs.Trigger value="services">
                      <LuFolder />
                      services
                   </Tabs.Trigger>
                   )
               }
               if(item == "retired") {
                  return (
                  <Tabs.Trigger value="retirements">
                     <LuFolder />
                     retirements
                  </Tabs.Trigger>
                  )
               }
            })
          }
       </Tabs.List>

      {/* tabs content */}
       <Tabs.Content value="about"  >
          <AboutTab personData={personData} />
       </Tabs.Content>
       
       {
         namedRules.map((item) => {
            if(item == "owner") {
               return (
                  <Tabs.Content value="businesses">
                     <BusinessesTab businessOwnerId={personRules[item]} />
                  </Tabs.Content>
                  
               )
            } 
            if(item == "employee") {
               return (
                  <Tabs.Content value="services">
                     <ServicesTab employeeId={personRules[item]} />
                  </Tabs.Content>
                )
            }
            if(item == "retired") {
               return (
                  <Tabs.Content value="retirements">
                     <RetirementTab employeeId={personRules[item]} />
                  </Tabs.Content>
                )
            }
         })
       }

      </Tabs.Root>
   </Box>
)
}

export default ProfileTabs