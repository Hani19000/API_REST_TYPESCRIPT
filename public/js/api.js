const API_BASE_URL = 'http://localhost:8080';

const fetchConfig = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    }
};


const authAPI = {

    register: async (username, email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                ...fetchConfig,
                body: JSON.stringify({ username, email, password })
            });
            
            return {
                ok: response.ok,
                status: response.status,
                data: response.ok ? await response.json() : null,
                error: !response.ok ? await response.text() : null
            };
        } catch (error) {
            return {
                ok: false,
                error: 'Erreur de connexion au serveur'
            };
        }
    },


    login: async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                ...fetchConfig,
                body: JSON.stringify({ email, password })
            });
            
            return {
                ok: response.ok,
                status: response.status,
                data: response.ok ? await response.json() : null,
                error: !response.ok ? 'Email ou mot de passe incorrect' : null
            };
        } catch (error) {
            return {
                ok: false,
                error: 'Erreur de connexion au serveur'
            };
        }
    }
};

const usersAPI = {
    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'GET',
                ...fetchConfig
            });
            
            return {
                ok: response.ok,
                status: response.status,
                data: response.ok ? await response.json() : null,
                error: !response.ok ? 'Erreur lors du chargement des utilisateurs' : null
            };
        } catch (error) {
            return {
                ok: false,
                error: 'Erreur de connexion au serveur'
            };
        }
    },


    delete: async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'DELETE',
                ...fetchConfig
            });
            
            return {
                ok: response.ok,
                status: response.status,
                data: response.ok ? await response.json() : null,
                error: !response.ok ? 'Erreur lors de la suppression' : null
            };
        } catch (error) {
            return {
                ok: false,
                error: 'Erreur de connexion au serveur'
            };
        }
    },


    update: async (userId, username) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'PATCH',
                ...fetchConfig,
                body: JSON.stringify({ username })
            });
            
            return {
                ok: response.ok,
                status: response.status,
                data: response.ok ? await response.json() : null,
                error: !response.ok ? 'Erreur lors de la mise à jour' : null
            };
        } catch (error) {
            return {
                ok: false,
                error: 'Erreur de connexion au serveur'
            };
        }
    }
};