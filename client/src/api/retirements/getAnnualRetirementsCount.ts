import { useQuery } from "@tanstack/react-query";
import { host } from "../../constants/connection";

export const getAnnualRetirementsCount = (year, type) => {
   const {
     data: annualRetirementsCount,
     isLoading,
     isSuccess: isSuccessAnnualRetirementsCount,
   } = useQuery({
     queryKey: ["annualRetirementsCount" ,year  ,type],
     queryFn: () =>
       fetch(`${host}/retirement/getAnnualRetirementCount?year=${year}&type=${type}`).then((res) => res.json()),
     refetchInterval: 5000,
     keepPreviousData: true,
     staleTime: 30000,
   });
   return  annualRetirementsCount?.count;
 };