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
import AddBusinessOwner from './pages/dashboard/businessOwners/add';
import EditBusinessOwner from './pages/dashboard/businessOwners/edit';
import AddBusiness from './pages/dashboard/businesses/add';
import BusinessOwnerProfile from './pages/dashboard/businessOwners/profile';
import BusinessProfile from './pages/dashboard/businesses/profile';

import BusinessBudget from './pages/dashboard/businesses/budget';
import PageContainer from './components/dashboard/PageContainer';
import BusinessEmployees from './pages/dashboard/businesses/employess';


function App() {
   const navigate = useNavigate();
   const queryClient = new QueryClient();
   
   return (
      <>
         <Toaster />
         <QueryClientProvider client={queryClient}>
            {/* <PageContainer> */}
            <Routes>
               <Route path='/' element={<PageContainer />}>
                  <Route index element={<Dashboard />} />
                  {/* <Route path='/' element={<Dashboard />} /> */}
                  <Route path='/dashboard' element={<Dashboard />} />

                  {/* Business Routes */}
                  <Route path='/dashboard/businesses' element={<Businesses />} />
                  <Route path='/dashboard/businesses/add' element={<AddBusiness />} />
                  <Route path='/dashboard/businesses/:id' element={<BusinessProfile />} />
                  <Route path='/dashboard/businesses/:id/budget' element={<BusinessBudget />} />
                  <Route path='/dashboard/businesses/:id/employees' element={<BusinessEmployees />} />
                  
                  {/* Business Owners Routes */}
                  <Route path='/dashboard/business-owners' element={<BusinessOwners />} />
                  <Route path='/dashboard/business-owners/:id' element={<BusinessOwnerProfile />} />
                  <Route path='/dashboard/business-owners/add' element={<AddBusinessOwner />} />
                  <Route path='/dashboard/business-owners/edit' element={<EditBusinessOwner />} />

                  {/* claims Routes */}
                  <Route path='/dashboard/claims' element={<Claims />} />
                  {/* Retirements Routes */}
                  <Route path='/dashboard/retirements' element={<Retirements />} />
                  </Route>
               </Routes>
            {/* </PageContainer> */}

            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
         </QueryClientProvider>
      </>
   )
}

export default App
