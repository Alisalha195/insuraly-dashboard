

import SearchActions from "../../../../../../shared/tables/SearchActions";
import { UsersLogsSearchData } from "./search/UsersLogsSearchData";

const UsersLogsSearchActions = ({ searchValue }) => {

   return (
      <SearchActions
         searchContentData={UsersLogsSearchData}
         searchValue={searchValue}
      />
   )
}

export default UsersLogsSearchActions;