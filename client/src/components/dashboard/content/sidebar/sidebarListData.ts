
import { MdPeople } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdOutlineHandshake } from "react-icons/md";

export const sidabarListData = [
   {
      title: "Authorized Acquires" ,
      collapsidIcon: MdOutlineHandshake ,
      innerList : [
         {
            title: 'view acquires',
            icon :  MdPeople
         },
         {
            title: 'new acquire',
            icon :  IoPersonAddSharp
         },
         
      ]
   },
   {
      title: "Salary Successors" ,
      collapsidIcon: MdPeople ,
      innerList : [
         {
            title: 'view successors',
            icon :  MdPeople
         },
         {
            title: 'new successor',
            icon :  IoPersonAddSharp
         },
         
      ]
   },
]

