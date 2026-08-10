import { Box, Flex, Text, Button, HStack } from "@chakra-ui/react";

export default function AuthLayout({
  children,
  mode,
  setMode,
  registerType,
  setRegisterType,
}) {
  return (
    <Flex minH="100vh" bg="#0F172A">
      {/* LEFT PANEL */}

      <Box
        flex="0 0 480px"
        display={{ base: "none", lg: "flex" }}
        flexDir="column"
        justifyContent="center"
        p="60px 56px"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          inset={0}
          backgroundImage="
                    radial-gradient(circle at 25% 75%, rgba(37,99,235,0.18) 0%, transparent 55%),
                    radial-gradient(circle at 80% 20%, rgba(20,184,166,0.14) 0%, transparent 50%)"
        />

        <Box position="relative">
          <Flex align="center" gap={3} mb={12}>
            <Flex
              w="44px"
              h="44px"
              borderRadius="10px"
              bg="#2563EB"
              align="center"
              justify="center"
              fontSize="20px"
            >
              📗
            </Flex>

            <Box>
              <Text fontWeight="700" fontSize="18px" color="white">
                EduManage
              </Text>
            </Box>
          </Flex>

          <Text
            fontSize="34px"
            fontWeight="800"
            color="white"
            lineHeight="1.2"
            mb="4"
          >
            Empowering
            <br />
            Education Through
            <br />
            Technology.
          </Text>

          <Text
            color="rgba(255,255,255,0.6)"
            lineHeight="1.8"
            fontSize="14px"
            mb="10"
          >
            Streamline student management, academic operations, library
            services, and administration through one centralized education
            platform.
          </Text>

          <Flex direction="column" gap="4">
            <Text color="rgba(255,255,255,0.7)">
              Student Information Management
            </Text>

            <Text color="rgba(255,255,255,0.7)">
              Integrated Library Management
            </Text>

            <Text color="rgba(255,255,255,0.7)">
              Academic & Administrative Workflows
            </Text>

            <Text color="rgba(255,255,255,0.7)">
              Real-Time Reports & Insights
            </Text>
          </Flex>

          <Box
            mt="12"
            p="4"
            borderRadius="12px"
            bg="rgba(255,255,255,0.04)"
            border="1px solid rgba(255,255,255,0.07)"
          >
            <Text fontSize="12px" color="rgba(255,255,255,0.35)" mb="2">
              Trusted by
            </Text>

            <Flex gap="6">
              <Text
                fontSize="13px"
                fontWeight="600"
                color="rgba(255,255,255,0.8)"
              >
                12,400+ Students
              </Text>

              <Text
                fontSize="13px"
                fontWeight="600"
                color="rgba(255,255,255,0.8)"
              >
                250+ Faculty Members
              </Text>
              <Text
                fontSize="13px"
                fontWeight="600"
                color="rgba(255,255,255,0.8)"
              >
                15+ Departments
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>

      {/* RIGHT PANEL */}

      <Flex
        flex="1"
        bg="#F8FAFC"
        justify="center"
        align="center"
        p="8"
        borderRadius={{
          lg: "20px 0 0 20px",
        }}
      >
        <Box
          w="100%"
          maxW="500px"
          bg="white"
          p="8"
          borderRadius="16px"
          boxShadow="lg"
        >
          {mode === "REGISTER" && (
            <HStack mb="6" bg="#F1F5F9" p="1" borderRadius="10px">
              <Button
                flex="1"
                bg={registerType === "STUDENT" ? "white" : "transparent"}
                color={mode === "REGISTER" ? "#0F172A" : "#64748B"}
                fontWeight={mode === "REGISTER" ? "600" : "400"}
                onClick={() => setRegisterType("STUDENT")}
              >
                Student
              </Button>

              <Button
                flex="1"
                bg={registerType === "ADMIN" ? "white" : "transparent"}
                color={mode === "REGISTER" ? "#0F172A" : "#64748B"}
                fontWeight={mode === "REGISTER" ? "600" : "400"}
                onClick={() => setRegisterType("ADMIN")}
              >
                Admin
              </Button>
            </HStack>
          )}

          {/* FORM */}

          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
