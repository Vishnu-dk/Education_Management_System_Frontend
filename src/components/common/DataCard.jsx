import { Box, Flex, Text } from "@chakra-ui/react";

export default function DataCard({
  label,
  value,
  icon,
  color,
  subtitle,
  trend,
  onClick,
}) {
  const trendColor =
    trend?.direction === "up"
      ? "#22C55E"
      : trend?.direction === "down"
        ? "#EF4444"
        : "#64748B";

  const trendArrow =
    trend?.direction === "up" ? "↑" : trend?.direction === "down" ? "↓" : "→";

  return (
    <Box
      bg="white"
      border="1px solid #E2E8F0"
      borderRadius="12px"
      p="20px 22px"
      cursor={onClick ? "pointer" : "default"}
      transition="
                box-shadow 0.18s,
                border-color 0.18s
            "
      onClick={onClick}
      _hover={
        onClick
          ? {
              boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
              borderColor: "#CBD5E1",
            }
          : {}
      }
    >
      <Flex justify="space-between" gap="8" align="flex-start" mb="3">
        <Box>
          <Text fontSize="12.5px" color="#64748B" fontWeight="500" mb="6px">
            {label}
          </Text>

          <Text fontSize="26px" fontWeight="700" color="#0F172A" lineHeight="1">
            {value}
          </Text>

          {subtitle && (
            <Text fontSize="11.5px" color="#94A3B8" mt="5px">
              {subtitle}
            </Text>
          )}
        </Box>

        <Flex
          w="42px"
          h="42px"
          borderRadius="10px"
          bg={`${color}18`}
          justify="center"
          align="center"
          fontSize="20px"
        >
          {icon}
        </Flex>
      </Flex>

      {trend && (
        <Flex
          pt="3"
          mt="3"
          borderTop="1px solid #F1F5F9"
          align="center"
          gap="1"
        >
          <Text fontSize="12px" color={trendColor} fontWeight="500">
            {trendArrow} {trend.value}
          </Text>
        </Flex>
      )}
    </Box>
  );
}
