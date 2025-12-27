import SearchActions from '../../../../../../shared/tables/SearchActions';
import { EmployeesSearchData } from './EmployeesSearchData';

const EmployeeSearchActions = ({ searchValue, ...params }) => {

   return (
      <SearchActions
         searchContentData={EmployeesSearchData}
         searchValue={searchValue}
         {...params}
      />
   )
}

export default EmployeeSearchActions;