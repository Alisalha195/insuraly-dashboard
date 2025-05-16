
import {Routes , Route} from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Businesses from './pages/dashboard/businesses';
import BusinessOwners from './pages/dashboard/businessOwners';
import Claims from './pages/dashboard/claims';
import Retirements from './pages/dashboard/retirements';

function App() {
  

  return (
    <>
       <Routes >
         <Route path='/dashboard' element={<Dashboard />} />
         <Route path='/dashboard/businesses' element={<Businesses />} />
         <Route path='/dashboard/business-owners' element={<BusinessOwners />} />
         <Route path='/dashboard/claims' element={<Claims />} />
         <Route path='/dashboard/retirements' element={<Retirements />} />
       </Routes>
    </>
  )
}

export default App
