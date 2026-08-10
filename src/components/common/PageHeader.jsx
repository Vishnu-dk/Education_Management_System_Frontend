import { Box, Flex, Text } from "@chakra-ui/react";

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <Flex
      justify="space-between"
      align="flex-start"
      mb="8"
      gap="4"
      flexWrap="wrap"
    >
      <Box>
        <Text
          fontSize="28px"
          fontWeight="700"
          color="#0F172A"
          lineHeight="1.2"
          mb={subtitle ? "1" : "0"}
        >
          {title}
        </Text>

        {subtitle && (
          <Text fontSize="14px" color="#64748B">
            {subtitle}
          </Text>
        )}
      </Box>

      {actions && (
        <Flex align="center" gap="2" flexWrap="wrap">
          {actions}
        </Flex>
      )}
    </Flex>
  );
}
