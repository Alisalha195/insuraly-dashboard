
import { MdAllInclusive } from "react-icons/md";
import { MdBlind } from "react-icons/md";
import { MdBorderColor } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";

export const userMenuListData = [
   {
      text: "profile",
      icon :  CgProfile,
      role : "profile",
      click : function(fun) {
         if (typeof fun === 'function') {
            fun(); 
          }
      }
   },
   {
      text: "logout",
      icon :  LuLogOut ,
      role : "logout" ,
      click : function(fun) {
         if (typeof fun === 'function') {
            fun(); 
          }
      }
   },
   
]