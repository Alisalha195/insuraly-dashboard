
import { useQuery } from "@tanstack/react-query";
import { host } from "../../constants/connection";


export const getSalaryReceiptCenters = () => {
   
   const {
      data: receiptCentersData,
      isLoading: isLoadingReceiptCentersData,
      isSuccess: isSuccesscReceiptCentersData,
    } = useQuery({
      queryKey: ["receipt-centers-data"],
      queryFn: () => fetch(`${host}/retirement/receipt-centers`).then((res) => res.json()),
      refetchInterval: 5000,
      keepPreviousData: true,
      staleTime: 30000,
    });

   //  console.log("data in func :",receiptCentersData)
    return { receiptCentersData, isSuccesscReceiptCentersData, isLoadingReceiptCentersData };
}