import React, { useState } from "react";

import {
  Box,
  Button,
  Flex,
  NativeSelectRoot,
  NativeSelectField,
  Text,
} from "@chakra-ui/react";

import {
  useActivateBookMutation,
  useDeactivateBookMutation,
  useGetAllBooksQuery,
} from "../../store/api/librarianApi";

import PageHeader from "../../components/common/PageHeader";

import SearchBar from "../../components/common/SearchBar";

import StatusBadge from "../../components/common/StatusBadge";

import CustomTable from "../../components/common/CustomTable";

import ConfirmDialog from "../../components/common/ConfirmDialog";

import AddBook from "../../components/forms/AddBook";
import EditBook from "../../components/forms/EditBook";
import AppLayout from "../../components/layout/AppLayout";

export default function BookManagement() {
  const [open, setOpen] = useState(false);

  const [selectedBook, setSelectedBook] = useState(null);

  const [editOpen, setEditOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("ALL");

  const [deactivateBook] = useDeactivateBookMutation();

  const [activateBook] = useActivateBookMutation();
  const [confirmBook, setConfirmBook] = useState(null);

  const { data: books, isLoading, error, refetch } = useGetAllBooksQuery();

  const filteredBooks = books?.filter((book) => {
    const matchesSearch = book.title
      ?.toLowerCase()
      ?.includes(search.toLowerCase());

    const matchesCategory = category === "ALL" || book.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleDeactivate = async (bookId) => {
    await deactivateBook(bookId).unwrap();

    refetch();
  };

  const handleActivate = async (bookId) => {
    await activateBook(bookId).unwrap();

    refetch();
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error Loading Books</h1>;
  }
  const columns = [
    {
      key: "title",
      header: "Book",
      render: (book) => (
        <Box>
          <Text fontWeight="600" color="#0F172A">
            {book.title}
          </Text>

          <Text fontSize="12px" color="#94A3B8">
            {book.author}
          </Text>
        </Box>
      ),
    },

    {
      key: "category",
      header: "Category",
    },

    {
      key: "publisher",
      header: "Publisher",
    },

    {
      key: "publicationYear",
      header: "Year",
      align: "center",
    },

    {
      key: "copies",
      header: "Copies",
      align: "center",
      render: (book) => (
        <Text>
          {book.availableCopies}/{book.totalCopies}
        </Text>
      ),
    },

    {
      key: "status",
      header: "Status",
      align: "center",

      render: (book) => (
        <StatusBadge status={book.active ? "ACTIVE" : "INACTIVE"} />
      ),
    },

    {
      key: "actions",
      header: "Actions",

      render: (book) => (
        <Flex gap="2">
          <Button
            size="xs"
            colorPalette="orange"
            onClick={() => {
              setSelectedBook(book);
              setEditOpen(true);
            }}
          >
            Edit
          </Button>

          <Button
            size="xs"
            colorPalette={book.active ? "red" : "green"}
            onClick={() => setConfirmBook(book)}
          >
            {book.active ? "Deactivate" : "Activate"}
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <AppLayout>
      <Box>
        {/* HEADER */}

        <PageHeader
          title="Book Management"

          subtitle={`
    ${books?.length || 0}
    books available
  `}

          actions={
            <Button bg="#2563EB" color="white" onClick={() => setOpen(true)}>
              + Add Book
            </Button>
          }
        />

        {/* FILTERS */}

        <Box
          bg="white"
          border="1px solid #E2E8F0"
          borderRadius="12px"
          p="4"
          mb="4"
        >
          <Flex gap="3" flexWrap="wrap">
            <SearchBar
              value={search}

              onChange={setSearch}

              placeholder="Search books..."
            />

            <NativeSelectRoot maxW="220px">
              <NativeSelectField
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="ALL">All Categories</option>

                <option value="PROGRAMMING">Programming</option>

                <option value="DATABASE">Database</option>

                <option value="NETWORKING">Networking</option>

                <option value="DATA_SCIENCE">Data Science</option>

                <option value="MATHEMATICS">Mathematics</option>
              </NativeSelectField>
            </NativeSelectRoot>

            <Text ml="auto" color="#94A3B8">
              {filteredBooks?.length} books
            </Text>
          </Flex>
        </Box>

        {/* TABLE */}

        <Box
          bg="white"
          border="1px solid #E2E8F0"
          borderRadius="12px"
          overflow="hidden"
        >
          <CustomTable
            columns={columns}

            data={filteredBooks || []}

            rowKey={(book) => book.id}

            emptyIcon="📚"

            emptyTitle="No Books Found"

            emptyDesc="
    Try adjusting
    your filters
  "
          />
        </Box>

        {/* MODALS */}

        <AddBook open={open} onClose={() => setOpen(false)} />

        {selectedBook && (
          <EditBook
            open={editOpen}
            onClose={() => {
              setEditOpen(false);

              refetch();
            }}
            book={selectedBook}
          />
        )}
        <ConfirmDialog
          open={!!confirmBook}

          onClose={() => setConfirmBook(null)}

          onConfirm={async () => {
            if (!confirmBook) return;

            if (confirmBook.active) {
              await handleDeactivate(confirmBook.id);
            } else {
              await handleActivate(confirmBook.id);
            }

            setConfirmBook(null);
          }}

          title={confirmBook?.active ? "Deactivate Book?" : "Activate Book?"}

          message={`
    Are you sure you want
    to ${confirmBook?.active ? "deactivate" : "activate"}
    this book?
  `}

          confirmLabel={confirmBook?.active ? "Deactivate" : "Activate"}

          confirmColor={confirmBook?.active ? "#EF4444" : "#22C55E"}
        />
      </Box>
    </AppLayout>
  );
}
