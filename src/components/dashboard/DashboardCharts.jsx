import { Box, Text, SimpleGrid } from "@chakra-ui/react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#14B8A6",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#22C55E",
];

export default function DashboardCharts({ books, requests }) {
  const categoryMap = {};

  books?.forEach((book) => {
    categoryMap[book.category] = (categoryMap[book.category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const monthlyMap = {};

  requests?.forEach((request) => {
    if (!request.requestDate) return;

    const month = new Date(request.requestDate).toLocaleString("default", {
      month: "short",
    });

    monthlyMap[month] = (monthlyMap[month] || 0) + 1;
  });

  const requestData = Object.keys(monthlyMap).map((month) => ({
    month,
    requests: monthlyMap[month],
  }));

  return (
    <SimpleGrid
      columns={{
        base: 1,
        xl: 2,
      }}
      gap="5"
      mb="6"
    >
      {/* REQUESTS CHART */}

      <Box bg="white" border="1px solid #E2E8F0" borderRadius="12px" p="5">
        <Text mb="4" fontWeight="600">
          Requests by Month
        </Text>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={requestData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="requests" fill="#2563EB" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* CATEGORY CHART */}

      <Box bg="white" border="1px solid #E2E8F0" borderRadius="12px" p="5">
        <Text mb="4" fontWeight="600">
          Books by Category
        </Text>

        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </SimpleGrid>
  );
}
