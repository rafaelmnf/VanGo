window.onload = async function() {
    try {
        const dados = await buscarDados();

        if (dados) {
            const { nome, sobrenome, email, cpf } = dados;

            document.getElementById('nome').textContent = nome;
            document.getElementById('sobrenome').textContent = sobrenome;
            document.getElementById('email').textContent = email;
            document.getElementById('cpf').textContent = cpf;
        } else {
            console.log('Nenhum dado encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

async function buscarDados() {
    
    const pathname = window.location.pathname;

    // Divide o caminho em segmentos
    const segments = pathname.split('/');

    // Pega o último segmento, que deve ser o ID
    const id = segments[segments.length - 1];

    try {
        const resultado = await fetch(`/buscar-por-id/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        // 1. Primeiro problema: você precisa converter a resposta para JSON
        const dadosUsuario = await resultado.json();

        // 2. Segundo problema: verificar se a resposta foi bem-sucedida
        if (!resultado.ok) {
            throw new Error(dadosUsuario.mensagem || 'Erro ao buscar usuário');
        }

        return dadosUsuario;
    } catch (error) {
        console.error('Erro na busca de dados:', error);
        throw error;
    }
}

// -------------------------------------------
function irMaps() {
    // Captura o caminho atual da URL
    const pathname = window.location.pathname;

    // Divide o caminho em segmentos
    const segments = pathname.split('/');

    // Pega o último segmento, que deve ser o ID
    const id = segments[segments.length - 1];

    if (id) {
        const path = document.getElementById("maps");
        path.href = `/maps/${id}`; // Correção: use atribuição (=) em vez de chamada de método
    } else {
        console.log("ID não encontrado na URL");
    }
}