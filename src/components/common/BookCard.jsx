import { Box, Flex, Text, Button } from "@chakra-ui/react";

import { useRequestBookMutation } from "../../store/api/studentApi";

import StatusBadge from "./StatusBadge";

export default function BookCard({ book }) {
  const [requestBook, { isLoading }] = useRequestBookMutation();
  console.log("Book ID: ", book);

  const handleRequestBook = async () => {
    const bookId = book?.id;

    if (!bookId) {
      alert("Book ID is missing.");

      return;
    }

    try {
      await requestBook({
        bookId,
      }).unwrap();

      alert("Book requested successfully");
    } catch (error) {
      const msg =
        typeof error?.data === "string"
          ? error.data
          : error?.data?.message || "Request Failed";

      alert(msg);
    }
  };

  const available = book.availableCopies;

  const availableColor =
    available === 0 ? "#EF4444" : available <= 2 ? "#EAB308" : "#22C55E";

  return (
    <Box
      bg="white"
      border="1px solid #E2E8F0"
      borderRadius="12px"
      overflow="hidden"
      transition="
                all 0.18s ease
            "
      _hover={{
        boxShadow: "0 6px 24px rgba(0,0,0,0.09)",
        transform: "translateY(-2px)",
      }}
    >
      {/* TOP STRIP */}

      <Box h="5px" bg="#2563EB" />

      <Box p="5">
        {/* BOOK INFO */}

        <Flex align="flex-start" gap="4" mb="4">
          <Flex
            w="44px"
            h="58px"
            borderRadius="6px"
            bg="blue.50"
            border="2px solid #BFDBFE"
            justify="center"
            align="center"
            fontSize="22px"
            flexShrink={0}
          >
            📘
          </Flex>

          <Box flex="1" minW="0">
            <Text
              fontWeight="600"
              fontSize="14px"
              color="#0F172A"
              lineHeight="1.3"
              mb="1"
            >
              {book.title}
            </Text>

            <Text fontSize="12px" color="#64748B" mb="2">
              {book.author}
            </Text>

            <Box
              display="inline-block"
              px="2"
              py="1"
              borderRadius="12px"
              bg="#F1F5F9"
            >
              <Text fontSize="11px" color="#475569" fontWeight="500">
                {book.category}
              </Text>
            </Box>
          </Box>
        </Flex>

        {/* DETAILS */}

        <Text fontSize="12px" color="#94A3B8" mb="4">
          Publisher: {book.publisher}
        </Text>

        <Text fontSize="12px" color="#94A3B8" mb="4">
          Published: {book.publicationYear}
        </Text>

        {/* FOOTER */}

        <Flex
          justify="space-between"
          align="center"
          pt="3"
          borderTop="
                        1px solid #F1F5F9
                    "
        >
          <Box>
            <Text fontSize="11px" color="#94A3B8">
              Available
            </Text>

            <Text fontSize="18px" fontWeight="800" color={availableColor}>
              {available}

              <Text as="span" fontSize="12px" color="#94A3B8" fontWeight="400">
                {" "}
                / {book.totalCopies}
              </Text>
            </Text>
          </Box>

          {!book.active ? (
            <StatusBadge status="INACTIVE" />
          ) : (
            <Button
              size="sm"
              bg="#2563EB"
              color="white"
              borderRadius="8px"
              loading={isLoading}
              disabled={available === 0}
              onClick={handleRequestBook}
              _hover={{
                bg: "#1D4ED8",
              }}
              _disabled={{
                bg: "#CBD5E1",
                color: "#94A3B8",
              }}
            >
              {available === 0 ? "Unavailable" : "Request"}
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
