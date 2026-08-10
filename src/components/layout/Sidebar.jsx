import {
  Box,
  Flex,
  Text,
  VStack,
  Separator,
  Avatar,
  Menu,
  Spinner,
} from "@chakra-ui/react";

import { useNavigate, useLocation } from "react-router-dom";

import {
  MdDashboard,
  MdMenuBook,
  MdAssignment,
  MdOutlineBookmarks,
  MdPerson,
  MdLogout,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { logout } from "../../utils/auth";
import { useGetProfileQuery } from "../../store/api/studentApi";
import { useGetLibrarianProfileQuery } from "../../store/api/librarianApi";

export default function Sidebar() {
  const navigate = useNavigate();

  const location = useLocation();

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

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

  const menuItems =
    role === "STUDENT"
      ? [
          {
            label: "Dashboard",
            icon: <MdDashboard />,
            path: "/student/dashboard",
          },

          {
            label: "Books",
            icon: <MdMenuBook />,
            path: "/student/books",
          },

          {
            label: "My Books",
            icon: <MdOutlineBookmarks />,
            path: "/student/my-books",
          },
        ]
      : [
          {
            label: "Dashboard",
            icon: <MdDashboard />,
            path: "/admin/dashboard",
          },

          {
            label: "Books",
            icon: <MdMenuBook />,
            path: "/admin/books",
          },

          {
            label: "Requests",
            icon: <MdAssignment />,
            path: "/admin/requests",
          },

          {
            label: "Issues",
            icon: <MdOutlineBookmarks />,
            path: "/admin/issue",
          },
        ];

  return (
    <Box
      w="250px"
      minH="100vh"
      bg="#0F172A"
      color="white"
      display="flex"
      flexDirection="column"
    >
      {/* LOGO */}

      <Flex
        align="center"
        gap="3"
        px="5"
        py="5"
        borderBottom="1px solid rgba(255,255,255,0.08)"
      >
        <Flex
          w="38px"
          h="38px"
          borderRadius="10px"
          bg="#2563EB"
          justify="center"
          align="center"
        >
          📚
        </Flex>

        <Box>
          <Text fontWeight="700" fontSize="14px">
            EduManage
          </Text>

          <Text fontSize="11px" color="rgba(255,255,255,0.5)">
            Education Platform
          </Text>
        </Box>
      </Flex>

      {/* MENU */}

      <VStack align="stretch" gap="1" px="3" py="4" flex="1">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Flex
              key={item.path}

              align="center"

              gap="3"

              px="3"

              py="3"

              borderRadius="8px"

              cursor="pointer"

              bg={active ? "rgba(37,99,235,0.25)" : "transparent"}

              color={active ? "white" : "rgba(255,255,255,0.7)"}

              _hover={{
                bg: "rgba(255,255,255,0.07)",
              }}

              onClick={() => navigate(item.path)}
            >
              {item.icon}

              <Text fontSize="14px">{item.label}</Text>
            </Flex>
          );
        })}
      </VStack>

      <Separator
        borderColor="
                rgba(255,255,255,0.08)
                "
      />

      {/* PROFILE */}

      <Box p="4">
        <Menu.Root>
          <Menu.Trigger asChild>
            <Flex
              align="center"
              gap="3"
              cursor="pointer"
              p="2"
              borderRadius="8px"
              _hover={{
                bg: "rgba(255,255,255,0.07)",
              }}
            >
              <Avatar.Root size="sm">
                <Avatar.Fallback name={profile.name} />
              </Avatar.Root>

              <Box flex="1">
                <Text fontSize="13px" fontWeight="600">
                  {profile.name}
                </Text>

                <Text
                  fontSize="11px"
                  color="
                                    rgba(
                                        255,
                                        255,
                                        255,
                                        0.5
                                    )"
                >
                  Logged In
                </Text>
              </Box>

              <MdKeyboardArrowDown />
            </Flex>
          </Menu.Trigger>

          <Menu.Positioner>
            <Menu.Content>
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
      </Box>
    </Box>
  );
}
