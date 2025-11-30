import SearchActions from '../../../../../shared/tables/SearchActions';
import { BusinessSearchData } from './search/BusinessSerachData';

const BusinessOwnerSearchActions = ({ searchValue }) => {

   return (
      <SearchActions
         searchContentData={BusinessSearchData}
         searchValue={searchValue}
      />
   )
}

export default BusinessOwnerSearchActions;