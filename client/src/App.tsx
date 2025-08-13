import './App.css';

import { Toaster } from 'react-hot-toast';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Businesses from './pages/dashboard/businesses';
import BusinessOwners from './pages/dashboard/businessOwners';
import Claims from './pages/dashboard/claims';
import Retirements from './pages/dashboard/retirements';

import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AddBusinessOwner from './pages/dashboard/businessOwners/add/AddBusinessOwner';
import EditBusinessOwner from './pages/dashboard/businessOwners/edit/EditBusinessOwner';
import AddBusiness from './pages/dashboard/businesses/add/AddBusiness';
import BusinessOwnerProfile from './pages/dashboard/businessOwners/profile';


function App() {
   const navigate = useNavigate();
   const queryClient = new QueryClient();

   return (
      <>
         <Toaster />
         <QueryClientProvider client={queryClient}>
            <Routes >
               <Route path='/' element={<Dashboard />} />
               <Route path='/dashboard' element={<Dashboard />} />

               <Route path='/dashboard/businesses' element={<Businesses />} />
               <Route path='/dashboard/businesses/add' element={<AddBusiness />} />

               <Route path='/dashboard/business-owners' element={<BusinessOwners />} />
               <Route path='/dashboard/business-owners/:id' element={<BusinessOwnerProfile />} />

               <Route path='/dashboard/business-owners/add' element={<AddBusinessOwner />} />
               <Route path='/dashboard/business-owners/edit' element={<EditBusinessOwner />} />

               <Route path='/dashboard/claims' element={<Claims />} />

               <Route path='/dashboard/retirements' element={<Retirements />} />
            </Routes>

            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
         </QueryClientProvider>
      </>
   )
}

export default App
