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

// ------------------------------------------------------------------------
let meusContratosAdicionadosHTML = ``;
let meusContratosAdicionados = []; // Variável para armazenar os contratos adicionados

// Função para carregar contratos adicionados do localStorage
function carregarContratosAdicionados() {
  const contratosArmazenados = localStorage.getItem('contratosAdicionados');
  if (contratosArmazenados) {
    meusContratosAdicionados = JSON.parse(contratosArmazenados);
    
    // Reconstrói o HTML dos contratos adicionados
    atualizarHTMLContratosAdicionados();
  }
}

// Função para salvar contratos adicionados no localStorage
function salvarContratosAdicionados() {
  localStorage.setItem('contratosAdicionados', JSON.stringify(meusContratosAdicionados));
}

// Função para atualizar o HTML dos contratos adicionados
function atualizarHTMLContratosAdicionados() {
  meusContratosAdicionadosHTML = '';
  meusContratosAdicionados.forEach((contrato) => {
    meusContratosAdicionadosHTML += `
<div class="card-contratos">
                        <div id="div-foto-info ">
                            <div class="border-perfil">
                              <div class="foto-perfil">
                                              <img src=" /assets/img/foto-de-perfil.jpeg" />
                              </div>
                            </div>
                        </div>
                        <div>
                            <p class="dados-perfil"><u>Nome</u>: ${contrato.nomeDoMotorista}</p>
                            <p class="dados-perfil"><u>Vagas Restantes</u>: ${contrato.vaga}</p>
                            <p class="dados-perfil"><u>Modelo do Veículo</u>: ${contrato.van}</p>
                            <p class="dados-perfil"><u>Valor</u>: ${contrato.preco}</p>
                        </div>
                        <button class="btn-resultados js-remover-contrato" data-id="${contrato.id}">Remover</button>
                      </div>
   
    `;
  });
  
  // Atualiza o HTML com os contratos salvos
  const containerAdicionados = document.querySelector('.js-card-container-adicionados');
  if (containerAdicionados) {
    containerAdicionados.innerHTML = meusContratosAdicionadosHTML;
    
    // Adiciona novamente os eventos de remoção
    document.querySelectorAll('.js-remover-contrato').forEach((button) => {
      button.addEventListener('click', removerContrato);
    });
  }
}

// Função para remover contrato
function removerContrato(event) {
  const contratoId = event.target.getAttribute('data-id');
  
  // Remove o contrato do array
  meusContratosAdicionados = meusContratosAdicionados.filter((c) => c.id !== contratoId);
  
  // Atualiza o localStorage
  salvarContratosAdicionados();
  
  // Atualiza o HTML
  atualizarHTMLContratosAdicionados();
  
  console.log(`Contrato removido: ${contratoId}`);
  console.log(`Meus Contratos Atualizados:`, meusContratosAdicionados);
}

// Evento de carregamento da página
document.addEventListener('DOMContentLoaded', () => {
  // let meusContratosHTML = ``; // Variável para armazenar o HTML dos contratos

  // contratos.forEach((contrato) => {
  //   meusContratosHTML += `
  //     <div class="card-contratos">
  //       <p>${contrato.nomeDoMotorista}</p>
  //       <button class="js-add-contrato" data-id="${contrato.id}">Adicionar</button>
  //     </div>
  //   `;
  // });

  // // Insere os cards no HTML
  // document.querySelector('.card-container').innerHTML = meusContratosHTML

  // Carrega contratos adicionados salvos
  carregarContratosAdicionados();

  // Adiciona eventos de clique para os botões de adicionar
  document.querySelectorAll('.js-add-contrato').forEach((button) => {
    button.addEventListener('click', (event) => {
      const contratoId = event.target.getAttribute('data-id');
      const contrato = contratos.find((c) => c.id === contratoId);
      
      if (!meusContratosAdicionados.some((c) => c.id === contratoId)) {
        // Adiciona o contrato à lista
        meusContratosAdicionados.push(contrato);
        
        // Atualiza o HTML e o localStorage
        salvarContratosAdicionados();
        atualizarHTMLContratosAdicionados();

        console.log(`Contrato adicionado:`, contrato);
        console.log(`Meus Contratos Atualizados:`, meusContratosAdicionados);
      } else {
        console.log('Este contrato já foi adicionado.');
      }
    });
  });
});