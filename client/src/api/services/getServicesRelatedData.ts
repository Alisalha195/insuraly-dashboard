import { useQuery } from "@tanstack/react-query";
import { host } from "../../constants/connection";


export const getFinishedWorkReasons = () => {
   
   const {
      data: reasonsData,
      isLoading: isLoadingReasonsData,
      isSuccess: isSuccessReasonsData,
      error : isErrorReasonsData
    } = useQuery({
      queryKey: ["reasons-data"],
      queryFn: () => fetch(`${host}/services/reasons`).then((res) => res.json()),
      refetchInterval: 5000,
      keepPreviousData: true,
      staleTime: 30000,
    });

   //  console.log("data in func :",reasonsData)
    return { reasonsData, isSuccessReasonsData, isLoadingReasonsData, isErrorReasonsData };
}