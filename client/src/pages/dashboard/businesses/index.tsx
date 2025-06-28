
import PageContainer from '../../../components/dashboard/PageContainer';
import BusinessesPageContent from './BusinessesPageContent';

 const Businesses = () => {
   return (
      <PageContainer pageContent={BusinessesPageContent()} />
   );
 }
 
 export default Businesses;