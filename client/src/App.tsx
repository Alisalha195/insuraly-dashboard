import './App.css';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { Toaster } from 'react-hot-toast'; 
import { Routes, Route, useNavigate, redirect, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Businesses from './pages/dashboard/businesses';
import BusinessOwners from './pages/dashboard/businessOwners';
import Claims from './pages/dashboard/claims';
import Retirements from './pages/dashboard/retirements';

import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AddBusinessOwner from './pages/dashboard/businessOwners/add';
import EditBusinessOwner from './pages/dashboard/businessOwners/edit';
import AddBusiness from './pages/dashboard/businesses/add';
// import BusinessOwnerProfile from './pages/dashboard/businessOwners/profile';
import BusinessProfile from './pages/dashboard/businesses/profile';

import BusinessBudget from './pages/dashboard/businesses/budget';
import PageContainer from './components/dashboard/PageContainer';
import BusinessEmployees from './pages/dashboard/businesses/employess';
import SearchBusinessOwner from './pages/dashboard/businessOwners/search';

import { useEffect, useState } from 'react';
import { useAuthStore } from './store/useAuthStore';
import ProtectedAuthRoute from './components/dashboard/ProtectedAuthRoute';
import ProtectedRoute from './components/dashboard/ProtectedRoute';
import AuthContextProvider from './providers/AuthContextProvider';
import SearchBusiness from './pages/dashboard/businesses/search';
import EditBusiness from './pages/dashboard/businesses/edit';
import AddEmployee from './pages/dashboard/businesses/employess/add';
import CreateEmployee from './pages/dashboard/businesses/employess/create';
import SearchEmployees from './pages/dashboard/businesses/employess/search';
// import EmployeeProfile from './pages/dashboard/businesses/employess/profile';
import AddServiceAtBusiness from './pages/dashboard/businesses/employess/services/add';
import EditServiceAtBusiness from './pages/dashboard/businesses/employess/services/edit';
import ServiceWages from './pages/dashboard/businesses/employess/services/wages';
import Profile from './pages/profile';
import EditProfile from './pages/profile/edit';
import MonthlyClaims from './pages/dashboard/claims/monthly';
import AnnualClaims from './pages/dashboard/claims/annual';
import RetardedClaims from './pages/dashboard/claims/retarded';
import SearchMonthlyClaims from './pages/dashboard/claims/monthly/search';
import SearchRetardedClaims from './pages/dashboard/claims/retarded/search';
import AnnualRetirements from './pages/dashboard/retirements/annual';
import MonthlyRetirements from './pages/dashboard/retirements/monthly';



function App() {
   
   const queryClient = new QueryClient();

   return (
      <>
         <Toaster />
         <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
               <Routes>
                  <Route path='/' element={<PageContainer />} >
                     <Route path='/' element={<Navigate to="/dashboard" replace={true} />} />
                     <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                     {/* Business Routes */}
                     <Route path='/dashboard/businesses' element={<ProtectedRoute><Businesses /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/search' element={<ProtectedRoute><SearchBusiness /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/add' element={<ProtectedRoute><AddBusiness /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/edit' element={<ProtectedRoute><EditBusiness /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/:id' element={<ProtectedRoute><BusinessProfile /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/:id/budget' element={<ProtectedRoute><BusinessBudget /></ProtectedRoute>} />  
                     
                     <Route path='/dashboard/businesses/:id/employees' element={<ProtectedRoute><BusinessEmployees /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/:id/employees/add' element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/:id/employees/create' element={<ProtectedRoute><CreateEmployee /></ProtectedRoute>} />  
                     <Route path='/dashboard/businesses/:id/employees/search' element={<ProtectedRoute><SearchEmployees /></ProtectedRoute>} />
                     
                     {/* <Route path='/dashboard/employees/:id' element={<ProtectedRoute><EmployeeProfile /></ProtectedRoute>} /> */}
                     
                     {/* Services Routes */}
                     <Route path='/dashboard/businesses/:id/employees/:empId/services/add' element={<ProtectedRoute><AddServiceAtBusiness /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/:id/employees/:empId/services/:serviceId/edit' element={<ProtectedRoute><EditServiceAtBusiness /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/:id/employees/:empId/services/:serviceId/wages' element={<ProtectedRoute><ServiceWages /></ProtectedRoute>} />
                     
                     {/* Business Owners Routes */}
                     <Route path='/dashboard/business-owners' element={<ProtectedRoute><BusinessOwners /></ProtectedRoute>} />
                     <Route path='/dashboard/business-owners/search' element={<ProtectedRoute><SearchBusinessOwner /></ProtectedRoute>} />
                     {/* <Route path='/dashboard/business-owners/:id' element={<ProtectedRoute><BusinessOwnerProfile /></ProtectedRoute>} /> */}
                     <Route path='/dashboard/business-owners/add' element={<ProtectedRoute><AddBusinessOwner /></ProtectedRoute>} />
                     {/* <Route path='/dashboard/business-owners/edit' element={<EditBusinessOwner />} /> */}

                     {/* claims Routes */}
                     <Route path='/dashboard/claims' element={<ProtectedRoute><Claims /></ProtectedRoute>} />
                     <Route path='/dashboard/claims/monthly/:year/:month' element={<ProtectedRoute><MonthlyClaims /></ProtectedRoute>} />
                     <Route path='/dashboard/claims/annual/:year' element={<ProtectedRoute><AnnualClaims /></ProtectedRoute>} />
                     <Route path='/dashboard/claims/retarded' element={<ProtectedRoute><RetardedClaims /></ProtectedRoute>} />
                     <Route path='/dashboard/claims/monthly/search' element={<ProtectedRoute><SearchMonthlyClaims /></ProtectedRoute>} />
                     <Route path='/dashboard/claims/retarded/search' element={<ProtectedRoute><SearchRetardedClaims /></ProtectedRoute>} />
                     
                     
                     {/* Retirements Routes */}
                     <Route path='/dashboard/retirements' element={<ProtectedRoute><Retirements /></ProtectedRoute>} />
                     <Route path='/dashboard/retirements/annual/:type/:year' element={<ProtectedRoute><AnnualRetirements /></ProtectedRoute>} />
                     <Route path='/dashboard/retirements/monthly/:type/:year/:month' element={<ProtectedRoute><MonthlyRetirements /></ProtectedRoute>} />
                     
                     
                     {/* profile */}
                     <Route path='/profile/:personId' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                     
                     <Route path='/profile/:personId/edit' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
                  </Route>
                  
                  {/* Auth Routes */}
                  <Route path='/auth/login' element={<ProtectedAuthRoute><Login /></ProtectedAuthRoute> } />
                  <Route path='/auth/signup' element={<ProtectedAuthRoute><Signup /></ProtectedAuthRoute>} />
                  
                  
               </Routes>
            </AuthContextProvider>

            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
         </QueryClientProvider>
      </>
   )
}

export default App
