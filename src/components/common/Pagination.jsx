import { Flex, Text, Box } from "@chakra-ui/react";

export function Pagination({ page, total, perPage, onChange }) {
  const pages = Math.ceil(total / perPage);

  if (pages <= 1) {
    return null;
  }

  const from = (page - 1) * perPage + 1;

  const to = Math.min(page * perPage, total);

  return (
    <Flex
      align="center"
      justify="space-between"
      px="4"
      py="3"
      bg="white"
      borderTop="1px solid #E2E8F0"
      borderBottomRadius="12px"
      flexWrap="wrap"
      gap="2"
    >
      <Text fontSize="12.5px" color="#64748B">
        Showing {from}-{to} of {total} records
      </Text>

      <Flex gap="1" align="center">
        <PagButton
          label="‹ Prev"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
        />

        {Array.from(
          {
            length: pages,
          },
          (_, i) => i + 1,
        ).map((p) => (
          <Box
            key={p}
            as="button"
            w="30px"
            h="30px"
            borderRadius="6px"
            border={`1px solid ${p === page ? "#2563EB" : "#E2E8F0"}`}
            bg={p === page ? "#2563EB" : "white"}
            color={p === page ? "white" : "#475569"}
            fontSize="13px"
            cursor="pointer"
            onClick={() => onChange(p)}
          >
            {p}
          </Box>
        ))}

        <PagButton
          label="Next ›"
          disabled={page === pages}
          onClick={() => onChange(page + 1)}
        />
      </Flex>
    </Flex>
  );
}

function PagButton({ disabled, onClick, label }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        padding: "0 12px",
        height: "30px",
        borderRadius: "6px",
        border: "1px solid #E2E8F0",
        background: "white",
        color: disabled ? "#CBD5E1" : "#475569",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </button>
  );
}
