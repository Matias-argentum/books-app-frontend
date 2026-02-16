import { Box, Button, Card, CardHeader, CardBody, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom' // Esto es para navegar sin recargar

function Home() {
  const bg = useColorModeValue("gray.100", "gray.900")

  return (
    <Box minH="100vh" bg={bg} display="flex" alignItems="center" justifyContent="center">
      <Card maxW="md" w="full">
        <CardHeader textAlign="center">
          <Heading>Books App</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
            {/* El componente Link cambia la URL sin refrescar la página */}
            <Button as={Link} to="/login" colorScheme="teal" w="full">Iniciar Sesión</Button>
            <Button as={Link} to="/register" variant="ghost" w="full">Registrarse</Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  )
}

export default Home