
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("usuario-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const sobrenome = document.getElementById("sobrenome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const cpf = document.getElementById("cpf").value;
        const usuarioDados = {nome, sobrenome, email, senha, cpf}

        await criarUsuario(usuarioDados)
    })
});

// Função para criar usuário
async function criarUsuario(user) {
    try {
        const response = await fetch("/criar-usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        console.log("Resposta do servidor:", data);
        alert(`Usuario: ${user.nome} criado com sucesso`)
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
    }
}