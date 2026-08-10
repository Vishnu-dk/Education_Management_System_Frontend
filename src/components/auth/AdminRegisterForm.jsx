import React, { useState } from "react";

import { Button, Input, Stack, Heading, Text, Box } from "@chakra-ui/react";

import { useAdminRegisterMutation } from "../../store/api/authApi";

export default function AdminRegisterForm({ setMode }) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("LIBRARIAN");

  const [name, setName] = useState("");

  const [phoneNo, setPhoneNo] = useState("");

  const [dateOfJoin, setDateOfJoin] = useState("");

  const [registerAdmin, { isLoading }] = useAdminRegisterMutation();

  const handleSubmit = async () => {
    try {
      await registerAdmin({
        email,
        password,

        role,

        name,

        phoneNo,

        dateOfJoin,
      }).unwrap();

      alert("Admin Registered Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack gap="4">
      <Box textAlign="center" mb="2">
        <Heading size="2xl" color="#0F172A" mb="2">
          Admin Registration
        </Heading>

        <Text color="#64748B" fontSize="14px">
          Create your administrator account
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

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{
          height: "48px",
          borderRadius: "10px",
          border: "1px solid #E2E8F0",
          padding: "0 12px",
        }}
      >
        <option value="LIBRARIAN">LIBRARIAN</option>

        <option value="ACADEMIC_STAFF">ACADEMIC_STAFF</option>

        <option value="ADMINISTRATOR">ADMINISTRATOR</option>
      </select>

      <Input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        size="lg"
        borderRadius="10px"
      />

      <Input
        placeholder="Phone Number"
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
        size="lg"
        borderRadius="10px"
      />

      <Input
        type="date"
        value={dateOfJoin}
        onChange={(e) => setDateOfJoin(e.target.value)}
        size="lg"
        borderRadius="10px"
      />

      <Button
        h="48px"
        bg="#2563EB"
        color="white"
        borderRadius="10px"
        _hover={{
          bg: "#1D4ED8",
        }}
        loading={isLoading}
        onClick={handleSubmit}
      >
        Register Admin →
      </Button>
      <Text textAlign="center" color="#64748B">
        Already have an account?{" "}
        <Text
          as="span"
          color="#2563EB"
          fontWeight="600"
          cursor="pointer"
          onClick={() => {
            setMode("LOGIN");
            console.log("click");
          }}
        >
          Login
        </Text>
      </Text>
    </Stack>
  );
}
