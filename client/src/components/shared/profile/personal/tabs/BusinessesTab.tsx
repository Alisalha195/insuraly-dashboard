import React, { useState } from 'react'
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useCustomQuery } from '../../../../../hooks/useCustomQuery';
import { host } from '../../../../../constants/connection';
import DataTable from '../../../tables/DataTable';
import { businessTableHeaderData } from '../../../../dashboard/content/baseContent/tables/businesses/businessTableHeaderData';
import BusinessTableBody from '../../../../dashboard/content/baseContent/tables/businesses/BusinessTableBody';
import useThemedColors from '../../../../../hooks/useThemedColors';
import SkeletonLoader from '../../../Skeleton';
import TableHeader from '../../../tables/TableHeader';
import { useTranslation } from 'react-i18next';
// import DataTableControl from '../../tables/DataTableControl';
// import DataTable from '../../tables/DataTable';
// import SearchBoxDialog from '../../../dashboard/content/sidebar/SearchBoxDialog';
// import { AiFillPlusCircle } from 'react-icons/ai';
// import useThemedColors from '../../../../hooks/useThemedColors';
// import BusinessTableHeader from '../../../dashboard/content/baseContent/tables/businesses/BusinessTableHeader';
// import BusinessTableBody from '../../../dashboard/content/baseContent/tables/businesses/BusinessTableBody';
// import { host } from "../../../../constants/connection.ts"
// import TableHeader from "../../tables/TableHeader.tsx";
// import { businessTableHeaderData } from "../../../dashboard/content/baseContent/tables/businesses/businessTableHeaderData.ts"
// import { useCustomQuery } from '../../../../hooks/useCustomQuery.ts';

const BusinessesTab = ({ businessOwnerId }) => {

   const navigate = useNavigate();
   const { textPrimary, textSecondary, btnSecondary } = useThemedColors();
   const {t} = useTranslation();
   
   const { data: businessesData, 
      error : businessDataError, 
      isSuccess : businessDataSuccess,
      isLoading : businessesDataIsLoading
   } = useCustomQuery(
      ['businesses-of-owner', businessOwnerId] ,
      `${host}/businessOwners/businesses?ownerId=${businessOwnerId}`
   ) ;


   if (businessesDataIsLoading)
      return (
         <VStack justifyContent={'center'} height={'50vh'}>
            <SkeletonLoader width='60%'/>
            <SkeletonLoader width='50%'/>
            <SkeletonLoader width='60%' />
            <SkeletonLoader width='50%' />
            <SkeletonLoader width='60%' />
            <SkeletonLoader width='50%' />
         </VStack>
      );

   if (businessDataSuccess && businessesData)
      return (
         <Box>
            <HStack marginBottom={1} justifyContent={"start"}>
               <Box className='btn' color={btnSecondary}>
                  <Text onClick={() => navigate("/dashboard/businesses/add")} fontSize={{ xssToXm: "14px", xmToSm: "16px" }} marginLeft={2}
                     marginBottom={1}
                  >
                     {/* <AiFillPlusCircle /> */}
                     {t("newBusiness")}
                  </Text>
               </Box>
            </HStack>

            <Flex flexDirection={'column'}
               smToMd={{ maxWidth: '70vw' }}
               smDown={{ maxWidth: '96vw' }}
               maxWidth={'98vw'}
               height={'70vh'}

            >
               
               {
                  (businessesData && businessesData.length > 0) ?
                  <Flex>
                     <DataTable
                        TableHeader={
                           <TableHeader headerData={businessTableHeaderData}  />
                        }
                        TableBody={
                           <BusinessTableBody data={businessesData} />
                        }
                        maxHeight={"240px"}
                     />
                  </Flex>
                  :
                  <Text color={textSecondary}>No Businesses Found!</Text>
               }

            </Flex>
         </Box>
      );
}

export default BusinessesTab