import { Box, Heading, Text, Button, Badge, VStack } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Box p={8}>
            <VStack align="start" spacing={4}>
                <Heading>Panel de Control</Heading>
                
                {/* Usamos el user?. para evitar errores si aún está cargando */}
                <Text fontSize="xl">
                    Bienvenido, <strong>{user?.username}</strong>
                </Text>
                
                <Text color="gray.500">ID de usuario: {user?.id}</Text>
                
                <Box>
                    <Text mb={2}>Tus permisos:</Text>
                    {user?.roles?.map((rol) => (
                        <Badge key={rol} colorScheme="purple" variant="filled">
                            {rol}
                        </Badge>
                    ))}
                </Box>

                <Button colorScheme="red" variant="outline" onClick={handleLogout}>
                    Cerrar Sesión
                </Button>
            </VStack>
        </Box>
    );
}

export default Dashboard;