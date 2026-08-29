import React from 'react';
import { useQuery, } from '@tanstack/react-query';
import { getTableRowsCount } from '../api/getTableRowsCount';

import { MdOutlineBusinessCenter } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineElderly } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";


const useInfoCardDataList = () => {


   const claimsCount = getTableRowsCount("claims");
   const businessOwnerCount = getTableRowsCount("businessOwners");
   const businessCount = getTableRowsCount("business");
   const retirementCount = getTableRowsCount("retirement");

   const infoCardDataList = [
      {
         title: "businesses",
         amount: businessCount,
         basicColor: 'blue',
         page: 'businesses',
         icon: MdOutlineBusinessCenter
      },
      {
         title: "owners",
         amount: businessOwnerCount,
         basicColor: 'yellow',
         page: 'business-owners',
         icon: FaChalkboardTeacher
      },
      {
         title: "retirements",
         amount: retirementCount,
         basicColor: 'purple',
         page: 'retirements',
         icon: MdOutlineElderly
      },
      {
         title: "claims",
         amount: claimsCount,
         basicColor: 'orange',
         page: 'claims',
         icon: FaDollarSign
      },
   ];
   return infoCardDataList
}

export default useInfoCardDataList;