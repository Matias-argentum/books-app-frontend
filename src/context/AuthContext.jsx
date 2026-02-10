import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Inicializamos el estado con una función (Lazy Initializer)
    // Esto evita el error de sincronía y es más eficiente
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("userData");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (data) => {
    
    const userWithToken = {
        id: data.id,
        username: data.username,
        email: data.email,
        roles: data.roles,
        token: data.token
    };

    setUser(userWithToken);
    
    localStorage.setItem("userData", JSON.stringify(userWithToken));

    localStorage.setItem("token", data.token);
};

    const logout = () => {
        setUser(null);
        localStorage.clear(); // Limpia todo de una
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};