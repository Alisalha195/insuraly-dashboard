
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin2Line } from "react-icons/ri";
import { SiWikibooks } from "react-icons/si";

export const tableMenuData = [
   {
      title : 'edit',
      icon: TiEdit ,
      clickLink: (params) => `/dashboard/businesses/${params?.businessID || 0}/employees/edit`
   },
   {
      title : 'new service',
      icon: SiWikibooks,
      clickLink: (params) => `/dashboard/businesses/${params?.businessID || 0}/employees/${params?.employeeID}/services/add`
      
   },
   {
      title : 'delete',
      icon: RiDeleteBin2Line,
      clickLink: 'delete'

   },
]