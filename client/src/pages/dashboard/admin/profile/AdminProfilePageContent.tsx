import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, HStack, Flex, Text, VStack, Icon, Span, } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { useTranslation } from 'react-i18next'; 
import { logsTableHeaderData } from '../../../../components/dashboard/content/baseContent/tables/admin/logs/logsTableHeaderData.ts';
import LogsTableBody from '../../../../components/dashboard/content/baseContent/tables/admin/logs/LogsTableBody.tsx';
import useLangDir from '../../../../hooks/useLangDir.ts';
import { getTableRowsCount } from '../../../../api/getTableRowsCount.ts';
import useThemedColors from '../../../../hooks/useThemedColors.ts';
import { useAuthCustomQuery } from '../../../../hooks/useCustomQuery.ts';
import { host } from '../../../../constants/connection.ts';
import PageHeadTitle from '../../../../components/shared/PageHeadTitle.tsx';
import DataTable from '../../../../components/shared/tables/DataTable.tsx';
import TableHeader from '../../../../components/shared/tables/TableHeader.tsx';
import DataTableControl from '../../../../components/shared/tables/DataTableControl.tsx';
import SkeletonLoader from '../../../../components/shared/Skeleton.tsx';


const AdminProfilePageContent = () => {
   
   const navigate = useNavigate();
   const [currentpage, setCurrentPage] = useState(1);
   const pageSize = 5;
   const { btnSecondary, textPrimary, bgSecondary, textSecondary } = useThemedColors();
   const logsCount = getTableRowsCount('admin/audit-logs');

   const {t} = useTranslation();
   const {isRTL, dir} = useLangDir();
   
   const { 
      data:logsData, 
      error:logsDataError, 
      isSuccess:logsDataSuccess ,
      isLoading :logsDataIsLoading
   } = useAuthCustomQuery(
      ['users-logs', currentpage] ,
      `${host}/admin/audit-logs?page=${currentpage}&pageSize=${pageSize}`
   );
   
   console.log("logsData", logsData?.logs);
   
   return (
      <Box >
         {/* header line */}
         <PageHeadTitle
            backButton={true} 
            title={<Span fontWeight={500} color={textSecondary}>{t("users logs")} </Span>}
         />
         
         {/* upper control */}
         <HStack justifyContent={"start"} marginBottom={1}>
            <Flex flexDirection={'column'} justifyContent={'center'} paddingY={0} paddingX={1} onClick={() => navigate("/admin/logs/search")}>
               <Icon
                  fontSize={{ xssToXs: "16px", xsToXm: "18px", xmToSm: "20px" }}
               >
                  <LuSearch
                     className='btn'
                  />
               </Icon>
            </Flex>
            
         </HStack>

         <Flex flexDirection={'column'}
            smToMd={{ maxWidth: '70vw' }}
            smDown={{ maxWidth: '96vw' }}
            maxWidth={'98vw'}
            height={'70vh'}
            >
           {
            logsData && logsData?.logs.length > 0 ? (
              <>
                  <DataTable
                     TableHeader={
                        <TableHeader headerData={logsTableHeaderData} />
                     }
                     TableBody={
                        <LogsTableBody data={logsData?.logs} search={false} />
                     }
                     maxHeight={"560px"}
                     successful={!!logsDataSuccess}
                  />
                  <DataTableControl
                     currentpage={currentpage}
                     setCurrentPage={setCurrentPage}
                     completeDataCount={logsCount}
                     pageSize={pageSize}
                  />
               </>
            )
            :(logsDataIsLoading) && 
            (
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
         </Flex>
         
      </Box>
   );
}

export default AdminProfilePageContent