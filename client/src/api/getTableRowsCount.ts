 import {useQuery, } from '@tanstack/react-query';
 import {host} from "../constants/connection.ts";
 
 export const getTableRowsCount = (table) => {
   
   const {data} = useQuery({
     queryKey: [`${table}` ], 
     queryFn: () => fetch(`${host}/${table}/get-count`).then(res =>  res.json()),
        refetchInterval : 5000,
        keepPreviousData: true ,
        staleTime : 30000,
   });
   if(data && data.count > 0) {
      return data.count;
   }
 };
 
 export const getEmployeesCountInBusiness = (businessId) => {
   const {data} = useQuery({
      queryKey: [`business`,`${businessId}`], 
      queryFn: () => fetch(`${host}/business/get-employees-count/${businessId}`).then(res =>  res.json()),
         refetchInterval : 5000,
         keepPreviousData: true ,
         staleTime : 30000,
    });
    if(data && data.count > 0) {
      return data.count;
   }
    return data;
 }
 
 