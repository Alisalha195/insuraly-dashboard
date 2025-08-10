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
   if(data)
      return data.count;
 };
 
 