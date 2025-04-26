import {supabase} from "../db/connection.js";


export const getUsers = async (req, res, next) => {
   try {
      const { data, error } = await supabase
     .from('users')
     .select()
      // console.log("in get")
     if(!error && data) {
      res.status(200).send(data)
     }
   } catch(err) {
      throw new Error("error occured")
   }
} 

export const getUser = async (req, res, next) => {
   try {
      const { data, error } = await supabase
     .from('users')
     .select()
     .eq("user_auth_id" , req.body.user_id)

     if(!error && data) {
      res.status(200).send(data)
     }
   } catch(err) {
      throw new Error("error occured")
   }
   
} 

 