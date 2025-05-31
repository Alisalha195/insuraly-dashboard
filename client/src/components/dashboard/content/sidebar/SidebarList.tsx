
import { sidabarListData } from "./sidebarListData";
import DropDownGroup from "./DropDownGroup";

const SidebarList = () => {

   return (
      <>
         <DropDownGroup data={sidabarListData}/>
      </>
   );
}

export default SidebarList;
