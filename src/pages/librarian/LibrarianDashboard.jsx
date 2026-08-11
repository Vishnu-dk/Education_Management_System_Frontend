import { Box, Flex, Text, SimpleGrid, Spinner } from "@chakra-ui/react";

import {
  MdMenuBook,
  MdSchedule,
  MdOutlineBookmarks,
  MdAttachMoney,
  MdWarning,
  MdCheckCircle,
} from "react-icons/md";

import {
  useGetAllBooksQuery,
  useAllRequestQuery,
} from "../../store/api/librarianApi";

import AppLayout from "../../components/layout/AppLayout";
import PageHeader from "../../components/common/PageHeader";
import DataCard from "../../components/common/DataCard";
import StatusBadge from "../../components/common/StatusBadge";
import DashboardCharts from "../../components/dashboard/DashboardCharts";

function SectionCard({ title, children }) {
  return (
    <Box
      bg="white"
      border="1px solid #E2E8F0"
      borderRadius="12px"
      overflow="hidden"
    >
      <Box px="5" py="4" borderBottom="1px solid #E2E8F0">
        <Text fontWeight="600" color="#0F172A">
          {title}
        </Text>
      </Box>

      {children}
    </Box>
  );
}

export default function LibrarianDashboard() {
  const { data: books, isLoading: booksLoading } = useGetAllBooksQuery();

  const { data: requests, isLoading: requestsLoading } = useAllRequestQuery();

  if (booksLoading || requestsLoading) {
    return (
      <AppLayout>
        <Flex h="400px" justify="center" align="center">
          <Spinner size="xl" />
        </Flex>
      </AppLayout>
    );
  }

  const totalBooks = books?.length || 0;

  const availableBooks =
    books?.reduce((sum, book) => sum + book.availableCopies, 0) || 0;

  const activeIssues = requests?.filter((r) => r.active).length || 0;

  const pendingRequests =
    requests?.filter((r) => r.status === "REQUESTED").length || 0;

  const totalFine =
    requests?.reduce((sum, issue) => sum + (issue.fineAmount || 0), 0) || 0;

  const overdueCount =
    requests?.filter(
      (issue) =>
        issue.active && issue.dueDate && new Date(issue.dueDate) < new Date(),
    ).length || 0;

  const pendingList = requests
    ?.filter((r) => r.status === "REQUESTED")
    ?.slice(0, 5);

  const overdueList = requests
    ?.filter(
      (issue) =>
        issue.active && issue.dueDate && new Date(issue.dueDate) < new Date(),
    )
    ?.slice(0, 5);

  return (
    <AppLayout>
      <Box>
        <PageHeader
          title="Library Overview"
          subtitle="Monitor books, requests, issues and fines"
        />

        {/* KPI CARDS */}

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            xl: 3,
          }}
          gap="4"
          mb="6"
        >
          <DataCard
            label="Total Books"
            value={totalBooks}
            icon={<MdMenuBook />}
            color="#2563EB"
          />

          <DataCard
            label="Available Copies"
            value={availableBooks}
            icon={<MdCheckCircle />}
            color="#22C55E"
          />

          <DataCard
            label="Issued Books"
            value={activeIssues}
            icon={<MdOutlineBookmarks />}
            color="#14B8A6"
          />

          <DataCard
            label="Pending Requests"
            value={pendingRequests}
            icon={<MdSchedule />}
            color="#EAB308"
          />

          <DataCard
            label="Active Fines"
            value={`₹${totalFine}`}
            icon={<MdAttachMoney />}
            color="#EF4444"
          />

          <DataCard
            label="Overdue Books"
            value={overdueCount}
            icon={<MdWarning />}
            color="#F59E0B"
          />
        </SimpleGrid>

        {/* SECTIONS */}

        <SimpleGrid
          columns={{
            base: 1,
            xl: 2,
          }}
          gap="5"
        >
          {/* PENDING */}

          <SectionCard title="Pending Requests">
            {pendingList?.length ? (
              pendingList.map((request) => (
                <Flex
                  key={request.issueId}
                  p="4"
                  borderBottom="1px solid #F1F5F9"
                  justify="space-between"
                  align="center"
                >
                  <Box>
                    <Text fontWeight="600">{request.studentName}</Text>

                    <Text fontSize="12px" color="#94A3B8">
                      {request.bookTitle}
                    </Text>
                  </Box>

                  <StatusBadge status="REQUESTED" />
                </Flex>
              ))
            ) : (
              <Box p="6" textAlign="center">
                <Text color="#94A3B8">No pending requests</Text>
              </Box>
            )}
          </SectionCard>

          {/* OVERDUE */}

          <SectionCard title="Overdue Books">
            {overdueList?.length ? (
              overdueList.map((issue) => (
                <Flex
                  key={issue.issueId}
                  p="4"
                  borderBottom="1px solid #F1F5F9"
                  justify="space-between"
                  align="center"
                >
                  <Box>
                    <Text fontWeight="600">{issue.studentName}</Text>

                    <Text fontSize="12px" color="#94A3B8">
                      {issue.bookTitle}
                    </Text>
                  </Box>

                  <Box textAlign="right">
                    <Text color="#EF4444" fontWeight="600">
                      Overdue
                    </Text>

                    <Text fontSize="12px" color="#94A3B8">
                      ₹{issue.fineAmount}
                    </Text>
                  </Box>
                </Flex>
              ))
            ) : (
              <Box p="6" textAlign="center">
                <Text color="#94A3B8">No overdue books</Text>
              </Box>
            )}
          </SectionCard>
        </SimpleGrid>
        <DashboardCharts books={books} requests={requests} />
      </Box>
    </AppLayout>
  );
}
