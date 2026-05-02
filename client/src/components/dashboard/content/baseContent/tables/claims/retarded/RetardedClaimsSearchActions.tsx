import SearchActions from '../../../../../../shared/tables/SearchActions';
import { BusinessSearchData } from './search/BusinessSerachData';
import { RetardedClaimsSearchData } from './search/RetardedClaimsSearchData';

const RetardedClaimsSearchActions = ({ searchValue, month }:{searchValue:any, month:any}) => {

   return (
      <SearchActions
         searchContentData={RetardedClaimsSearchData}
         searchValue={searchValue}
         month={month}
      />
   )
}

export default RetardedClaimsSearchActions;