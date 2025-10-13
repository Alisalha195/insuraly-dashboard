import { host } from "../../../constants/connection.ts";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../../components/shared/tables/DataTable";
import { getTableRowsCount } from "../../../api/getTableRowsCount";

import { Box, Flex, HStack, Text } from "@chakra-ui/react";
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

const BusinessesPageContent = () => {

   const navigate = useNavigate();
   const [currentpage, setCurrentPage] = useState(1);
   const pageSize = 5;
   const { btnSecondary, textPrimary, bgSecondary } = useThemedColors();
   const businessesCount = getTableRowsCount("business");

   const {
      data: businessesData,
      error: businessOwnerDataError,
      isLoading: businessesDataIsLoading,
   } = useQuery({
      queryKey: ["businesses", currentpage],
      queryFn: () =>
         fetch(
            `${host}/business/get?page=${currentpage}&pageSize=${pageSize}`
         ).then((res) => res.json()),
      refetchInterval: 5000,
      keepPreviousData: true,
      staleTime: 30000,
   });

   if (businessesDataIsLoading) return <h1>Loading.......</h1>;
   if (businessesData)
      return (
         <Box>
            {/* header line */}
            <PageHeadTitle
               backButton={true}
               title={"Businesses"}
            />

            {/* upper control */}
            <HStack justifyContent={"start"} marginBottom={1}>
               <SearchBoxDialog
                  title={"serach for a business"}
                  SearchActions={BusinessSearchActions}
               />
               <Box className='btn' color={btnSecondary}>
                  <Text
                     onClick={() => navigate("/dashboard/businesses/add")}
                     fontSize={{ xssToXs: "14px", xsToXm: "16px", xmToSm: "18px" }}
                     marginLeft={2}
                  >
                     new business
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
                  maxHeight={"560px"}
                  search={false}
                  data={businessesData}
                  // TableHeader={BusinessTableHeader}
                  TableHeader={
                     <TableHeader headerData={businessTableHeaderData} />
                  }
                  TableBody={BusinessTableBody}
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
