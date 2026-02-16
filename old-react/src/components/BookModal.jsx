import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, Button, FormControl, FormLabel,
    Input, VStack, HStack, Select
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

function BookModal({ isOpen, onClose, book, onSave }) {
    const isEditing = !!book;

    const [formData, setFormData] = useState({
        title: '',
        authorName: '',
        authorLastName: '',
        publisher: '',
        imageUrl: '',
        status: 'TO_READ'
    });

    useEffect(() => {
        if (isOpen) {
            if (book) {
                setFormData({
                    title: book.title || '',
                    authorName: book.author?.name || '',
                    authorLastName: book.author?.lastName || '',
                    publisher: book.publisher || '',
                    imageUrl: book.imageUrl || '',
                    status: book.status || 'TO_READ'
                });
            } else {
                setFormData({
                    title: '',
                    authorName: '',
                    authorLastName: '',
                    publisher: '',
                    imageUrl: '',
                    status: 'TO_READ'
                });
            }
        }
    }, [book, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const bookData = {
            title: formData.title,
            author: {
                name: formData.authorName,
                lastName: formData.authorLastName
            },
            publisher: formData.publisher,
            imageUrl: formData.imageUrl,
            status: formData.status
        };

        onSave(bookData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay backdropFilter="blur(4px)" />
            <ModalContent bg="gray.800" color="white" border="1px solid" borderColor="gray.600">
                <ModalHeader borderBottomWidth="1px" borderColor="gray.700">
                    {isEditing ? `Editar: ${book.title}` : "Agregar Nuevo Libro"}
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody py={6}>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel color="gray.400">Título</FormLabel>
                            <Input name="title" value={formData.title} onChange={handleChange} placeholder="Ej: Rayuela" focusBorderColor="teal.300" />
                        </FormControl>

                        <HStack w="full">
                            <FormControl isRequired>
                                <FormLabel color="gray.400">Nombre Autor</FormLabel>
                                <Input name="authorName" value={formData.authorName} onChange={handleChange} placeholder="Julio" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel color="gray.400">Apellido Autor</FormLabel>
                                <Input name="authorLastName" value={formData.authorLastName} onChange={handleChange} placeholder="Cortázar" />
                            </FormControl>
                        </HStack>

                        <FormControl>
                            <FormLabel color="gray.400">Editorial</FormLabel>
                            <Input name="publisher" value={formData.publisher} onChange={handleChange} placeholder="Alfaguara" />
                        </FormControl>

                        <FormControl>
                            <FormLabel color="gray.400">URL Portada</FormLabel>
                            <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel color="gray.400">Estado</FormLabel>
                            <Select name="status" value={formData.status} onChange={handleChange} bg="gray.700" border="none" _focus={{ bg: "gray.600" }}>
                                <option value="TO_READ">Por leer</option>
                                <option value="READING">Leyendo</option>
                                <option value="READ">Leído</option>
                            </Select>
                        </FormControl>
                    </VStack>
                </ModalBody>

                <ModalFooter borderTopWidth="1px" borderColor="gray.700">
                    <Button variant="ghost" mr={3} onClick={onClose} _hover={{ bg: "whiteAlpha.200" }}>
                        Cancelar
                    </Button>
                    <Button colorScheme="teal" onClick={handleSave}>
                        {isEditing ? "Guardar Cambios" : "Crear Libro"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default BookModal;