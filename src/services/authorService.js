const API_URL = import.meta.env.VITE_API_URL;

// GET
export const getAuthors = async (endpoint = "authors", token) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Error fetching authors");
    }

    return response.json();
};

// POST
export const postAuthor = async (token, payload) => {
    const response = await fetch(`${API_URL}/authors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Error creating author");
    }

    return response.json();
};

// PUT 
export const putAuthor = async (token, payload, authorId) => {
    const response = await fetch(`${API_URL}/authors/${authorId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Error updating author");
    }

    return response.json();
};

// DELETE 
export const deleteAuthor = async (token, authorId) => {
    const response = await fetch(`${API_URL}/authors/${authorId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Error deleting author");
    }

    // el backend devuelve noContent (204) no hace falta response.json()
    return true;
};