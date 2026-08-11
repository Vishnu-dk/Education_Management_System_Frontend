import {
  Menu,
  Avatar,
  IconButton,
  Badge,
  Flex,
  Box,
  Text,
  Spinner,
} from "@chakra-ui/react";

import {
  MdPerson,
  MdLogout,
  MdKeyboardArrowDown,
} from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import {
  useGetProfileQuery
} from "../../store/api/studentApi";
import { useGetLibrarianProfileQuery } from "../../store/api/librarianApi";

export default function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const roleColor = role === "STUDENT" ? "blue" : "purple";
  const isStudent = role === "STUDENT";
  const isLibrarian = role === "LIBRARIAN";

  const studentQuery = useGetProfileQuery(userId, {
    skip: !userId || !isStudent,
  });

  const librarianQuery = useGetLibrarianProfileQuery(userId, {
    skip: !userId || !isLibrarian,
  });

  const {
    data: profile,
    isLoading,
    error,
  } = isStudent ? studentQuery : librarianQuery;

  if (isLoading) {
    return (
      <Flex
        h="70px"
        bg="white"
        borderBottom="1px solid #E2E8F0"
        px="6"
        justify="center"
        align="center"
      >
        <Spinner size="md" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        h="70px"
        bg="white"
        borderBottom="1px solid #E2E8F0"
        px="6"
        justify="center"
        align="center"
      >
        <Text color="red.500">Error loading profile</Text>
      </Flex>
    );
  }

  const name = profile?.name || role || "User";
  const email = profile?.email || "";

  return (
    <Flex
      h="70px"
      bg="white"
      borderBottom="1px solid"
      borderColor="#E2E8F0"
      px="6"
      justify="space-between"
      align="center"
      position="sticky"
      top="0"
      zIndex="100"
    >
      {/* LEFT */}
      <Box>
        <Text fontSize="18px" fontWeight="700" color="#0F172A">
          Education Management System
        </Text>

        <Text fontSize="12px" color="#94A3B8">
          Student & Library Portal
        </Text>
      </Box>

      {/* RIGHT */}
      <Flex align="center" gap="4">


        <Badge colorPalette={roleColor} px="3" py="1" borderRadius="20px">
          {role}
        </Badge>

        <Flex align="center" gap="2">
          <Box>
            <Text fontSize="13px" fontWeight="600" color="#0F172A">
              {name}
            </Text>

            <Text fontSize="11px" color="#94A3B8">
              {email}
            </Text>
          </Box>

          <Menu.Root>
            <Menu.Trigger asChild>
              <Flex
                align="center"
                gap="2"
                cursor="pointer"
                p="2"
                borderRadius="8px"
                _hover={{
                  bg: "#F1F5F9",
                }}
              >
                <Avatar.Root size="sm">
                  <Avatar.Fallback name={name} />
                </Avatar.Root>

                <MdKeyboardArrowDown size={18} />
              </Flex>
            </Menu.Trigger>

            <Menu.Positioner>
              <Menu.Content
                bg="white"
                border="1px solid #E2E8F0"
                borderRadius="12px"
                minW="180px"
                boxShadow="lg"
              >
                <Menu.Item
                  value="profile"
                  onClick={() => {
                    if (role === "STUDENT") {
                      navigate("/student/profile");
                    } else {
                      navigate("/admin/profile");
                    }
                  }}
                >
                  <Flex align="center" gap="2">
                    <MdPerson />
                    <Text>Profile</Text>
                  </Flex>
                </Menu.Item>

                <Menu.Item value="logout" onClick={logout}>
                  <Flex align="center" gap="2" color="red.500">
                    <MdLogout />
                    <Text>Logout</Text>
                  </Flex>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </Flex>
      </Flex>
    </Flex>
  );
}
