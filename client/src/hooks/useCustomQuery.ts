import { useQuery } from "@tanstack/react-query";


export const useCustomQuery = (queryKey:string|number[], url:string, 
   options:any={refetchInterval: 5000,
      keepPreviousData: true,
      staleTime: 3000,}
) => {
   const { data, error, isLoading, isSuccess, refetch } = useQuery({
      queryKey: queryKey, 
      queryFn : () => fetch(url).then((res) => res.json()),   
      ...options  
   });
   
   return { data, error, isSuccess ,isLoading, refetch };
}

export const usePostCustomQuery = (queryKey:string|number[], url:string,
   stringified:object[] | object , 
   options:any={refetchInterval: 5000,
      keepPreviousData: false,
      staleTime: 30000,} ,
    
   ) => {
      const { data, error, isLoading, isSuccess, refetch } = useQuery({
         queryKey: queryKey, 
         queryFn : () => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(stringified) }).then((res) => res.json()),   
         ...options  
      });
      
      return { data, error, isSuccess ,isLoading, refetch };
   }

/* 
export const useCustomQuery = (queryKey:string[], queryFn:() => Promise<any>, options?:any) => {
   const { data, error, isLoading, isSuccess, refetch } = useQuery({
      queryKey: queryKey, 
      queryFn : queryFn,   
      ...options
   });
   
   return { data, error, isSuccess ,isLoading, refetch };
}
*/