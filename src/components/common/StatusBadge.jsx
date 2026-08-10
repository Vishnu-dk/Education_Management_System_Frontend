import { Flex, Box, Text } from "@chakra-ui/react";

const CONFIG = {
  REQUESTED: {
    bg: "#EFF6FF",
    text: "#1D4ED8",
    dot: "#2563EB",
  },

  ISSUED: {
    bg: "#F0FDF4",
    text: "#15803D",
    dot: "#22C55E",
  },

  APPROVED: {
    bg: "#F0FDF4",
    text: "#15803D",
    dot: "#22C55E",
  },

  REJECTED: {
    bg: "#FEF2F2",
    text: "#B91C1C",
    dot: "#EF4444",
  },

  RETURNED: {
    bg: "#F8FAFC",
    text: "#475569",
    dot: "#94A3B8",
  },

  OVERDUE: {
    bg: "#FEF2F2",
    text: "#B91C1C",
    dot: "#EF4444",
  },

  PAID: {
    bg: "#F0FDF4",
    text: "#15803D",
    dot: "#22C55E",
  },

  UNPAID: {
    bg: "#FEF3C7",
    text: "#B45309",
    dot: "#EAB308",
  },

  ACTIVE: {
    bg: "#F0FDF4",
    text: "#15803D",
    dot: "#22C55E",
  },

  INACTIVE: {
    bg: "#F8FAFC",
    text: "#64748B",
    dot: "#94A3B8",
  },

  PENDING: {
    bg: "#FEF3C7",
    text: "#B45309",
    dot: "#EAB308",
  },

  STUDENT: {
    bg: "#EFF6FF",
    text: "#1D4ED8",
    dot: "#2563EB",
  },

  LIBRARIAN: {
    bg: "#F5F3FF",
    text: "#6D28D9",
    dot: "#8B5CF6",
  },

  ADMINISTRATOR: {
    bg: "#F5F3FF",
    text: "#6D28D9",
    dot: "#8B5CF6",
  },
};

const FALLBACK = {
  bg: "#F8FAFC",
  text: "#64748B",
  dot: "#94A3B8",
};

export default function StatusBadge({ status, size = "sm" }) {
  const config = CONFIG[status] || FALLBACK;

  const paddingX = size === "sm" ? "8px" : "12px";

  const paddingY = size === "sm" ? "3px" : "5px";

  const fontSize = size === "sm" ? "11.5px" : "13px";

  return (
    <Flex
      display="inline-flex"
      align="center"
      gap="5px"
      px={paddingX}
      py={paddingY}
      borderRadius="20px"
      bg={config.bg}
      color={config.text}
      fontSize={fontSize}
      fontWeight="500"
      whiteSpace="nowrap"
    >
      <Box w="5px" h="5px" borderRadius="50%" bg={config.dot} flexShrink={0} />

      <Text as="span" lineHeight="1">
        {status}
      </Text>
    </Flex>
  );
}
