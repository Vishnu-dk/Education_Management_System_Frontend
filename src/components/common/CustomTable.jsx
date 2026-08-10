import { Box, Flex, Text, Spinner, Table } from "@chakra-ui/react";

function EmptyState({ icon, title, desc }) {
  return (
    <Flex direction="column" align="center" py="16" px="6" gap="3">
      <Text fontSize="36px">{icon}</Text>

      <Text fontWeight="600" color="#334155" fontSize="15px">
        {title}
      </Text>

      <Text color="#94A3B8" fontSize="13px" textAlign="center">
        {desc}
      </Text>
    </Flex>
  );
}

export default function CustomTable({
  columns,
  data,
  loading = false,
  emptyIcon = "📭",
  emptyTitle = "No records found",
  emptyDesc = "Try adjusting your search or filters.",
  rowKey,
  onRowClick,
}) {
  return (
    <Box
      bg="white"
      border="1px solid #E2E8F0"
      borderRadius="12px"
      overflow="hidden"
    >
      <Box overflowX="auto">
        <Table.Root
          size="sm"
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <Table.Header>
            <Table.Row bg="#F8FAFC">
              {columns.map((column) => (
                <Table.ColumnHeader
                  key={column.key}
                  textAlign={column.align || "left"}
                  style={{
                    padding: "10px 16px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#64748B",
                    borderBottom: "1px solid #E2E8F0",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    whiteSpace: "nowrap",
                    width: column.width,
                  }}
                >
                  {column.header}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {loading ? (
              <Table.Row>
                <Table.Cell colSpan={columns.length}>
                  <Flex justify="center" py="12">
                    <Spinner size="lg" color="#2563EB" />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ) : data.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={columns.length}>
                  <EmptyState
                    icon={emptyIcon}
                    title={emptyTitle}
                    desc={emptyDesc}
                  />
                </Table.Cell>
              </Table.Row>
            ) : (
              data.map((row) => (
                <Table.Row
                  key={rowKey(row)}
                  cursor={onRowClick ? "pointer" : "default"}
                  onClick={() => onRowClick?.(row)}
                  _hover={
                    onRowClick
                      ? {
                          bg: "#F8FAFC",
                        }
                      : undefined
                  }
                  style={{
                    borderBottom: "1px solid #F1F5F9",
                  }}
                >
                  {columns.map((column) => (
                    <Table.Cell
                      key={column.key}
                      textAlign={column.align || "left"}
                      style={{
                        padding: "12px 16px",
                        verticalAlign: "middle",
                      }}
                    >
                      {column.render ? (
                        column.render(row)
                      ) : (
                        <Text fontSize="13.5px" color="#334155">
                          {String(row[column.key] ?? "—")}
                        </Text>
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}
