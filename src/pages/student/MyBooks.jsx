import AppLayout from "../../components/layout/AppLayout";
import { useGetMyBooksQuery } from "../../store/api/studentApi";

import { Box, Text, Flex, Spinner, SimpleGrid, Badge } from "@chakra-ui/react";

export default function MyBooks() {
  const { data: books, isLoading, error } = useGetMyBooksQuery();

  if (isLoading) {
    return (
      <AppLayout>
        <Flex justify="center" align="center" h="400px">
          <Spinner size="xl" />
        </Flex>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <Box textAlign="center">
          <Text color="red.500">Error loading books</Text>
        </Box>
      </AppLayout>
    );
  }

  const issuedCount =
    books?.filter((book) => book.status === "ISSUED").length || 0;

  const returnedCount =
    books?.filter((book) => book.status === "RETURNED").length || 0;

  const pendingCount =
    books?.filter((book) => book.status === "REQUESTED").length || 0;

  return (
    <AppLayout>
      {/* HEADER */}

      <Box mb="6">
        <Text fontSize="32px" fontWeight="700" color="#0F172A">
          My Books
        </Text>

        <Text color="#64748B" mt="2">
          Track your issued books and request history
        </Text>
      </Box>

      {/* SUMMARY */}

      <SimpleGrid
        columns={{
          base: 1,
          md: 3,
        }}
        gap="4"
        mb="6"
      >
        <Box bg="white" p="5" border="1px solid #E2E8F0" borderRadius="12px">
          <Text fontSize="12px" color="#94A3B8" mb="2">
            Issued Books
          </Text>

          <Text fontSize="28px" fontWeight="700" color="#2563EB">
            {issuedCount}
          </Text>
        </Box>

        <Box bg="white" p="5" border="1px solid #E2E8F0" borderRadius="12px">
          <Text fontSize="12px" color="#94A3B8" mb="2">
            Returned Books
          </Text>

          <Text fontSize="28px" fontWeight="700" color="#22C55E">
            {returnedCount}
          </Text>
        </Box>

        <Box bg="white" p="5" border="1px solid #E2E8F0" borderRadius="12px">
          <Text fontSize="12px" color="#94A3B8" mb="2">
            Pending Requests
          </Text>

          <Text fontSize="28px" fontWeight="700" color="#EAB308">
            {pendingCount}
          </Text>
        </Box>
      </SimpleGrid>

      {/* BOOKS LIST */}

      <Box
        bg="white"
        border="1px solid #E2E8F0"
        borderRadius="12px"
        overflow="hidden"
      >
        <Box px="5" py="4" borderBottom="1px solid #E2E8F0">
          <Text fontWeight="600" color="#0F172A">
            Book History
          </Text>
        </Box>

        {books?.length === 0 ? (
          <Box textAlign="center" py="20">
            <Text fontSize="50px" mb="3">
              📚
            </Text>

            <Text fontWeight="600">No Books Found</Text>
          </Box>
        ) : (
          books?.map((book) => (
            <Flex
              key={book.issueId}
              justify="space-between"
              align="center"
              p="4"
              borderBottom="1px solid #F1F5F9"
            >
              <Box>
                <Text fontWeight="600" color="#0F172A">
                  {book.bookTitle}
                </Text>

                <Text fontSize="13px" color="#94A3B8">
                  Request: {book.requestDate}
                </Text>

                {book.issueDate && (
                  <Text fontSize="13px" color="#94A3B8">
                    Issued: {book.issueDate}
                  </Text>
                )}
              </Box>

              <Badge
                colorPalette={
                  book.status === "ISSUED"
                    ? "blue"
                    : book.status === "RETURNED"
                      ? "green"
                      : "yellow"
                }
              >
                {book.status}
              </Badge>
            </Flex>
          ))
        )}
      </Box>
    </AppLayout>
  );
}
