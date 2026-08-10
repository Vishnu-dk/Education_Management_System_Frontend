import { useState } from "react";

import { useGetBooksQuery } from "../../store/api/studentApi";

import BookCard from "../../components/common/BookCard";

import {
  Box,
  Input,
  NativeSelectField,
  NativeSelectRoot,
  Text,
  Flex,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import AppLayout from "../../components/layout/AppLayout";

export default function BookCatalog() {
  const { data: books, isLoading, error } = useGetBooksQuery();

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("ALL");

  const filteredBooks = books?.filter((book) => {
    const matchesSearch = book?.title
      ?.toLowerCase()
      ?.includes(search.toLowerCase());

    const matchesCategory = category === "ALL" || book.category === category;

    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <Flex h="400px" justify="center" align="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py="20">
        <Text color="red.500">Error loading books</Text>
      </Box>
    );
  }

  return (
    <AppLayout>
      <Box>
        <Box mb="6">
          <Text fontSize="32px" fontWeight="700" color="#0F172A">
            Book Catalog
          </Text>

          <Text color="#64748B" mt="2">
            Browse available books across all categories
          </Text>
        </Box>

        <Box
          bg="white"
          border="1px solid #E2E8F0"
          borderRadius="12px"
          p="4"
          mb="6"
        >
          <Flex gap="3" flexWrap="wrap">
            <Input
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              maxW="350px"
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
          </Flex>

          <Text fontSize="13px" color="#94A3B8" mt="3">
            {filteredBooks?.length || 0} books found
          </Text>
        </Box>

        {filteredBooks?.length === 0 ? (
          <Box
            bg="white"
            border="1px solid #E2E8F0"
            borderRadius="12px"
            py="20"
            textAlign="center"
          >
            <Text fontSize="50px" mb="3">
              📚
            </Text>

            <Text fontSize="18px" fontWeight="600" mb="2">
              No Books Found
            </Text>

            <Text color="#94A3B8">Try another search or category</Text>
          </Box>
        ) : (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              xl: 3,
            }}
            gap="4"
          >
            {filteredBooks?.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </AppLayout>
  );
}
