function irPerfil() {
    // Captura o caminho atual da URL
    const pathname = window.location.pathname;

    // Divide o caminho em segmentos
    const segments = pathname.split('/');

    // Pega o último segmento, que deve ser o ID
    const id = segments[segments.length - 1];

    if (id) {
        const path = document.getElementById("perfil");
        path.href = `/perfil/${id}`; // Correção: use atribuição (=) em vez de chamada de método
    } else {
        console.log("ID não encontrado na URL");
    }
}


