
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin2Line } from "react-icons/ri";

export const annualClaimsTableMenuData = [
   {
      title : 'edit',
      icon: TiEdit ,
      // clickLink: '/dashboard/business-owners/edit'
      clickLink: (cliamID) => `/profile/${cliamID}/edit`
   },
   {
      title : 'delete',
      icon: RiDeleteBin2Line,
      clickLink: 'delete'

   }
]