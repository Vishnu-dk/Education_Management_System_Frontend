import { useState } from "react";

import {
  Box,
  Flex,
  Text,
  Button,
  NativeSelectRoot,
  NativeSelectField,
} from "@chakra-ui/react";

import {
  MdOutlineBookmarks,
  MdWarning,
  MdCheckCircle,
  MdAttachMoney,
} from "react-icons/md";

import AppLayout from "../../components/layout/AppLayout";

import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import StatusBadge from "../../components/common/StatusBadge";
import DataCard from "../../components/common/DataCard";
import CustomTable from "../../components/common/CustomTable";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import {
  useAllRequestQuery,
  useReturnBookMutation,
  useMarkFinePaidMutation,
} from "../../store/api/librarianApi";

export default function IssueManagement() {
  const { data: issues, isLoading, error, refetch } = useAllRequestQuery();

  const [returnBook] = useReturnBookMutation();

  const [markFinePaid] = useMarkFinePaidMutation();

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("ALL");

  const [selectedAction, setSelectedAction] = useState(null);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error Loading Issues</h1>;
  }

  const activeIssues = issues?.filter((issue) => issue.active).length || 0;

  const returnedBooks = issues?.filter((issue) => !issue.active).length || 0;

  const overdueBooks =
    issues?.filter(
      (issue) =>
        issue.active && issue.dueDate && new Date(issue.dueDate) < new Date(),
    ).length || 0;

  const outstandingFine =
    issues
      ?.filter((issue) => issue.fineAmount > 0 && !issue.finePaid)
      .reduce((sum, issue) => sum + issue.fineAmount, 0) || 0;

  const filteredIssues = issues?.filter((issue) => {
    const matchesSearch =
      issue.studentName?.toLowerCase()?.includes(search.toLowerCase()) ||
      issue.bookTitle?.toLowerCase()?.includes(search.toLowerCase());

    let matchesFilter = true;

    if (filter === "ACTIVE") {
      matchesFilter = issue.active;
    }

    if (filter === "RETURNED") {
      matchesFilter = !issue.active;
    }

    if (filter === "OVERDUE") {
      matchesFilter =
        issue.active && issue.dueDate && new Date(issue.dueDate) < new Date();
    }

    return matchesSearch && matchesFilter;
  });

  const handleReturnBook = async (issueId) => {
    try {
      await returnBook(issueId).unwrap();

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinePaid = async (issueId) => {
    try {
      await markFinePaid(issueId).unwrap();

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      key: "studentName",
      header: "Student",
    },

    {
      key: "bookTitle",
      header: "Book",
    },

    {
      key: "dueDate",
      header: "Due Date",
    },

    {
      key: "fineAmount",
      header: "Fine",

      render: (issue) =>
        issue.fineAmount > 0 ? (
          <Text color="red.500" fontWeight="700">
            ₹{issue.fineAmount}
          </Text>
        ) : (
          "—"
        ),
    },

    {
      key: "payment",
      header: "Payment",

      render: (issue) =>
        issue.fineAmount > 0 ? (
          <StatusBadge status={issue.finePaid ? "PAID" : "UNPAID"} />
        ) : (
          <Text color="#94A3B8">—</Text>
        ),
    },

    {
      key: "status",
      header: "Status",

      render: (issue) => {
        let status = issue.active ? "ISSUED" : "RETURNED";

        if (
          issue.active &&
          issue.dueDate &&
          new Date(issue.dueDate) < new Date()
        ) {
          status = "OVERDUE";
        }

        return <StatusBadge status={status} />;
      },
    },

    {
      key: "actions",
      header: "Actions",

      render: (issue) => (
        <Flex gap="2">
          {issue.fineAmount > 0 && !issue.finePaid && (
            <Button
              size="xs"
              colorPalette="green"
              onClick={() =>
                setSelectedAction({
                  type: "PAY",
                  issue,
                })
              }
            >
              Pay Fine
            </Button>
          )}

          {issue.active && (issue.fineAmount === 0 || issue.finePaid) && (
            <Button
              size="xs"
              colorPalette="blue"
              onClick={() =>
                setSelectedAction({
                  type: "RETURN",
                  issue,
                })
              }
            >
              Return
            </Button>
          )}
        </Flex>
      ),
    },
  ];

  return (
    <AppLayout>
      <Box>
        <PageHeader
          title="Issue Management"
          subtitle="Manage issued books, returns and fines"
        />

        {/* CARDS */}

        <Flex gap="4" mb="6" flexWrap="wrap">
          <DataCard
            label="Active Issues"
            value={activeIssues}
            icon={<MdOutlineBookmarks />}
            color="#2563EB"
          />

          <DataCard
            label="Overdue"
            value={overdueBooks}
            icon={<MdWarning />}
            color="#EF4444"
          />

          <DataCard
            label="Returned"
            value={returnedBooks}
            icon={<MdCheckCircle />}
            color="#22C55E"
          />

          <DataCard
            label="Outstanding Fine"
            value={`₹${outstandingFine}`}
            icon={<MdAttachMoney />}
            color="#F59E0B"
          />
        </Flex>

        {/* FILTERS */}

        <Box
          bg="white"
          border="1px solid #E2E8F0"
          borderRadius="12px"
          p="4"
          mb="4"
        >
          <Flex gap="3">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search..."
            />

            <NativeSelectRoot maxW="220px">
              <NativeSelectField
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="ALL">All Records</option>

                <option value="ACTIVE">Active</option>

                <option value="OVERDUE">Overdue</option>

                <option value="RETURNED">Returned</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Flex>
        </Box>

        {/* TABLE */}

        <CustomTable
          columns={columns}
          data={filteredIssues || []}
          rowKey={(row) => row.issueId}
          loading={isLoading}
          emptyIcon="📚"
          emptyTitle="No Issues Found"
          emptyDesc="No records match your filters."
        />

        {/* CONFIRM DIALOG */}

        <ConfirmDialog
          open={!!selectedAction}

          onClose={() => setSelectedAction(null)}

          title={
            selectedAction?.type === "PAY" ? "Mark Fine Paid?" : "Return Book?"
          }

          message={
            selectedAction?.type === "PAY"
              ? "Confirm fine payment."
              : "Confirm return of this book."
          }

          confirmLabel={
            selectedAction?.type === "PAY" ? "Confirm Payment" : "Return Book"
          }

          confirmColor={selectedAction?.type === "PAY" ? "#22C55E" : "#2563EB"}

          onConfirm={async () => {
            const issue = selectedAction.issue;

            if (selectedAction.type === "PAY") {
              await handleFinePaid(issue.issueId);
            }

            if (selectedAction.type === "RETURN") {
              await handleReturnBook(issue.issueId);
            }

            setSelectedAction(null);
          }}
        />
      </Box>
    </AppLayout>
  );
}
