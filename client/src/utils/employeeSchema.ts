import z from "zod";
import { PersonalSchema } from "./personalSchema";


   
const formSchema = z.object({
   // employeeID : z.number(),
   personID : z.number(), 
   // businessID : z.number(),
   
   
   initiateDate : z.date().refine((date) => date <= new Date(), {
      message: "initiate date can not be in the future",
   }),
   // .refine(async(val) => await handleCheckValidInitiateDate(val) , {
   //    message: "not accepted"
   // }),
   
   initiateSalary : z.number().nonnegative(),
   initiateRegistrationDate :  z.date().refine((date) => date <= new Date(), {
      message: "initiate registration date can not be in the future",
   }),
   initiateRegistrationNumber: z.number().nonnegative(),

   
   finishReason : z.string().optional(),
   finishDate : z.date().optional().refine((date) => date <= new Date(), {
      message: "finish date can not be in the future",
   }),
   // .refine(async(val) => await handleCheckValidInitiateDate(val) , {
   //    message: "not accepted"
   // }),
   finishRegistrationDate :  z.date().optional().refine((date) => date <= new Date(), {
      message: "finish registration date can not be in the future",
   }),
   finishRegistrationNumber: z.number().nonnegative().optional(),
   
});

export const EmployeeSchema = (vars:{
   handleViewPersonName: (val: any) => Promise<boolean>
}) => {
   
   const addEmployeeSchema = formSchema.extend({
      
      employeeInsuranceNumber : z.number().nonnegative()
      .refine(async(val) => await vars.handleViewPersonName(val) , {
         message: "not an employee"
      }),
      
   })
      
   return addEmployeeSchema.partial({
      finishRegistrationDate: true,
      finishDate:true,
      finishRegistrationNumber:true,
      finishReason:true
   });
}

export const NewEmployeeSchema = (vars?:{
   checkPersonExist: (key:string, val: any) => Promise<boolean>
}) => {
   const personaSchema = PersonalSchema(vars);
   const personaSchemaShape = personaSchema.shape;
   
   const newEmployeeSchema = formSchema.extend(
      personaSchemaShape

   ).omit({
      personID: true,
      // businessID: true,
   });
      
   return newEmployeeSchema.partial({
      finishRegistrationDate: true,
      finishDate:true,
      finishRegistrationNumber:true,
      finishReason:true
   });
}
      
export const ServiceSchema = () => {
   
   const serviceSchema = formSchema.omit({
      personID: true,
      // businessID: true,
   });
      
   return serviceSchema.partial({
      finishRegistrationDate: true,
      finishDate:true,
      finishRegistrationNumber:true,
      finishReason:true
   });
}

const wageSchema = z.object({
   
   wageDate : z.date().refine((date) => date <= new Date(), {
      message: "wage date can not be in the future",
   }),
   wageAmount : z.number().min(0, "Amount must be a positive number")
});

const totalWageSchema = z.object({
   wages: z.array(wageSchema).min(1, "At least one wage entry is required"),
});


export const WagesSchema = () => {
   return totalWageSchema;
}

export type WagesSchemaFormData = z.infer<typeof totalWageSchema>;


export type EmployeeSchemaFormData = z.infer<ReturnType<typeof EmployeeSchema>>;
export type NewEmployeeSchemaFormData = z.infer<ReturnType<typeof NewEmployeeSchema>>;
export type ServiceSchemaFormData = z.infer<ReturnType<typeof ServiceSchema>>;