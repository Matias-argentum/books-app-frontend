import {
    Box, Button, Card, VStack, CardBody, CardHeader,
    Heading, FormControl, FormLabel, Input, useToast, Spinner
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { loginRequest } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { user } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const toast = useToast()

    const { login } = useAuth()

    const isInvalid = email.length < 4 || password.length < 4 || !email.includes('@')

    useEffect(() => {
        if (user != null) {
            navigate('/dashboard')
        }
    }, [user, navigate])

    const handleLogin = async () => {
        setIsLoading(true)
        try {
            const data = await loginRequest(email, password)

            login(data)

            toast({
                title: "Bienvenido",
                description: "Login exitoso",
                status: "success",
                isClosable: true,
                position: 'top'
            });

            navigate('/dashboard')

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
                    <Heading size="lg">BooksApp Login</Heading>
                </CardHeader>
                <CardBody>
                    <VStack spacing={4} as="form"> {/* 'as=form' es buena práctica */}
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
                            onClick={handleLogin}
                            isLoading={isLoading}
                            isDisabled={isInvalid}
                        >
                            Ingresar
                        </Button>
                    </VStack>
                </CardBody>
            </Card>
        </Box>
    )
}

export default Login