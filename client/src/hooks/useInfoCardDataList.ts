import React from 'react';
 import {useQuery, } from '@tanstack/react-query';
import { getTableRowsCount } from '../api/getTableRowsCount';


const useInfoCardDataList = () => {
   
   
   const claimsCount = getTableRowsCount("claims");
   const businessOwnerCount = getTableRowsCount("businessOwners");
   const businessCount = getTableRowsCount("business");
   const retirementCount = getTableRowsCount("retirement");
   
   const infoCardDataList = [
      {
         title:"Businesses",
         amount: businessCount,
         bgColor:'blue',
         page:'businesses'
      },
      {
         title:"Claims",
         amount: claimsCount,
         bgColor:'red' ,
         page:'claims'
      },
      {
         title:"Businesses Owners",
         amount: businessOwnerCount,
         bgColor:'purple',
         page:'business-owners'
      },
      {
         title:"Retirements",
         amount: retirementCount,
         bgColor:'green',
         page:'retirements'
      },
   ];
  return infoCardDataList
}

export default useInfoCardDataList;