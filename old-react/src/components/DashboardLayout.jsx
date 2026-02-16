import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children, onFilterChange }) {
    return (
        <Box h="100vh" display="flex" flexDirection="column" overflow="hidden">
            <Navbar />

            <Flex flex="1" overflow="hidden">
                <Box
                    w="250px"
                    h="100%"
                    display={{ base: "none", md: "block" }} // Oculto en móviles si querés
                >
                    <Sidebar setFilter={onFilterChange} />
                </Box>

                <Box
                    as="main"
                    flex="1"
                    h="100%"
                    overflowY="auto"
                    bg="gray.800"
                    p={8}
                    css={{
                        '&::-webkit-scrollbar': { width: '8px' },
                        '&::-webkit-scrollbar-track': { background: '#1A202C' },
                        '&::-webkit-scrollbar-thumb': { background: '#4A5568', borderRadius: '10px' },
                    }}
                >
                    {children}
                </Box>
            </Flex>
        </Box>
    );
}

export default DashboardLayout;