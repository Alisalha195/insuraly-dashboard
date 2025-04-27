import {supabase} from "../db/connection.js";

export const signup = async (req , res , next) => {
   const email = req.body.email
   const password = req.body.password
   try {
      const {data: {session}} = await supabase.auth.getSession()
      if(!session) {
         const { data: {user} } = await supabase.auth.signUp({
            email: email,
            password: password,
         })
         if(user) {
            if(createUser(user) ) {
               res.status(200).send("user signed up successfuly !");
               next()
            } else {
               res.status(400).send("something went wrong  !");
            }

         } else {
         res.status(400).send("user allready exist  !");
         }
      } else {
         res.status(400).send("user allready signed in  !");
      }
      
   } catch (err) {
      throw new Error("error occured !")
   }

   
}

export const login = async (req , res , next) => {
   const email = req.body.email
   const password = req.body.password
   
   try {
      const {data: {session}} = await supabase.auth.getSession()
      if(!session) {
         const { data: {user} } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
         })
                  if(user) {
            res.status(200).send("user logged in successfuly !");
            next();
         }
      } else {
         res.status(400).send("user allready logged in  !");
      }
      
   } catch (err) {
      throw new Error("error occured !")
   }
}

export const logout = async (req , res , next) => {
   try {
      await supabase.auth.signOut();
      console.log("ddd")
      res.status(200).send("user logged out successfuly")
   } catch(err) {
      console.log(err)
   }
}

const createUser = async (user) => {
   const { error } = await supabase
  .from('users')
  .insert({ user_auth_id : user.id });
  
  return (error ? false : true)
}