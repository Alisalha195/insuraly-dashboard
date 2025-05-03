import {supabase} from "../db/connection.js";
import { usersTable } from "../db/tables.js";

export  const createUser = async (req, res, next) => {
   const { error } = await supabase
  .from(usersTable)
  .insert({ user_auth_id : req.body.user_id });
  
  if(error) {
    res.status(400).send("error , user was not saved")
  } else {
   res.status(200).send("new user saved successfuly")
  }
}

export const getUsers = async (req, res, next) => {
   try {
      const { data, error } = await supabase
     .from(usersTable)
     .select()

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
     .from(usersTable)
     .select()
     .eq("user_auth_id" , req.body.user_id)

     if(!error && data) {
      res.status(200).send(data)
     }
   } catch(err) {
      throw new Error("error occured")
   }
   
} 

 