const API_URL = "http://localhost:9090/api/auth"

export const loginRequest = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
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