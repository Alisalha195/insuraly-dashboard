
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin2Line } from "react-icons/ri";
import { LuFolder } from "react-icons/lu";

export const tableMenuData = [
   {
      title : 'view',
      icon: LuFolder ,
      clickLink: (params) => `/dashboard/retirements/${params?.retirementID}`,
      role : "view"
   },
   {
      title : 'edit',
      icon: TiEdit ,
      clickLink: (params) => `/dashboard/retirements/${params?.retirementID}/edit`
   },
  
   {
      title : 'delete',
      icon: RiDeleteBin2Line,
      clickLink: 'delete'

   },
]