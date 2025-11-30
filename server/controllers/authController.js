import {supabase} from "../db/connection.js";

export const signup = async (req , res , next) => {
   const email = req.body.email;
   const password = req.body.password;
   
   console.log("signup controller reached");
   console.log("email:", email);
   console.log("password:",password);
   
      const {data: {session}} = await supabase?.auth?.getSession();
      if(session) await supabase.auth.signOut()
      // console.log("init session:",session?.user?.email);
      
      if(!session) {
         
         const { data: {user} } = await supabase.auth.signUp({
            email: email,
            password: password,
         })
         if(user) {
            console.log("user exist");
            // req.body.user_id = user.id;
            const {data: {session}} = await supabase.auth.getSession();
            console.log("user after signup:", session);
            res.status(200).json({ msg: "user signed up successfuly  !", status: 200, session });
            next()
         } else {
            console.log("user allready exist");
         // res.status(400).send("user allready exist  !");
         res.status(404).json({ msg: "user allready exist  !", status: 404 });
         }
      } else {
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
      if(session) await supabase.auth.signOut()
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
            res.status(400).json({msg:"user did not login  !" , status:400});
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
