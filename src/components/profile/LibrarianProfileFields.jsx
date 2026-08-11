import { Avatar, Box, Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import InfoCard from "../common/InfoCard";
import { useGetLibrarianProfileQuery } from "../../store/api/librarianApi";

export default function LibrarianProfileFields() {
  const userId = localStorage.getItem("userId");
  const { data: user, isLoading, error } = useGetLibrarianProfileQuery(userId);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="400px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return <Text color="red.500">Error loading dashboard</Text>;
  }
  return (
    <Box>
      <Flex
        p="8"
        gap="5"
        alig="center"
        bg="F8FAFC"
        borderottom="1px solid #E2E8F0"
      >
        <Avatar.Root sie="2xl">
          <Avatar.Fallback name={user.name} />
        </Avatar.Root>

        <Box>
          <Text fontSize="24px" fontWeight="700">
            {user.name}
          </Text>

          <Text color="#64748B">Education Management System</Text>
        </Box>
      </Flex>
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
        }}
        gap="4"
      >
        <InfoCard label="Name" value={user.name} />

        <InfoCard label="Email" value={user.email} />
        <InfoCard label="Phone Number" value={user.phoneNo} />
        <InfoCard label="Date Of Joining" value={String(user.dateOfJoin)} />
      </SimpleGrid>
    </Box>
  );
}
