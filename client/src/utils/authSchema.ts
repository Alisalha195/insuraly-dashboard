import z from "zod";

export const loginSchema = z.object({
   email: z.string().email({
      message: 'please enter a valid email address !'
   }).nonempty('email can not be empty !')
   // .refine(async (val) => await checkPersonExist('email', val), {
   //    message: 'email is used by another person !'
   // })
   ,
   password : z.string().min(6, 'password must be at least 6 characters !')

});

export const signupSchema = z.object({

   email: z.string().email({
      message: 'please enter a valid email address !'
   }).nonempty('email can not be empty !'),
   // .refine(async (val) => await checkPersonExist('email', val), {
   //    message: 'email is used by another person !'
   // })
      password : z.string().min(6, 'password must be at least 6 characters !') ,
      confirmPassword : z.string().min(6, 'password must be at least 6 characters !')
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"], // This specifies where the error message will be displayed
});