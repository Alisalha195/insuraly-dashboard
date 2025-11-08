import SearchActions from '../../../../../shared/tables/SearchActions';
import { BusinessOwnersSearchData } from './search/BusinessOwnersSerachData';

const BusinessOwnerSearchActions = ({ searchValue }) => {

   return (
      <SearchActions
         searchContentData={BusinessOwnersSearchData}
         searchValue={searchValue}
      />
   )
}

export default BusinessOwnerSearchActions;