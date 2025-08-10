import { Box, Flex } from "@chakra-ui/react";
import useThemedColors from "../../../../hooks/useThemedColors";

const SidebarSearchActions = () => {
  const { btnGreen } = useThemedColors();
  return (
    <Box>
      <Flex justifyContent={"center"}>
        <Box
          className="btn"
          backgroundColor={btnGreen}
          paddingX={2}
          paddingBottom={1}
          borderRadius={6}
        >
          search
        </Box>
      </Flex>
    </Box>
  );
};

export default SidebarSearchActions;
