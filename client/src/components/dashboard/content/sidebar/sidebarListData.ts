
import { MdPeople } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdOutlineHandshake } from "react-icons/md";

export const sidabarListData = [
   {
      title: "authorizedAcquires" ,
      collapsidIcon: MdOutlineHandshake ,
      innerList : [
         {
            title: 'viewAcquires',
            icon :  MdPeople
         },
         {
            title: 'newAcquire',
            icon :  IoPersonAddSharp
         },
         
      ]
   },
   {
      title: "salarySuccessors" ,
      collapsidIcon: MdPeople ,
      innerList : [
         {
            title: 'viewSuccessors',
            icon :  MdPeople
         },
         {
            title: 'newSuccessor',
            icon :  IoPersonAddSharp
         },
         
      ]
   },
]

