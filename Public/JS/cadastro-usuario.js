const form = document.getElementById('userForm');

form.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const cpf = document.getElementById("cpf").value;
    
    
    const usuarioDados = {nome, sobrenome, email, senha, cpf};
    console.log(usuarioDados);    

})

async function criarUsuario(usuarioDados){
    await fetch('/criar-usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioDados)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}