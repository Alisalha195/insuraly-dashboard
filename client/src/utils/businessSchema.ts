import z from "zod";

export const BusinessSchema = (vars?: {
   handleViewBusinessOwnerName : (val: any) => Promise<boolean>
}) => {
   return z.object({
      businessName: z.string().nonempty("business name can not be empty !"),
      commercialType: z.string().nonempty('commercial type can not be empty !'),
      stage: z.string().nonempty('stage can not be empty !'),
      status: z.string().nonempty('status can not be empty !'),
      lawInitiativeDate: z.date().refine((date) => date <= new Date(), {
         message: "law initiative date can not be in the future",
      }), 
      
      bOwnerInsuranceNumber : z.number().nonnegative()
      .min(1,{message:"can not be empty"}).refine(async(val) => await vars.handleViewBusinessOwnerName(val) , {
         message: "not a business owner"
      }),
      
      country: z.string().nonempty('country can not be empty !'),
      city: z.string().nonempty('city can not be empty !'),
      
      businessOwnerId :z.number(),
   });
}