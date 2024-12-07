//usar um botão ao invés da tag <a> pq teremos que validar os dado ao entrar, logo, tera que verificar e enviar dados ao clicar no botao,
// e não simplesmente ir para a página de login

const botaoEntrarLogin = document.getElementById("login-entrar");
botaoEntrarLogin.addEventListener("click", function() {
    window.location.href = "/maps"
});