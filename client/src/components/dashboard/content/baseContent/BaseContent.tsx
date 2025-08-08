import { Flex, Stack } from "@chakra-ui/react";
import InfoCards from "./infoCards/InfoCards";
import Header from "../../header/Header";
// import DashboardCharts from './charts/DashboardCharts'

const BaseContent = () => {
  return (
    <Stack className="[flex-grow:1] ">
      <Flex direction="column">
        <Header />
        <InfoCards />
        {/* <DashboardCharts /> */}
      </Flex>
    </Stack>
  );
};

export default BaseContent;
