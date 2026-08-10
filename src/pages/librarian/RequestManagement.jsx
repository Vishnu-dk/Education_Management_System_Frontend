import { useState } from "react";

import AppLayout from "../../components/layout/AppLayout";

import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import DataCard from "../../components/common/DataCard";
import StatusBadge from "../../components/common/StatusBadge";
import CustomTable from "../../components/common/CustomTable";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import {
  useAcceptBookRequestMutation,
  useAllRequestQuery,
  useRejectBookRequestMutation,
  useReturnBookMutation,
} from "../../store/api/librarianApi";

import {
  Box,
  Button,
  Flex,
  Text,
  NativeSelectRoot,
  NativeSelectField,
} from "@chakra-ui/react";

import { MdSchedule, MdCheckCircle, MdCancel } from "react-icons/md";

function RequestManagement() {
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedAction, setSelectedAction] = useState(null);

  const {
    data: bookRequests,
    isLoading,
    error,
    refetch,
  } = useAllRequestQuery();

  const filteredRequests = bookRequests?.filter((request) => {
    const matchesSearch =
      request.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      request.bookTitle?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const [approveRequest] = useAcceptBookRequestMutation();
  const [rejectRequest] = useRejectBookRequestMutation();
  const [returnBook] = useReturnBookMutation();
  const pendingCount =
    bookRequests?.filter((r) => r.status === "REQUESTED").length || 0;

  const approvedCount =
    bookRequests?.filter((r) => r.status === "ISSUED").length || 0;

  const rejectedCount =
    bookRequests?.filter((r) => r.status === "REJECTED").length || 0;

  const handleApprove = async (requestId) => {
    try {
      await approveRequest({ requestId }).unwrap();
      refetch();
    } catch (error) {
      console.log("Error", error.data.message);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectRequest({ requestId }).unwrap();
      refetch();
    } catch (error) {
      console.log("Error", error.data.message);
    }
  };

  const handleReturn = async (requestId) => {
    try {
      await returnBook({ requestId }).unwrap();
      refetch();
    } catch (error) {
      console.log("Error", error.data.message);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error Loading Requests</h1>;
  }
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
      key: "status",
      header: "Status",

      render: (request) => <StatusBadge status={request.status} />,
    },

    {
      key: "actions",
      header: "Actions",

      render: (request) => (
        <Flex gap="2">
          <Button
            size="xs"
            colorPalette="green"
            disabled={request.status !== "REQUESTED"}
            onClick={() =>
              setSelectedAction({
                type: "APPROVE",
                request,
              })
            }
          >
            Approve
          </Button>

          <Button
            size="xs"
            colorPalette="red"
            disabled={request.status !== "REQUESTED"}
            onClick={() =>
              setSelectedAction({
                type: "REJECT",
                request,
              })
            }
          >
            Reject
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <AppLayout>
      <Box>
        <PageHeader
          title="Request Management"

          subtitle={`${pendingCount} pending requests`}
        />

        <Flex gap="4" mb="6" flexWrap="wrap">
          <DataCard
            label="Pending"
            value={pendingCount}
            icon={<MdSchedule />}
            color="#EAB308"
          />

          <DataCard
            label="Approved"
            value={approvedCount}
            icon={<MdCheckCircle />}
            color="#22C55E"
          />

          <DataCard
            label="Rejected"
            value={rejectedCount}
            icon={<MdCancel />}
            color="#EF4444"
          />
        </Flex>

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
              placeholder="Search requests..."
            />

            <NativeSelectRoot maxW="220px">
              <NativeSelectField
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Status</option>

                <option value="REQUESTED">REQUESTED</option>

                <option value="ISSUED">ISSUED</option>

                <option value="REJECTED">REJECTED</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Flex>
        </Box>

        <CustomTable
          columns={columns}

          data={filteredRequests || []}

          rowKey={(row) => row.issueId}

          emptyIcon="📚"

          emptyTitle="
    No Requests Found
  "

          emptyDesc="
    No requests match
    your filters
  "
        />
      </Box>
      <ConfirmDialog
        open={!!selectedAction}

        onClose={() => setSelectedAction(null)}

        title={selectedAction?.type}

        message={`
Are you sure you want
to ${selectedAction?.type}
this request?
`}

        confirmLabel={selectedAction?.type}

        onConfirm={async () => {
          const request = selectedAction.request;

          if (selectedAction.type === "APPROVE") {
            await approveRequest({
              requestId: request.issueId,
            }).unwrap();
          }

          if (selectedAction.type === "REJECT") {
            await rejectRequest({
              requestId: request.issueId,
            }).unwrap();
          }

          refetch();

          setSelectedAction(null);
        }}
      />
    </AppLayout>
  );
}

export default RequestManagement;
