import { Box, DataList, Flex, Span, Text, VStack } from "@chakra-ui/react"
import useThemedColors from "../../../../hooks/useThemedColors";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { host } from "../../../../constants/connection";
import SkeletonLoader from "../../Skeleton";
import { useTranslation } from "react-i18next";
import FixBottomArea from "../../FixBottomArea";


const AboutTab = ({personData}) => {
   
   // console.log("personData in abouttab :",personData) 
   const {t} = useTranslation();
   
   const {btnGreen} = useThemedColors();
   const navigate = useNavigate();
   
   if(!personData ) {
      return (
         <VStack justifyContent={'center'} height={'50vh'}>
            <SkeletonLoader width='60%'/>
            <SkeletonLoader width='60%'/>
            <SkeletonLoader width='60%' />
         </VStack>
      )
   }
   else if(personData)
     return (
       <Box maxHeight={"400px"} overflowY={'scroll'} paddingBottom={5}>
         <Flex>
            <Span backgroundColor={btnGreen } className="btn" paddingX={2} borderRadius={5}  
            onClick={()=> navigate(`/profile/${personData?.personal_info_id}/edit`,{state:personData})}
            >
               {t("edit")}
            </Span>
         </Flex>
         
          <DataList.Root orientation="horizontal" divideY="1px" maxW="md">
            
              <DataList.Item key={'insuranceNumber'} pt="4">
                <DataList.ItemLabel>{t("insuranceNumber")}</DataList.ItemLabel>
                <DataList.ItemValue>{personData?.insurance_number}</DataList.ItemValue>
              </DataList.Item>
              
              <DataList.Item key={'nationalNumber'} pt="4">
                <DataList.ItemLabel>{t("nationalNumber")}</DataList.ItemLabel>
                <DataList.ItemValue>{personData?.national_number}</DataList.ItemValue>
              </DataList.Item>
              
              <DataList.Item key={'firstName'} pt="4">
                <DataList.ItemLabel>{t("firstName")}</DataList.ItemLabel>
                <DataList.ItemValue>{personData?.first_name}</DataList.ItemValue>
              </DataList.Item>
              
              <DataList.Item key={'fatherName'} pt="4">
                <DataList.ItemLabel>{t("fatherName")}</DataList.ItemLabel>
                <DataList.ItemValue>{personData?.father_name}</DataList.ItemValue>
              </DataList.Item>
              
              <DataList.Item key={'motherName'} pt="4">
                <DataList.ItemLabel>{t("motherName")}</DataList.ItemLabel>
                <DataList.ItemValue>{personData?.mother_name}</DataList.ItemValue>
              </DataList.Item>
              
              <DataList.Item key={'lastName'} pt="4">
                <DataList.ItemLabel>{t("lastName")}</DataList.ItemLabel>
                <DataList.ItemValue>{personData?.last_name}</DataList.ItemValue>
              </DataList.Item>
              {/* ....... */}
              <DataList.Item key={'birthDate'} pt="4">
                <DataList.ItemLabel>{t("birthDate")}</DataList.ItemLabel>
                <DataList.ItemValue>{personData?.birth_date}</DataList.ItemValue>
              </DataList.Item>
              
              <DataList.Item key={'birthLocation'} pt="4">
                <DataList.ItemLabel>{t("birthLocation")}</DataList.ItemLabel>
                <DataList.ItemValue>{personData?.birth_location}</DataList.ItemValue>
              </DataList.Item>
              
              <DataList.Item key={'birthRegistrationPlace'} pt="4">
                <DataList.ItemLabel>{t("registrationLocaion")}</DataList.ItemLabel>
                <DataList.ItemValue>{personData?.birth_registration_place}</DataList.ItemValue>
              </DataList.Item>
              
              <DataList.Item key={'birthRegistrationDigit'} pt="4">
                <DataList.ItemLabel>{t("digit")}</DataList.ItemLabel>
                <DataList.ItemValue>{personData?.person?.birth_registration_digit}</DataList.ItemValue>
              </DataList.Item>

          </DataList.Root>
          <FixBottomArea />
          {/* <FixBottomArea /> */}
       </Box>
     )

}

export default AboutTab;


