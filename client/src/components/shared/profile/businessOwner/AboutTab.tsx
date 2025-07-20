import { Box, DataList, Flex, Span, Text } from "@chakra-ui/react"
import useThemedColors from "../../../../hooks/useThemedColors";
import { useNavigate } from "react-router-dom";


const AboutTab = ({businessOwnerData}) => {
   
   const {btnGreen} = useThemedColors();
   const navigate = useNavigate()
  return (
    <Box maxHeight={"400px"} overflowY={'scroll'} paddingBottom={5}>
      <Flex>
         <Span backgroundColor={btnGreen } className="btn" paddingX={2} borderRadius={5}  
         onClick={()=> navigate("/dashboard/business-owners/edit",{state:businessOwnerData})}
         >
            edit
         </Span>
      </Flex>
      
       <DataList.Root orientation="horizontal" divideY="1px" maxW="md">
         
           <DataList.Item key={'insuranceNumber'} pt="4">
             <DataList.ItemLabel>Insurance Number</DataList.ItemLabel>
             <DataList.ItemValue>{businessOwnerData?.personal_informations?.insurance_number}</DataList.ItemValue>
           </DataList.Item>
           
           <DataList.Item key={'nationalNumber'} pt="4">
             <DataList.ItemLabel>National Number</DataList.ItemLabel>
             <DataList.ItemValue>{businessOwnerData?.personal_informations?.national_number}</DataList.ItemValue>
           </DataList.Item>
           
           <DataList.Item key={'firstName'} pt="4">
             <DataList.ItemLabel>First Name</DataList.ItemLabel>
             <DataList.ItemValue>{businessOwnerData?.personal_informations?.first_name}</DataList.ItemValue>
           </DataList.Item>
           
           <DataList.Item key={'fatherName'} pt="4">
             <DataList.ItemLabel>Father Name</DataList.ItemLabel>
             <DataList.ItemValue>{businessOwnerData?.personal_informations?.father_name}</DataList.ItemValue>
           </DataList.Item>
           
           <DataList.Item key={'motherName'} pt="4">
             <DataList.ItemLabel>Mother Name</DataList.ItemLabel>
             <DataList.ItemValue>{businessOwnerData?.personal_informations?.mother_name}</DataList.ItemValue>
           </DataList.Item>
           
           <DataList.Item key={'lastName'} pt="4">
             <DataList.ItemLabel>Last Name</DataList.ItemLabel>
             <DataList.ItemValue>{businessOwnerData?.personal_informations?.last_name}</DataList.ItemValue>
           </DataList.Item>
           {/* ....... */}
           <DataList.Item key={'birthDate'} pt="4">
             <DataList.ItemLabel>Birth Date</DataList.ItemLabel>
             <DataList.ItemValue>{businessOwnerData?.personal_informations?.birth_date}</DataList.ItemValue>
           </DataList.Item>
           
           <DataList.Item key={'birthLocation'} pt="4">
             <DataList.ItemLabel>Birth Location</DataList.ItemLabel>
             <DataList.ItemValue>{businessOwnerData?.personal_informations?.birth_location}</DataList.ItemValue>
           </DataList.Item>
           
           <DataList.Item key={'birthRegistrationPlace'} pt="4">
             <DataList.ItemLabel>Registration Location</DataList.ItemLabel>
             <DataList.ItemValue>{businessOwnerData?.personal_informations?.birth_registration_place}</DataList.ItemValue>
           </DataList.Item>
           
           <DataList.Item key={'birthRegistrationDigit'} pt="4">
             <DataList.ItemLabel>Registration Digit</DataList.ItemLabel>
             <DataList.ItemValue>{businessOwnerData?.personal_informations?.birth_registration_digit}</DataList.ItemValue>
           </DataList.Item>

       </DataList.Root>
    </Box>
  )
}

export default AboutTab;


