import {supabase} from "../db/connection.js"

export const signup = async (req , res , next) => {
   const email = req.body.email
   const password = req.body.password
   try {
      const { data, error } = await supabase.auth.signUp({
         email: email,
         password: password,
      })
      res.status(200).send("user signed up successfuly !");
      next(data)
   } catch (err) {
      res.status(400).send("something went wrong")
   }

   
}

export const login = async (req , res , next) => {
   const email = req.body.email
   const password = req.body.password
   
   try {
      const { data, error } = await supabase.auth.signInWithPassword({
         email: email,
         password: password,
      })
      res.status(200).send("user logged in successfuly !");
      next(data)
   } catch (err) {
      res.status(400).send("something went wrong")
   }
}

export const logout = async (req , res , next) => {
   try {
      await supabase.auth.signOut();
      res.status(200).send("user logged out successfuly")
   } catch(err) {
      console.log(err)
      res.status(400).send("something went wrong")
   }
}