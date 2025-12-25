    document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await loginUser(email.value, password.value);

    if (response.ok) {
    window.location.href = "welcome.html";
    } else {
    alert("Identifiants incorrects");
    }
    });
async function loginUser(email, password) {
    return fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
}