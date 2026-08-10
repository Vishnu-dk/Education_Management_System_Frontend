import { Flex, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { logout } from "../../utils/auth";

const SIDEBAR_WIDTH = "260px"; // ⚠️ must match the width inside your Sidebar component

export default function AppLayout({ children }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Flex minH="100vh" bg="#F8FAFC">
      <Box
        position="fixed"
        top="0"
        left="0"
        h="100vh"
        w={SIDEBAR_WIDTH}
        zIndex="docked"
      >
        <Sidebar role={role} />
      </Box>

      <Flex flex="1" direction="column" minW="0" ml={SIDEBAR_WIDTH}>
        <Navbar role={role} onLogout={logout} />

        <Box flex="1" p="6" overflow="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
