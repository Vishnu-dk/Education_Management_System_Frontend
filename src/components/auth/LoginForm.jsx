import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  NativeSelectRoot,
  NativeSelectField,
  Text,
} from "@chakra-ui/react";
import {
  useAdminLoginMutation,
  useStudentLoginMutation,
} from "../../store/api/authApi";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const navigate = useNavigate();

  const [studentLogin, { isLoading: studentLoading }, studentError] =
    useStudentLoginMutation();

  const [adminLogin, { isLoading: adminLoading }, adminError] =
    useAdminLoginMutation();

  const errorMessage =
    studentError?.data?.message ||
    adminError?.data?.message ||
    studentError?.error ||
    adminError?.error ||
    null;

  const handleLogin = async () => {
    try {
      const response =
        role === "ADMIN"
          ? await adminLogin({
              email,
              password,
            }).unwrap()
          : await studentLogin({
              email,
              password,
            }).unwrap();

      localStorage.setItem("token", response.token);

      localStorage.setItem("role", response.role);

      localStorage.setItem("userId", response.userId);

      if (response.role === "STUDENT") {
        navigate("/student/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack gap="4">
      <Box textAlign="center" mb="2">
        <Heading size="2xl" color="#0F172A" mb="2">
          Sign In
        </Heading>

        <Text color="#64748B" fontSize="14px">
          Welcome back! Sign in to continue.
        </Text>
      </Box>

      <Input
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        size="lg"
        borderRadius="10px"
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        size="lg"
        borderRadius="10px"
      />

      <NativeSelectRoot>
        <NativeSelectField
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="STUDENT">Student</option>

          <option value="ADMIN">Admin</option>
        </NativeSelectField>
      </NativeSelectRoot>

      {errorMessage && (
        <Box
          bg="red.50"
          border="1px solid"
          borderColor="red.200"
          p="3"
          borderRadius="8px"
        >
          <Text color="red.500">{errorMessage}</Text>
        </Box>
      )}

      <Button
        h="45px"
        bg="#2563EB"
        color="white"
        borderRadius="10px"
        _hover={{
          bg: "#1D4ED8",
        }}
        loading={adminLoading || studentLoading}
        onClick={handleLogin}
      >
        Sign In →
      </Button>

      <Text textAlign="center" color="#64748B">
        Don't have an account?{" "}
        <Text
          as="span"
          color="#2563EB"
          fontWeight="600"
          cursor="pointer"
          onClick={() => setMode("REGISTER")}
        >
          Register
        </Text>
      </Text>
    </Stack>
  );
}
