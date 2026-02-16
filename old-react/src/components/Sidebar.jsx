import { VStack, Button, Icon, Text, Box } from "@chakra-ui/react";
import { RiBookLine, RiBookReadLine, RiTimeLine, RiCheckboxCircleLine, RiMagicLine } from "react-icons/ri";

function Sidebar({setFilter}) {
    return (
        <Box 
            w="250px" 
            bg="gray.900" 
            color="white" 
            minH="calc(100vh - 70px)" // El alto total menos el Navbar
            p={4}
            borderRight="1px"
            borderColor="gray.700"
        >
            <VStack align="stretch" spacing={2}>
                <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2} ml={2}>
                    BIBLIOTECA
                </Text>
                
                <Button 
                
                onClick={() => setFilter('my-books')}
                variant="ghost" justifyContent="flex-start" leftIcon={<Icon as={RiBookLine} color="teal.300" />}>
                    Todos
                </Button>
                
                <Button 
                onClick={() => setFilter('reading')}
                variant="ghost" justifyContent="flex-start" leftIcon={<Icon as={RiBookReadLine} color="blue.300" />}>
                    Leyendo
                </Button>

                <Button 
                onClick={() => setFilter('read')}
                variant="ghost" justifyContent="flex-start" leftIcon={<Icon as={RiCheckboxCircleLine} color="green.300" />}>
                    Leídos
                </Button>

                <Button 
                onClick={() => setFilter('wishlist')}
                variant="ghost" justifyContent="flex-start" leftIcon={<Icon as={RiTimeLine} color="yellow.300" />}>
                    Por leer
                </Button>

                <Box pt={10}>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2} ml={2}>
                        IA
                    </Text>
                    <Button 
                        w="full"
                        colorScheme="purple"
                    >
                        Gemini Recomienda
                    </Button>
                </Box>
            </VStack>
        </Box>
    );
}

export default Sidebar;