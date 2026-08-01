
import { useQuery } from "@tanstack/react-query";
import { host } from "../../constants/connection";

export const getMonthlyRetirementsCount = (year ,month ,type) => {
   const {
     data: monthlyRetirementsCount,
     isLoading,
     isSuccess: isSuccessMonthlyRetirementsCount,
   } = useQuery({
     queryKey: ["monthlyRetirementsCount",  year ,month ,type],
     queryFn: () =>
       fetch(`${host}/retirement/getMonthlyRetirementCount?year=${year}&month=${month}&type=${type}`).then((res) => res.json()),
     refetchInterval: 5000,
     keepPreviousData: true,
     staleTime: 30000,
   });
   return  monthlyRetirementsCount?.count;
 };