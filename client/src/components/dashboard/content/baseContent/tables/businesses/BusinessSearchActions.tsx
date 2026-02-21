import SearchActions from '../../../../../shared/tables/SearchActions';
import { BusinessSearchData } from './search/BusinessSerachData';

const BusinessSearchActions = ({ searchValue }) => {

   return (
      <SearchActions
         searchContentData={BusinessSearchData}
         searchValue={searchValue}
      />
   )
}

export default BusinessSearchActions;