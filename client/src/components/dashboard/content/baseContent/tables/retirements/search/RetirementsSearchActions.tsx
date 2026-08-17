import SearchActions from '../../../../../../shared/tables/SearchActions';
import { RetirementsSearchData } from './RetirementsSearchData';

const RetirementsSearchActions = ({ searchValue, ...params }) => {

   return (
      <SearchActions
         searchContentData={RetirementsSearchData}
         searchValue={searchValue}
         {...params}
      />
   )
}

export default RetirementsSearchActions;