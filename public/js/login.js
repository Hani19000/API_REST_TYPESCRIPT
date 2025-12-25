// ✅ Fonction pour se connecter
async function loginUser(email, password) {
    return fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
    });
}

// ✅ Écouter la soumission du formulaire
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Récupérer les valeurs
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Tentative de connexion avec:", email); // 🔍 Debug

    try {
        const response = await loginUser(email, password);
        
        console.log("Réponse:", response.status); // 🔍 Debug

        if (response.ok) {
            console.log("Connexion réussie ! Redirection..."); // 🔍 Debug
            window.location.href = "welcome.html";
        } else {
            const error = await response.json();
            console.error("Erreur:", error); // 🔍 Debug
            alert(error.error || "Identifiants incorrects");
        }
    } catch (error) {
        console.error("Erreur réseau:", error); // 🔍 Debug
        alert("Erreur de connexion au serveur");
    }
});