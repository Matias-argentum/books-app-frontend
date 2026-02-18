const API_URL = import.meta.env.VITE_API_URL;

export const getAuthors = async (endpoint = "authors", token) => {
    const response = await fetch(`${API_URL}/${endpoint}`,
        {
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
}