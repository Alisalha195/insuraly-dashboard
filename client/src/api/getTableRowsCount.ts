 import {useQuery, } from '@tanstack/react-query';

 
 export const getTableRowsCount = (table) => {
   
   const {data} = useQuery({ 
   //   queryKey: [`${table}` ], 
     queryKey: [`${table}` ], 
     queryFn: () => fetch(`http://localhost:5000/${table}/get-count`).then(res =>  res.json()),
        refetchInterval : 5000,
        keepPreviousData: true ,
        staleTime : 30000,
   });
   if(data)
      return data.count;
 };
 
 