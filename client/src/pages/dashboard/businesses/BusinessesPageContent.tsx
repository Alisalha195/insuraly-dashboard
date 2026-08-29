import { host } from "../../../constants/connection.ts";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../../components/shared/tables/DataTable";
import { getTableRowsCount } from "../../../api/getTableRowsCount";

import { Box, Flex, HStack, Icon, Span, Text, VStack } from "@chakra-ui/react";
import { AiFillPlusCircle } from "react-icons/ai";
import useThemedColors from "../../../hooks/useThemedColors";
import BackArrow from "../../../components/shared/BackArrow";
import BusinessTableHeader from "../../../components/dashboard/content/baseContent/tables/businesses/BusinessTableHeader";
import BusinessTableBody from "../../../components/dashboard/content/baseContent/tables/businesses/BusinessTableBody";
import DataTableControl from "../../../components/shared/tables/DataTableControl";
import SearchBoxDialog from "../../../components/dashboard/content/sidebar/SearchBoxDialog";
import BusinessSearchActions from "../../../components/dashboard/content/baseContent/tables/businesses/BusinessSearchActions";
import PageHeadTitle from "../../../components/shared/PageHeadTitle"
import { businessTableHeaderData } from "../../../components/dashboard/content/baseContent/tables/businesses/businessTableHeaderData.ts";

import TableHeader from "../../../components/shared/tables/TableHeader.tsx";
import SkeletonLoader from "../../../components/shared/Skeleton.tsx";
import { LuSearch } from "react-icons/lu";
import { useCustomQuery } from "../../../hooks/useCustomQuery.ts";
import { useTranslation } from "react-i18next";
import useLangDir from "../../../hooks/useLangDir.ts";

const BusinessesPageContent = () => {

   const navigate = useNavigate();
   const [currentpage, setCurrentPage] = useState(1);
   const pageSize = 5;
   const { btnSecondary, textPrimary, bgSecondary, textSecondary } = useThemedColors();
   const businessesCount = getTableRowsCount("business");

   const {t} = useTranslation();
   const {isRTL, dir} = useLangDir();
   
   const { 
      data:businessesData, 
      error:businessOwnerDataError, 
      isSuccess : businessOwnerDataSuccess ,
      isLoading :businessesDataIsLoading
   } = useCustomQuery(
      ["businesses", currentpage] ,
      `${host}/business/get?page=${currentpage}&pageSize=${pageSize}`
   );

   if (businessesDataIsLoading) {
      return (
         <VStack justifyContent={'center'} height={'50vh'}>
            <SkeletonLoader width='60%'/>
            <SkeletonLoader width='50%'/>
            <SkeletonLoader width='60%' />
            <SkeletonLoader width='50%' />
            <SkeletonLoader width='60%' />
            <SkeletonLoader  width='50%' />
         </VStack>
      )
   }
   if (businessesData)
      return (
         <Box>
            {/* header line */}
            <PageHeadTitle
               backButton={true}
               title={<Span fontWeight={500} color={textSecondary}>{t("businesses")}</Span>}
            />

            {/* upper control */}
            <HStack justifyContent={"start"} marginBottom={1}>
               <Flex flexDirection={'column'} justifyContent={'center'} paddingY={0} paddingX={1} onClick={() => navigate("/dashboard/businesses/search")}>
                  <Icon
                     fontSize={{ xssToXs: "16px", xsToXm: "18px", xmToSm: "20px" }}
                  >
                     <LuSearch
                        className='btn'
                     />
                  </Icon>
               </Flex>
               <Box className='btn' color={btnSecondary}>
                  <Text
                     onClick={() => navigate("/dashboard/businesses/add")}
                     fontSize={{ xssToXs: "14px", xsToXm: "16px", xmToSm: "18px" }}
                     marginLeft={2}
                  >
                     {t("newBusiness")}
                     {/* <AiFillPlusCircle /> */}
                  </Text>
               </Box>
            </HStack>


            <Flex
               flexDirection={"column"}
               smToMd={{ maxWidth: "70vw" }}
               smDown={{ maxWidth: "96vw" }}
               maxWidth={"98vw"}
               height={"70vh"}
            >
               <DataTable
                  TableHeader={
                     <TableHeader headerData={businessTableHeaderData} />
                  }
                  TableBody={
                     <BusinessTableBody data={businessesData} search={false} />
                  }
                  maxHeight={"560px"}
                  successful={!!businessOwnerDataSuccess}
               />
               <DataTableControl
                  currentpage={currentpage}
                  setCurrentPage={setCurrentPage}
                  completeDataCount={businessesCount}
                  pageSize={pageSize}
               />
            </Flex>
         </Box>
      );
};

export default BusinessesPageContent;
