import SearchActions from '../../../../../../shared/tables/SearchActions';
import { BusinessSearchData } from './search/BusinessSerachData';
import { MonthlyClaimsSearchData } from './search/MonthlyClaimsSearchData';

const MonthlyClaimsSearchActions = ({ searchValue, month }:{searchValue:any, month:any}) => {

   return (
      <SearchActions
         searchContentData={MonthlyClaimsSearchData}
         searchValue={searchValue}
         month={month}
      />
   )
}

export default MonthlyClaimsSearchActions;