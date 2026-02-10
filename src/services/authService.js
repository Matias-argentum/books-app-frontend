const API_URL = import.meta.env.VITE_API_URL;

export const loginRequest = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error("Error en las credenciales");
    }

    return response.json();
};

export const registerRequest = async (email, username, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
    });

    // si falla la respuesta
    if (!response.ok) {
        // lee el text plain
        const errorMessage = await response.text();

        console.log("Mensaje de Java:", errorMessage); // Aquí verás "Email already exists"

        //lanza mensaje del backend o mensaje generico
        throw new Error(errorMessage || "Error en registro");
    }

    // si no sale el json de la respuesta de exito
    return response.json();
}