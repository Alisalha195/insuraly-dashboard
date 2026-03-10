import z from "zod";

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

export const PersonalSchema = (vars?:{
   checkPersonExist: (key:string, val: any) => Promise<boolean>
}) => {
   const formSchema = z.object({
      firstName: z.string().nonempty('first name can not be empty !'),
      lastName: z.string().nonempty('last name can not be empty !'),
      fatherName: z.string().nonempty('father name can not be empty !'),
      motherName: z.string().nonempty('mother name can not be empty !'),

      nationalNumber: z.number().refine((val) => val.toString().length === 11, {
         message: 'national number must be 11 digits !'
      }).refine(async (val) => await vars?.checkPersonExist('national_number', val), {
         message: 'national number is used by another person !'
      }),

      gender: z.string(),

      // birthDate: z.date(),
         birthDate: z.date().max(eighteenYearsAgo, {message: "employee must be greater than 18 years old!"}).refine((date) => date <= new Date(), {
            message: "birth date can not be in the future",
         }),

      birthLocation: z.string().nonempty('birth location can not be empty !'),
      registrationLocation: z.string().nonempty('registration location can not be empty !'),
      registrationDigit: z.string().nonempty('registration digit can not be empty !'),

      phoneNumber: z.number().refine((val) => val.toString().length === 9, {
         message: 'phone number must be 9 digits !'
      }).refine(async (val) => await vars?.checkPersonExist('phone_number', val), {
         message: 'phone number is used by another person !'
      }),

      email: z.string().email({
         message: 'please enter a valid email address !'
      }).nonempty('email can not be empty !').refine(async (val) => await vars?.checkPersonExist('email', val), {
         message: 'email is used by another person !'
      }),
   });
   
   return formSchema;
} 

export type PersonalSchemaFormData = z.infer<ReturnType<typeof PersonalSchema>>;
