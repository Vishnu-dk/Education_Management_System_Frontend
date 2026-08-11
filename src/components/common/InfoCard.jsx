import {
    Box,
    Text
} from "@chakra-ui/react";

export default function InfoCard({
    label,
    value
}) {

   return (
    <Box border="1px soli #E2E8F0" borderRadius="10px" p="4">
        <Text fontSize="12px" color="#94A3B8" mb="1">
            {label}
        </Text>
                    <Text
               fontWeight="600"
               color="#0F172A"
            >
               {value || "-"}
           </Text>
    </Box>



   );

}
