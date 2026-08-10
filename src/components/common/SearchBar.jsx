import { Flex, Box, Input } from "@chakra-ui/react";

import { MdSearch } from "react-icons/md";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  width = "280px",
}) {
  return (
    <Flex
      align="center"
      bg="white"
      border="1px solid #E2E8F0"
      borderRadius="8px"
      px="3"
      gap="2"
      maxW={width}
      flex="1"
      transition="
                border-color 0.15s,
                box-shadow 0.15s
            "
      _focusWithin={{
        borderColor: "#2563EB",
        boxShadow: "0 0 0 3px rgba(37,99,235,0.12)",
      }}
    >
      <Box color="#94A3B8" flexShrink={0} lineHeight="0">
        <MdSearch size={17} />
      </Box>

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        bg="transparent"
        border="none"
        px="0"
        h="36px"
        fontSize="13.5px"
        color="#0F172A"
        _placeholder={{
          color: "#94A3B8",
        }}
        _focus={{
          boxShadow: "none",
        }}
      />
    </Flex>
  );
}
