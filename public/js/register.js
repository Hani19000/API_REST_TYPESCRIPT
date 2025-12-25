// ✅ Fonction pour s'inscrire
async function registerUser(username, email, password) {
    return fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: "include"
    });
}

// ✅ Écouter la soumission du formulaire
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Tentative d'inscription avec:", username, email); // 🔍 Debug

    try {
        const response = await registerUser(username, email, password);
        
        console.log("Réponse:", response.status); // 🔍 Debug

        if (response.ok) {
            console.log("Inscription réussie ! Redirection..."); // 🔍 Debug
            window.location.href = "welcome.html";
        } else {
            const error = await response.json();
            console.error("Erreur:", error); // 🔍 Debug
            alert(error.error || "Erreur lors de l'inscription");
        }
    } catch (error) {
        console.error("Erreur réseau:", error); // 🔍 Debug
        alert("Erreur de connexion au serveur");
    }
});