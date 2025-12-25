async function checkAuth() {
    const response = await fetch("/users", {
        credentials: "include"
    });

    if (!response.ok) {
        window.location.href = "login.html";
    }
}