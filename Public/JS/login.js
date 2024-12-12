//usar um botão ao invés da tag <a> pq teremos que validar os dado ao entrar, logo, tera que verificar e enviar dados ao clicar no botao,
// e não simplesmente ir para a página de login

// const botaoEntrarLogin = document.getElementById("login-entrar");
// botaoEntrarLogin.addEventListener("click", function() {
//     window.location.href = "/maps"
// });


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        const user = {email, senha}
        var token = await login(user)
       if(token)
        {
            window.location.href = `http://localhost:3000/maps/${token[0]}`
        }
        else
        {
            alert("Usuario negado")
        }
        localStorage.setItem("token", token[1])
    })
});

async function login(user) {
    try {
        const response = await fetch("/verificar-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        console.log("Resposta do servidor:", data[0], data[1]);
        return data;
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
    }
}

