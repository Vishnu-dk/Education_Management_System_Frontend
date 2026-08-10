import { useState } from "react";
import { Button, Input, Stack, Heading, Text, Box } from "@chakra-ui/react";

import { useStudentRegisterMutation } from "../../store/api/authApi";

export default function StudentRegisterForm({ setMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [rollNo, setRollNo] = useState("");

  const [registerStudent, { isLoading }] = useStudentRegisterMutation();

  const handleSubmit = async () => {
    try {
      await registerStudent({
        email,
        password,
        name,

        age: Number(age),

        course,

        admissionNo,

        rollNo,
      }).unwrap();

      alert("Student Registered Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack gap="4">
      <Box textAlign="center" mb="2">
        <Heading size="2xl" color="#0F172A" mb="2">
          Student Registration
        </Heading>

        <Text color="#64748B" fontSize="14px">
          Create your student account
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

      <Input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        size="lg"
        borderRadius="10px"
      />

      <Input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        size="lg"
        borderRadius="10px"
      />

      <select
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        style={{
          height: "48px",
          borderRadius: "10px",
          border: "1px solid #E2E8F0",
          padding: "0 12px",
        }}
      >
        <option value="">Select Course</option>

        <option value="COMPUTER_SCIENCE">COMPUTER_SCIENCE</option>

        <option value="MECHANICAL">MECHANICAL</option>

        <option value="CIVIL">CIVIL</option>
      </select>

      <Input
        placeholder="Admission Number"
        value={admissionNo}
        onChange={(e) => setAdmissionNo(e.target.value)}
        size="lg"
        borderRadius="10px"
      />

      <Input
        placeholder="Roll Number"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
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
        Register Student →
      </Button>
      <Text textAlign="center" color="#64748B">
        Already have an account?{" "}
        <Text
          as="span"
          color="#2563EB"
          fontWeight="600"
          cursor="pointer"
          onClick={() => setMode("LOGIN")}
        >
          Login
        </Text>
      </Text>
    </Stack>
  );
}
