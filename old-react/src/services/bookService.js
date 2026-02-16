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