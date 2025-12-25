document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await registerUser(username, email, password);

    if (response.ok) {
        window.location.href = "welcome.html";
    } else {
        alert("Erreur inscription");
    }
    });

    async function registerUser(username, email, password) {
    return fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });
    }


