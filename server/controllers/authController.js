import {supabase} from "../db/connection.js";
import { userRolesTable } from "../db/tables.js";

export const signup2 = async (req , res , next) => {
   const email = req.body.email;
   const password = req.body.password;
   
   console.log("signup controller reached");
   console.log("email:", email);
   console.log("password:",password);
   
      const {data: {session}} = await supabase?.auth?.getSession();
      // if(session) await supabase.auth.signOut()
      console.log("init session:",session?.user?.email);
      
      if(!session) {
         
         const { data: signUpData } = await supabase.auth.signUp({
            email: email,
            password: password,
         })
         
         console.log("data$$::", signUpData);
         const user = signUpData?.user;
         const session = signUpData?.session;
         
         if(user) {
            console.log("user exist");
            // req.body.user_id = user.id;
            // const {data: {session}} = await supabase.auth.getSession();
            
            
            
            
            console.log("user after signup:", session);
            res.status(200).json({ msg: "user signed up successfuly  !", status: 200, session });
            next()
         } else {
            console.log("user allready exist");
         // res.status(400).send("user allready exist  !");
         res.status(404).json({ msg: "user allready exist  !", status: 404 });
         }
      } else {
         await supabase.auth.signOut()
         console.log("user session:",session?.user?.email);
         res.status(201).json({ msg: "user allready signed in  !", status: 201 ,session });
      }

}

export const login = async (req , res , next) => {
   const email = req.body.email
   const password = req.body.password
   
   console.log("login controller reached");
   console.log("email:", email);
   // console.log("password:",password);
   
      const {data: {session}} = await supabase.auth.getSession()
      // if(session) await supabase.auth.signOut()
      if(!session) {
         const { data: {user} } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
         })
         if(user) {
            const {data: {session}} = await supabase.auth.getSession();
            // console.log("user after login:", session);
            res.status(200).json({msg:"user logged in successfuly  !" , status:200 , session});
            // next();
            return
         } else {
            res.status(400).json({msg:"wrong password or email  !" , status:400});
            return
         }
      } else {
         // console.log("user allready logged in:", session);
         res.status(400).json({msg:"user allready logged in  !" , status:400});
         return
      }
      
}

export const logout = async (req , res , next) => {
   const {access_token} = req.body;
   console.log('log out reached!')
   
      const {error} =  await supabase.auth.signOut(access_token);
      if(error) {
         res.status(400).json({status:400})
      }
      console.log("signed out successfuly")
      res.status(200).json({status:200})
   
}



export const signup = async (req, res, next) => {
   const { email, password } = req.body;
 
   try {
     // 1. Destructure BOTH user and session directly from signUp
     const { data, error } = await supabase.auth.signUp({
       email: email,
       password: password,
     });
     
 
     if (error) {
       console.error("signup error:", error.message);
       // Supabase returns specific errors if a user already exists
       return res.status(400).json({ msg: error.message, status: 400 });
     }
 
     const {data:roleInsert, error :  roleInsertError} = await supabase
     .from(userRolesTable)
     .insert({
      role: "user",
      user_id: data?.session?.user?.id,
      email : email
     })
     .select();
     
     if (roleInsertError) {
      
      await supabase.auth.signOut(data?.session?.access_token);
      
      return res.status(400).json({ msg: error.message, status: 400 });
    }
     
     const user = data?.user;
     const session = data?.session; // This will contain access_token if email confirmation is OFF
 
     if (user) {
       // If session is null but user exists, email confirmation is required by your Supabase settings
       if (!session) {
         return res.status(201).json({ 
           msg: "Please check your email to confirm your account!", 
           status: 201,
           session: null 
         });
       }
 
       // If email confirmation is off, you get a session immediately
       return res.status(200).json({ 
         msg: "User signed up successfully!", 
         status: 200, 
         session 
       });
     }
 
   } catch (err) {
     console.error("System error during signup:", err);
     return res.status(500).json({ msg: "Internal server error", status: 500 });
   }
 };
 
