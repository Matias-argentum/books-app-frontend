import { FormControl, FormLabel, Input, useToast, Box, Card, CardHeader, Heading, CardBody, VStack, Button, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Register() {
    const { user } = useAuth();
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const toast = useToast()

    const isInvalid = email.length < 5 || !email.includes('@') || password.length < 4 || username.length < 2

    useEffect(() => {
        if (user != null) {
            navigate('/dashboard')
        }
    }, [user, navigate])

    const handleRegister = async () => {
        setIsLoading(true)

        try {
            const data = await registerRequest(email, username, password);
            toast({
                title: "Registro",
                description: `Registro exitoso ${data.username}`,
                status: "success",
                isClosable: true,
                position: 'top'
            });

            setTimeout(() => {
                setIsLoading(false)
                navigate("/login")
            }, 1000);
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                isClosable: true,
                position: 'top'
            });
        } finally {
            setIsLoading(false)
        }
    }

    if (user) {
        return (
            <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    color='blue.500'
                    size='xl'
                />
            </Box>
        )
    }
    return (
        <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
            <Card maxW="md" w="full">
                <CardHeader textAlign="center">
                    <Heading size="lg">BooksApp Registration</Heading>
                </CardHeader>
                <CardBody>
                    <VStack spacing={4} as="form">
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="nombreUsuario"
                            />

                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Contraseña</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                            />
                        </FormControl>

                        <Button
                            colorScheme="teal"
                            w="full"
                            onClick={handleRegister}
                            isLoading={isLoading}
                            isDisabled={isInvalid}
                        >
                            Registrarme
                        </Button>
                    </VStack>
                </CardBody>
            </Card>
        </Box>
    )

}

export default Register