import InfoCard from './InfoCard'
import { Grid, Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import useInfoCardDataList from '../../../../../hooks/useInfoCardDataList';
import { Suspense } from 'react';

const InfoCards = () => {
   const navigate = useNavigate();
   const infoCardDataList = useInfoCardDataList()
   return (
      <Grid
         // className=' xs-to-sm-container' 
         templateColumns={{ xmToMd: "repeat(2, 1fr)", mdTo2xl: "repeat(4, 1fr)" }}
         padding={{xssToSm:2, smToMd:5, mdTo3xl:2}} gap={{xssToXmm:2 , xmmToMd:3, mdTo3xl:4}}
      >
         {
            infoCardDataList.map((item, index) => (
               <Box
                  // className=' xs-to-sm-item' 
                  key={index}
                  onClick={() => { navigate(`/dashboard/${item.page}`) }}
               >
                  <InfoCard data={item} />
               </Box>
            ))
         }
      </Grid>
   )
}

export default InfoCards