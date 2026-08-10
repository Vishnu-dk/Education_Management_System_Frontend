import AppLayout from "../../components/layout/AppLayout";

import { useGetMyBooksQuery, useGetStudentProfileQuery } from "../../store/api/studentApi";

import { Box, Text, Flex, SimpleGrid, Spinner, Badge } from "@chakra-ui/react";

export default function StudentDashboard() {
const userId = localStorage.getItem("userId"); 
  const { data: books, isLoading, error } = useGetMyBooksQuery();

  const{
    data:student,
    isLoading:studentLoading,
    error:studentError
  }=useGetStudentProfileQuery(userId);

  if (isLoading||studentLoading) {
    return (
      <AppLayout>
        <Flex justify="center" align="center" h="400px">
          <Spinner size="xl" />
        </Flex>
      </AppLayout>
    );
  }

  if (error || studentError) {
    return (
      <AppLayout>
        <Text color="red.500">Error loading dashboard</Text>
      </AppLayout>
    );
  }

  const issuedCount =
    books?.filter((book) => book.status === "ISSUED").length || 0;

  const pendingCount =
    books?.filter((book) => book.status === "REQUESTED").length || 0;

  const returnedCount =
    books?.filter((book) => book.status === "RETURNED").length || 0;

  const activeFine =
    books
      ?.filter((book) => book.fineAmount > 0 && !book.finePaid)
      .reduce((sum, book) => sum + book.fineAmount, 0) || 0;

  return (
    <AppLayout>
      {/* HEADER */}

      <Box mb="6">
        <Text fontSize="32px" fontWeight="700" color="#0F172A">
            Welcome {student?.name} ,
        </Text>

        <Text color="#64748B" mt="2">
          Overview of your books, requests and activities
        </Text>
      </Box>

      {/* KPI CARDS */}

      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          xl: 4,
        }}
        gap="4"
        mb="6"
      >
        <DashboardCard
          title="Books Issued"
          value={issuedCount}
          color="#2563EB"
        />

        <DashboardCard
          title="Pending Requests"
          value={pendingCount}
          color="#EAB308"
        />

        <DashboardCard
          title="Returned Books"
          value={returnedCount}
          color="#22C55E"
        />

        <DashboardCard
          title="Active Fines"
          value={`₹${activeFine}`}
          color="#EF4444"
        />
      </SimpleGrid>

      {/* CONTENT */}

      <Flex
        gap="5"
        direction={{
          base: "column",
          xl: "row",
        }}
      >
        {/* ISSUED BOOKS */}

        <Box
          flex="1"
          bg="white"
          border="1px solid #E2E8F0"
          borderRadius="12px"
          overflow="hidden"
        >
          <Box px="5" py="4" borderBottom="1px solid #E2E8F0">
            <Text fontWeight="600">Currently Issued Books</Text>
          </Box>

          {books
            ?.filter((book) => book.status === "ISSUED")
            ?.slice(0, 5)
            ?.map((book) => (
              <Flex
                key={book.issueId}
                justify="space-between"
                align="center"
                p="4"
                borderBottom="1px solid #F1F5F9"
              >
                <Box>
                  <Text fontWeight="600">{book.bookTitle}</Text>

                  <Text fontSize="12px" color="#94A3B8">
                    Requested: {book.requestDate}
                  </Text>
                </Box>

                <Badge colorPalette="blue">ISSUED</Badge>
              </Flex>
            ))}
        </Box>

        <Box
          w={{
            base: "100%",
            xl: "350px",
          }}
          bg="white"
          border="1px solid #E2E8F0"
          borderRadius="12px"
          overflow="hidden"
        >
          <Box px="5" py="4" borderBottom="1px solid #E2E8F0">
            <Text fontWeight="600">Recent Activity</Text>
          </Box>

          {books?.slice(0, 5)?.map((book) => (
            <Flex
              key={book.issueId}
              p="4"
              borderBottom="1px solid #F1F5F9"
              justify="space-between"
            >
              <Box>
                <Text fontSize="13px" fontWeight="600">
                  {book.bookTitle}
                </Text>

                <Text fontSize="12px" color="#94A3B8">
                  {book.status}
                </Text>
              </Box>

              <Text fontSize="11px" color="#94A3B8">
                {book.requestDate}
              </Text>
            </Flex>
          ))}
        </Box>
      </Flex>
    </AppLayout>
  );
}

function DashboardCard({ title, value, color }) {
  return (
    <Box bg="white" border="1px solid #E2E8F0" borderRadius="12px" p="5">
      <Text fontSize="12px" color="#94A3B8">
        {title}
      </Text>

      <Text mt="2" fontSize="28px" fontWeight="700" color={color}>
        {value}
      </Text>
    </Box>
  );
}
