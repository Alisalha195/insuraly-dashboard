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
import AddRetirement from './pages/dashboard/retirements/add';
import AddRetirementsExtending from './pages/dashboard/retirements/add/extends';
import EditRetirement from './pages/dashboard/retirements/edit';
import SearchRetirement from './pages/dashboard/retirements/search';
import RetirementProfile from './pages/dashboard/retirements/profile';
import AdminProfile from './pages/dashboard/admin/profile';
import SearchUserLogs from './pages/dashboard/admin/profile/logs/search';
import UserPage from './pages/user';
import ProtectedUserRoute from './components/dashboard/ProtectedUserRoute';



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
                     <Route path='/dashboard' element={<ProtectedRoute requiredRole="admin"><Dashboard /></ProtectedRoute>} />

                     {/* Business Routes */}
                     <Route path='/dashboard/businesses' element={<ProtectedRoute requiredRole="admin"><Businesses /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/search' element={<ProtectedRoute requiredRole="admin"><SearchBusiness /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/add' element={<ProtectedRoute requiredRole="admin"><AddBusiness /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/:id/edit' element={<ProtectedRoute requiredRole="admin"><EditBusiness /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/:id' element={<ProtectedRoute requiredRole="admin"><BusinessProfile /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/:id/budget' element={<ProtectedRoute requiredRole="admin"><BusinessBudget /></ProtectedRoute>} />  
                     
                     <Route path='/dashboard/businesses/:id/employees' element={<ProtectedRoute requiredRole="admin"><BusinessEmployees /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/:id/employees/add' element={<ProtectedRoute requiredRole="admin"><AddEmployee /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/:id/employees/create' element={<ProtectedRoute requiredRole="admin"><CreateEmployee /></ProtectedRoute>} />  
                     <Route path='/dashboard/businesses/:id/employees/search' element={<ProtectedRoute requiredRole="admin"><SearchEmployees /></ProtectedRoute>} />
                     
                     {/* <Route path='/dashboard/employees/:id' element={<ProtectedRoute requiredRole="admin"><EmployeeProfile /></ProtectedRoute>} /> */}
                     
                     {/* Services Routes */}
                     <Route path='/dashboard/businesses/:id/employees/:empId/services/add' element={<ProtectedRoute requiredRole="admin"><AddServiceAtBusiness /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/:id/employees/:empId/services/:serviceId/edit' element={<ProtectedRoute requiredRole="admin"><EditServiceAtBusiness /></ProtectedRoute>} />
                     <Route path='/dashboard/businesses/:id/employees/:empId/services/:serviceId/wages' element={<ProtectedRoute requiredRole="admin"><ServiceWages /></ProtectedRoute>} />
                     
                     {/* Business Owners Routes */}
                     <Route path='/dashboard/business-owners' element={<ProtectedRoute requiredRole="admin"><BusinessOwners /></ProtectedRoute>} />
                     <Route path='/dashboard/business-owners/search' element={<ProtectedRoute requiredRole="admin"><SearchBusinessOwner /></ProtectedRoute>} />
                     {/* <Route path='/dashboard/business-owners/:id' element={<ProtectedRoute requiredRole="admin"><BusinessOwnerProfile /></ProtectedRoute>} /> */}
                     <Route path='/dashboard/business-owners/add' element={<ProtectedRoute requiredRole="admin"><AddBusinessOwner /></ProtectedRoute>} />
                     {/* <Route path='/dashboard/business-owners/edit' element={<EditBusinessOwner />} /> */}

                     {/* claims Routes */}
                     <Route path='/dashboard/claims' element={<ProtectedRoute requiredRole="admin"><Claims /></ProtectedRoute>} />
                     <Route path='/dashboard/claims/monthly/:year/:month' element={<ProtectedRoute requiredRole="admin"><MonthlyClaims /></ProtectedRoute>} />
                     <Route path='/dashboard/claims/annual/:year' element={<ProtectedRoute requiredRole="admin"><AnnualClaims /></ProtectedRoute>} />
                     <Route path='/dashboard/claims/retarded' element={<ProtectedRoute requiredRole="admin"><RetardedClaims /></ProtectedRoute>} />
                     <Route path='/dashboard/claims/monthly/search' element={<ProtectedRoute requiredRole="admin"><SearchMonthlyClaims /></ProtectedRoute>} />
                     <Route path='/dashboard/claims/retarded/search' element={<ProtectedRoute requiredRole="admin"><SearchRetardedClaims /></ProtectedRoute>} />
                     
                     
                     {/* Retirements Routes */}
                     <Route path='/dashboard/retirements' element={<ProtectedRoute requiredRole="admin"><Retirements /></ProtectedRoute>} />
                     <Route path='/dashboard/retirements/new' element={<ProtectedRoute requiredRole="admin"><AddRetirement /></ProtectedRoute>} />
                     <Route path='/dashboard/retirements/:id/edit' element={<ProtectedRoute requiredRole="admin"><EditRetirement /></ProtectedRoute>} />
                     <Route path='/dashboard/retirements/:id' element={<ProtectedRoute requiredRole="admin"><RetirementProfile /></ProtectedRoute>} />
                     <Route path='/dashboard/retirements/new/extending' element={<ProtectedRoute requiredRole="admin"><AddRetirementsExtending /></ProtectedRoute>} />
                     <Route path='/dashboard/retirements/annual/:type/:year' element={<ProtectedRoute requiredRole="admin"><AnnualRetirements /></ProtectedRoute>} />
                     <Route path='/dashboard/retirements/monthly/:type/:year/:month' element={<ProtectedRoute requiredRole="admin"><MonthlyRetirements /></ProtectedRoute>} />
                     <Route path='/dashboard/retirements/search' element={<ProtectedRoute requiredRole="admin"><SearchRetirement /></ProtectedRoute>} />
                     
                     
                     {/* profile */}
                     <Route path='/profile/:personId' element={<ProtectedRoute requiredRole="admin"><Profile /></ProtectedRoute>} />
                     
                     <Route path='/profile/:personId/edit' element={<ProtectedRoute requiredRole="admin"><EditProfile /></ProtectedRoute>} />
                     
                     
                     {/* Admin profile */}
                     <Route path='/admin/:adminId' element={<ProtectedRoute requiredRole="admin"><AdminProfile /></ProtectedRoute>} />
                     <Route path='/admin/logs/search' element={<ProtectedRoute requiredRole="admin"><SearchUserLogs /></ProtectedRoute>} />
                     
                  </Route>
                  
                  <Route path='/' element={<PageContainer />} >
                     <Route path='/user' element={<ProtectedUserRoute ><UserPage /></ProtectedUserRoute>} />
                  </Route>
                  
                  
                  {/* Auth Routes */}
                   <Route path='/auth/login' element={<ProtectedAuthRoute><Login /></ProtectedAuthRoute> } /> 
                  <Route path='/auth/signup' element={<ProtectedAuthRoute><Signup /></ProtectedAuthRoute>} />
                  
                  <Route path='/admin/login' element={<ProtectedAuthRoute><Login /></ProtectedAuthRoute> } />
                  
               </Routes>
            </AuthContextProvider>

            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
         </QueryClientProvider>
      </>
   )
}

export default App
