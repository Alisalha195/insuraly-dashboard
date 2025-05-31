
import { Stack } from "@chakra-ui/react";
import MainContent from "../../components/dashboard/content/MainContent";
import Footer from "../../components/dashboard/footer/Footer";

const Dashboard = () => {
  return (
   <Stack gap={0}  >
      <MainContent />
      <Footer />
   </Stack>
  )
}

export default Dashboard;