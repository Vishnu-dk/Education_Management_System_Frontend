import {
    Box,
    Flex,
    Text,
    Avatar
} from "@chakra-ui/react";

import PageHeader
from "../common/PageHeader";

export default function ProfileLayout({
    children
}) {

    const role =
        localStorage.getItem("role");

    return (

        <Box>

            <PageHeader
                title="My Profile"
                subtitle="Manage your personal information"
            />

            <Box
                bg="white"
                border="1px solid #E2E8F0"
                borderRadius="16px"
                overflow="hidden"
            >

                {/* HEADER */}

                

                {/* BODY */}

                <Box p="">

                    {children}
                </Box>

           </Box>

        </Box>

    );
}
