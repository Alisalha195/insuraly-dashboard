import InfoCard from './InfoCard'
import {  Grid, Box  } from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom' ; 
import useInfoCardDataList from '../../../../../hooks/useInfoCardDataList';

const InfoCards = () => {
   const navigate = useNavigate();
   const  infoCardDataList = useInfoCardDataList()
  return (
   <Grid  className=' xs-to-sm-container' templateColumns={{ smToMd:"repeat(2, 1fr)", mdTo2xl:"repeat(4, 1fr)"}}   padding={2} gap={2}>
      {
         infoCardDataList.map((item , index)=>(
            <Box  className=' xs-to-sm-item' key={index} onClick={()=>{navigate(`/dashboard/${item.page}`)}} > 
               <InfoCard  data={item} />
            </Box>
         ))
      }
   </Grid>
   
  )
}

export default InfoCards