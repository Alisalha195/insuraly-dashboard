
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin2Line } from "react-icons/ri";

export const tableMenuData = [
   {
      title : 'edit',
      icon: TiEdit ,
      clickLink: '/dashboard/businesses/edit',
      role: "edit"
   },
   {
      title : 'delete',
      icon: RiDeleteBin2Line,
      clickLink: 'delete',
      role: "delete"

   }
]