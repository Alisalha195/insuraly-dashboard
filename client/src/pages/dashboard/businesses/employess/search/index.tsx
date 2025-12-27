import { useLocation } from "react-router-dom";
import SearchEmployeesContent from "./SearchEmployeesContent";

const SearchEmployees = () => {
   const location = useLocation();
   
  return (
    <SearchEmployeesContent 
      businessName={location?.state?.businessName}
      businessID={location?.state?.businessID}
    />
  )
}

export default SearchEmployees;