
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin2Line } from "react-icons/ri";
import { SiWikibooks } from "react-icons/si";

export const tableMenuData = [
   {
      title : 'edit',
      icon: TiEdit ,
      clickLink: (params) => `/profile/${params?.personalInfoId}/edit`,
      role : "edit"
   },
   {
      title : 'newService',
      icon: SiWikibooks,
      clickLink: (params) => `/dashboard/businesses/${params?.businessID || 0}/employees/${params?.employeeID}/services/add`,
      role : "new_service"
      
   },
   {
      title : 'delete',
      icon: RiDeleteBin2Line,
      clickLink: 'delete',
      role : "delete"

   },
]