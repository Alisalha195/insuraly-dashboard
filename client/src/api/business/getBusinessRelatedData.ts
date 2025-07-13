 import {useQuery, } from '@tanstack/react-query';

 
 export const getBusinessStages = () => {
   
   const {data:stagesData, isLoading, isSuccess:isSuccessStages} = useQuery({ 
     queryKey: ['stages' ], 
     queryFn: () => fetch('http://localhost:5000/business/stages').then(res =>  res.json()),
        refetchInterval : 5000,
        keepPreviousData: true ,
        staleTime : 30000,
   });
   return {stagesData , isSuccessStages};
 };
 
 export const getBusinessCommercialTypes = () => {
   
   const {data:commercialTypesData, isLoading, isSuccess:isSuccessCommercialTypes} = useQuery({ 
     queryKey: ['commercial-types' ], 
     queryFn: () => fetch('http://localhost:5000/business/commercialTypes').then(res =>  res.json()),
        refetchInterval : 5000,
        keepPreviousData: true ,
        staleTime : 30000,
   });
   return {commercialTypesData , isSuccessCommercialTypes};
 };
 
 export const getBusinessStatuses = () => {
   
   const {data:statusesData, isLoading, isSuccess:isSuccessStatusesData} = useQuery({ 
     queryKey: ['statuses' ], 
     queryFn: () => fetch('http://localhost:5000/business/statuses').then(res =>  res.json()),
        refetchInterval : 5000,
        keepPreviousData: true ,
        staleTime : 30000,
   });
   return {statusesData , isSuccessStatusesData};
 };
 

 
 export const getCountriesWithFlags = () => {
   
   const {data:countries, isLoading, isSuccess:isSuccessCountries} = useQuery({ 
     queryKey: ['contries-flages' ], 
     queryFn: () => fetch(' https://countriesnow.space/api/v0.1/countries/flag/images').then(res =>  res.json()),
        refetchInterval : 50000,
        keepPreviousData: true ,
        staleTime : 30000,
   });
   return {countries , isSuccessCountries};
 };
 
 export const getCities = (country) => {
   
   const {data:cities, isLoading, isSuccess:isSuccessCities} = useQuery({ 
     queryKey: ['cities' ], 
     queryFn: () => fetch('https://countriesnow.space/api/v0.1/countries/states',{method:'POST', headers: {'Content-Type' : 'application/json'}, body : JSON.stringify({"country": country})}).then(res =>  res.json()),
        refetchInterval : 50000,
        keepPreviousData: true ,
        staleTime : 30000,
   });
   
   return {cities , isSuccessCities};
 };