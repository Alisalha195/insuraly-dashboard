import { useContext } from "react";
import InfoCards from "../../components/dashboard/content/baseContent/infoCards/InfoCards";
import { useAuthStore } from "../../store/useAuthStore";
import { authContext } from "../../providers/AuthContextProvider";


const DashboardContent = () => {
   // const loggedUser = useAuthStore((state) => state.user);
   // const {authState, setAuthState} = useContext(authContext);
   return (
      <>
      <InfoCards />
      {/* {authState?.user?.email ? <div>{authState.user.email}</div> : <div>No user logged in</div>} */}
      </>
   );
} 
export default DashboardContent;