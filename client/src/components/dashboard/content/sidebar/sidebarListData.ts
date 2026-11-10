
import { MdPeople } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdOutlineHandshake } from "react-icons/md";
// import { url } from "zod";

export const sidabarListData = [
   {
      title: "authorizedAcquires" ,
      collapsidIcon: MdOutlineHandshake ,
      innerList : [
         {
            title: 'viewAcquires',
            icon :  MdPeople,
            url   : "/dashboard/retirements/Acquires"
         },
         {
            title: 'newAcquire',
            icon :  IoPersonAddSharp,
            url   : "/dashboard/retirements/AddAcquire"
         },
         
      ]
   },
   {
      title: "salarySuccessors" ,
      collapsidIcon: MdPeople ,
      innerList : [
         {
            title: 'viewSuccessors',
            icon :  MdPeople,
            url   : "/dashboard/retirements/Successors"
         },
         {
            title: 'newSuccessor',
            icon :  IoPersonAddSharp,
            url   : "/dashboard/retirements/AddSuccessor"
         },
         
      ]
   },
]

