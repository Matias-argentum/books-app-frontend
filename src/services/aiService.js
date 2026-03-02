const API_URL = import.meta.env.VITE_API_URL;

export const getAiRecommendations = async (token) => {
    const response = await fetch(`${API_URL}/books/recommendations`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    console.log("Status de la respuesta IA:", response.status);

    if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || "Ya pediste tus recomendaciones de hoy.");
    }

    const data = await response.json();

    console.log("Datos recibidos de la IA:", data);

    return data;
};