const API_URL = import.meta.env.VITE_API_URL;

export const getBooks = async (endpoint, token) => {
    const response = await fetch(`${API_URL}/books/${endpoint}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

    if (!response.ok) {
        const errorMessage = await response.text();

        throw new Error(errorMessage || "Error fetching books");
    }

    return response.json();

}

export const postBook = async (token, payload) =>{
    const response = await fetch(`${API_URL}/books`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

    if (!response.ok) {
        const errorMessage = await response.text();

        throw new Error(errorMessage || "Error posting book");
    }

    return response.json();
}


export const putBook = async (token, payload, bookId) =>{
    const response = await fetch(`${API_URL}/books/${bookId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

    if (!response.ok) {
        const errorMessage = await response.text();

        throw new Error(errorMessage || "Error updating book");
    }

    return response.json();
}

export const patchBook = async (token, status, bookId) =>{
    const response = await fetch(`${API_URL}/books/${bookId}/status?status=${status}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

    if (!response.ok) {
        const errorMessage = await response.text();

        throw new Error(errorMessage || "Error updating book status");
    }

    return response.json();
}

export const deleteBook = async (token, bookId) =>{
    const response = await fetch(`${API_URL}/books/${bookId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

    if (!response.ok) {
        const errorMessage = await response.text();

        throw new Error(errorMessage || "Error deleting book");
    }

    return response.json();
}