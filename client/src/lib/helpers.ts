

export const getScrollBarWidth = (elementRef) => {
   const width = elementRef?.current?.offsetWidth - elementRef?.current?.clientWidth;
   if(width > 0)
      return width;
   else 
      return 0;
}

export const checkZodErrors = (errors) => {
   let hasErrors = false;
   Object.keys(errors).forEach((key) => {
      if(errors[key]){
         hasErrors = true;
      }
   });
   return hasErrors;
}

export const checkServiceInitiateDateValidation = (services, includedServiceInitDate, includedServiceFinishDate = null, serviceHasFinishDate=false ) => {
   
   // console.log("includedServiceInitDate ::",includedServiceInitDate)
   // console.log("includedServiceFinishDate ::",includedServiceFinishDate)
   // console.log("services in  checkServiceInitiateDateValidation ::",services)
   
   if(services.length < 1) {
      console.log("0")
      return false;
   }
   
   let isValidService = true;
   
   if(includedServiceFinishDate && serviceHasFinishDate) {
     
      if(new Date(includedServiceFinishDate) < new Date(includedServiceInitDate)) {
         isValidService = false;
         console.log("finish date can not be before init date");
         return isValidService;
      }
      for (const service of services) {
         
         if (!service.finish_date) {
            isValidService = false;
            console.log("00")
            break;
         }
         
         if ((new Date(includedServiceFinishDate) > new Date(service.initiate_start_date)) && (new Date(includedServiceFinishDate) < new Date(service.finish_date))) {
            isValidService = false;
            console.log("1");
            break;
         } 
         
         if ((new Date(includedServiceInitDate) > new Date(service.initiate_start_date)) && (new Date(includedServiceInitDate) < new Date(service.finish_date))) {
            isValidService = false;
            console.log("2");
            break;
         }
         
         if((new Date(includedServiceInitDate) < new Date(service.initiate_start_date)) && (new Date(includedServiceFinishDate) > new Date(service.finish_date))) {
            isValidService = false;
            
            console.log("3");
            // console.log("includedServiceInitDate",includedServiceInitDate);
            // console.log("includedServiceFinishDate",includedServiceFinishDate);
            
            break;
         }
      }
      
   } else {
      

      for (const service of services) {
         
         if (!service?.finish_date) {
            isValidService = false;
            console.log("4");
            break;
         }
         
         if ((new Date(includedServiceInitDate) > new Date(service?.initiate_start_date)) && (new Date(includedServiceInitDate) < new Date(service?.finish_date))) {
            isValidService = false;
            console.log("5");
            break;
         }
         if((new Date(includedServiceInitDate) < new Date(service?.initiate_start_date))) {
            isValidService = false;
            console.log("6");
            break;
         }
         
         // if((new Date(includedServiceInitDate) > new Date(service?.initiate_start_date))) {
         //    isValidService = true;
         //    break;
         // }
      }
      
   }
   // console.log("vv:",isValidService)
   return isValidService;
}

export const getMonthNames = () => {
   return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
}

export const reshapeRetirementsData = (data) => {
   // for each Retirement:
   // for each 
   // sort the data according to servi
}

export const getDataGroupedByMonthes = (data) => {
   const monthes = getMonthNames();
   let groupedData = Array.from(monthes, (element, index) => []);
   
   data.map((item) => {
      groupedData[item.month - 1].push(item);
   })
   
   // getAnnulaClaimsShapedData(groupedClaims);
   return groupedData;
}

export const getAnnulaClaimsShapedData = (data, year) => {
   // console.log("data in getAnnulaClaimsShapedData :",data);
   const monthes = getMonthNames();
   let shapedClaims = data.map((element, index) => ({
      year : year || new Date().getFullYear() ,
      month: monthes[index],
      monthNumber: index + 1 ,
      claimsCount: 0,
      done: 0,
      claimsAmount: 0
   }));
   
   let claims = data;
   claims.map((item, index)=>{
      shapedClaims[index].claimsCount = item.length;
      item.map(innerItem => {
         
         shapedClaims[index].done =shapedClaims[index].done + (innerItem.delivered ? 1 : 0);
         shapedClaims[index].claimsAmount = shapedClaims[index].claimsAmount + innerItem.amount + innerItem.fine;
      })
   });
   // console.log("shapedClaims :: ",shapedClaims)
   return shapedClaims ;
}
