const storage = {

    saveUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
    },

    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },


    removeUser: () => {
        localStorage.removeItem('user');
    },


    isAuthenticated: () => {
        return !!localStorage.getItem('user');
    }
};

const logout = () => {
    storage.removeUser();

    document.cookie = 'Hani=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost';
    window.location.href = 'login.html';
};


const requireAuth = () => {
    if (!storage.isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
};


const redirectIfAuthenticated = () => {
    if (storage.isAuthenticated()) {
        window.location.href = 'dashboard.html';
    }
};


const showMessage = (elementId, message, type = 'error') => {
    const messageDiv = document.getElementById(elementId);
    const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
    messageDiv.innerHTML = `<div class="alert ${alertClass}">${message}</div>`;
};

const clearMessage = (elementId) => {
    const messageDiv = document.getElementById(elementId);
    messageDiv.innerHTML = '';
};