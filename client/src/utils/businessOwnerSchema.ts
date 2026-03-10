import z from "zod"
import { PersonalSchema } from "./personalSchema"


export const BusinessOwnerSchema = (vars?:{
   checkPersonExist: (key:string, val: any) => Promise<boolean>
}) => {
      const formSchema = PersonalSchema(vars);
      return formSchema;
}

export type BusinessOwnerSchemaFormData = z.infer<ReturnType<typeof BusinessOwnerSchema>>;
