import { Flex, HStack, Text, Button, Spacer } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { RiLogoutBoxLine } from "react-icons/ri";
import Logo from "./Logo";

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            bg="gray.900"
            color="gray.600"
            borderBottom="1px solid"
            borderColor="gray.700"
            h="70px"
        >
            <Logo />

            <Spacer />

            <HStack spacing={6}>
                {user && (
                    <Text fontWeight="medium" fontSize="sm">
                        Hola, <Text as="span" color="green.600" fontWeight="bold">{user.username}</Text>
                    </Text>
                )}
                
                <Button
                    leftIcon={<RiLogoutBoxLine />}
                    colorScheme="red"
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                >
                    Salir
                </Button>
            </HStack>
        </Flex>
    );
}

export default Navbar;