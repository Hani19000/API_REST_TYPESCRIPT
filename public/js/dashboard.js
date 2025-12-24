// public/js/dashboard.js

// Vérifier l'authentification au chargement
if (!requireAuth()) {
    // L'utilisateur sera redirigé par requireAuth()
}

const currentUser = storage.getUser();
const usersListDiv = document.getElementById('usersList');
const currentUserEmail = document.getElementById('currentUserEmail');
const logoutBtn = document.getElementById('logoutBtn');

// Afficher l'utilisateur connecté
if (currentUserEmail && currentUser) {
    currentUserEmail.textContent = `${currentUser.username} (${currentUser.email})`;
}

// Fonction pour charger les utilisateurs
async function loadUsers() {
    usersListDiv.innerHTML = '<div class="loading">Chargement des utilisateurs...</div>';
    
    const result = await usersAPI.getAll();
    
    if (result.ok) {
        displayUsers(result.data);
    } else if (result.status === 403) {
        showMessage('message', 'Session expirée. Veuillez vous reconnecter.', 'error');
        setTimeout(() => logout(), 2000);
    } else {
        usersListDiv.innerHTML = `<div class="alert alert-error">${result.error}</div>`;
    }
}

// Fonction pour afficher les utilisateurs
function displayUsers(users) {
    if (!users || users.length === 0) {
        usersListDiv.innerHTML = '<div class="empty-state">Aucun utilisateur trouvé</div>';
        return;
    }

    usersListDiv.innerHTML = users.map(user => {
        const isCurrentUser = user._id === currentUser._id;
        
        return `
            <div class="user-card" id="user-${user._id}">
                <div class="user-info">
                    <h3>${user.username} ${isCurrentUser ? '(Vous)' : ''}</h3>
                    <p>${user.email}</p>
                    <small style="color: #999;">ID: ${user._id}</small>
                </div>
                <div class="user-actions">
                    ${isCurrentUser ? `
                        <button class="btn btn-edit" onclick="editUser('${user._id}', '${user.username}')">
                            Modifier
                        </button>
                        <button class="btn btn-danger" onclick="deleteUser('${user._id}')">
                            Supprimer
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Fonction pour supprimer un utilisateur
async function deleteUser(userId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
        return;
    }

    const result = await usersAPI.delete(userId);
    
    if (result.ok) {
        showMessage('message', 'Compte supprimé avec succès', 'success');
        setTimeout(() => logout(), 1500);
    } else {
        showMessage('message', result.error, 'error');
    }
}

// Fonction pour modifier un utilisateur
async function editUser(userId, currentUsername) {
    const newUsername = prompt('Nouveau nom d\'utilisateur:', currentUsername);
    
    if (!newUsername || newUsername.trim() === '' || newUsername === currentUsername) {
        return;
    }

    const result = await usersAPI.update(userId, newUsername.trim());
    
    if (result.ok) {
        // Mettre à jour localStorage
        storage.saveUser(result.data);
        
        showMessage('message', 'Profil mis à jour avec succès', 'success');
        
        // Recharger la liste et mettre à jour l'affichage
        loadUsers();
        currentUserEmail.textContent = `${result.data.username} (${result.data.email})`;
        
        // Effacer le message après 3 secondes
        setTimeout(() => clearMessage('message'), 3000);
    } else {
        showMessage('message', result.error, 'error');
    }
}

// Event listener pour le bouton de déconnexion
if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}

// Charger les utilisateurs au chargement de la page
loadUsers();