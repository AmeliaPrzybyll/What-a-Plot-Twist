const API_BASE = "https://localhost:7276/api/mongo";

export const login = async (username, password) => {
    const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "B³¹d logowania");
    }
    const data = await response.json();

    //AP: zapamiêtanie loginu i avatara w pamiêci lokalnej potrzebne do zmiany has³a itp
    localStorage.setItem("username", data.username);
    if (data.avatar) {
        localStorage.setItem('avatar', data.avatar);
    }
    return data;
};

export const register = async (username, password) => {
    const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "B³¹d rejestracji");
    }

    return response.json();
};
