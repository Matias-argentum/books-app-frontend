import { Box, Image, Text, Badge, VStack, HStack, Icon, Button } from "@chakra-ui/react";
import { RiCalendarLine, RiUserLine, RiBuildingLine, RiDeleteBin4Fill, RiEdit2Fill, RiDeleteBackFill, RiDeleteBin5Fill } from "react-icons/ri";

function BookCard({ book, onDeleteClick, onEditClick }) {
    // Colores según el estado que viene del Backend
    const statusColors = {
        READ: "green",
        READING: "blue",
        TO_READ: "yellow"
    };

    // Formateo de fecha simple
    const dateCreated = book.addedAt
        ? new Date(book.addedAt).toLocaleDateString()
        : "S/D";

    return (
        <Box
            bg="gray.700"
            borderRadius="lg"
            overflow="hidden"
            shadow="xl"
            border="1px solid"
            borderColor="gray.600"
            color="white"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.01)" }}
        >
            <HStack justify="space-between" p={3} bg="gray.800">
                <HStack spacing={1}>
                    <Icon as={RiCalendarLine} color="gray.400" boxSize={3} />
                    <Text fontSize="xs" color="gray.400">{dateCreated}</Text>
                </HStack>
                <Badge colorScheme={statusColors[book.status]} variant="solid" fontSize="0.7em">
                    {book.status}
                </Badge>
            </HStack>

            <Box h="450px" display="flex" bg="gray.600">
                <Image
                    src={book.imageUrl || "https://via.placeholder.com/400x600?text=Sin+Portada"}
                    alt={book.title}
                    h="100%"
                    w="75%"
                    objectFit="contain"
                    align="center"
                    justify="center"
                    margin="auto"

                />
            </Box>

            <VStack p={5} align="start" spacing={3}>
                <Text fontWeight="bold" fontSize="xl" noOfLines={1} color="white">
                    {book.title}
                </Text>

                <VStack align="start" spacing={1} w="full">
                    <HStack fontSize="md" color="gray.300">
                        <Icon as={RiUserLine} color="teal.300" />
                        <Text fontWeight="medium">
                            {book.author.name} {book.author.lastName}
                        </Text>
                    </HStack>

                    <HStack fontSize="sm" color="gray.400">
                        <Icon as={RiBuildingLine} />
                        <Text>{book.publisher || "Editorial no disponible"}</Text>
                    </HStack>
                    <HStack justify="space-between" flex={1} width="100%">
                        <Button
                            onClick={() => onEditClick(book)}
                            variant="ghost" justifyContent="flex-start" size="sm" leftIcon={<Icon as={RiEdit2Fill} color="yellow.300" />}>
                            Editar
                        </Button>
                        <Button
                            onClick={() => onDeleteClick(book)}
                            variant="ghost" justifyContent="flex-end" size="sm" leftIcon={<Icon as={RiDeleteBin5Fill} color="red.300" />}>
                            Eliminar
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
        </Box>
    );
}

export default BookCard;