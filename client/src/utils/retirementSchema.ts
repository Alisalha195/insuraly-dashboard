import z from "zod";


export const RetirementSchema = (vars:{
   handleViewEmployeedName: (val: any) => Promise<boolean>
}) => {
   
   const retirementSchema = z.object({

      employeeInsuranceNumber : z.number().nonnegative()
      .refine(async(val) => await vars.handleViewEmployeedName(val) , {
         message: "not an employee"
      }),
      finishReason : z.string().optional(),
      // employeeID : z.number().nonnegative()
   });
      
   return retirementSchema ;
     
}

export const RetirementExtindingSchema = z.object({

   salary: z.number().nonnegative(),
   salaryReceiptCenter: z.string().nonempty('salary center can not be empty !'),
   
   salaryInitiateDate :  z.date().refine((date) => date <= new Date(), {
         message: "salary initiate date can not be in the future",
      }),
   
   accumulations: z.number().nonnegative(), 
   
   indemnification :  z.number().nonnegative(), 
   
   wifeShare: z.number().nonnegative(),
   childrenShare: z.number().nonnegative(),
   // otherShare: z.number().nonnegative().optional(),
   
});

export const ExtindingSchema = () => {
   return RetirementExtindingSchema;
}

export type RetirementSchemaFormData = z.infer<ReturnType<typeof RetirementSchema>>;
export type RetirementExtindingSchemaFormData = z.infer<ReturnType<typeof ExtindingSchema>>;

