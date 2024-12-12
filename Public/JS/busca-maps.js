const botaoProcurarVan = document.getElementById("ProcurarVan");
botaoProcurarVan.addEventListener("click", function() {
    window.location.href = "/resultados"
});

// Função para salvar múltiplas informações no Local Storage
function salvarInformacoes() {
  const frequencia = document.getElementById("frequencia").value;
  const data = document.getElementById("dia").value;
  const ida = document.getElementById("ida-select").value;
  const volta = document.getElementById("volta-select").value;

  // Salva as informações no Local Storage
  localStorage.setItem('frequencia', frequencia);
  localStorage.setItem('data', data);
  localStorage.setItem('ida', ida);
  localStorage.setItem('volta', volta);
  
  window.location.href = 'resultados-maps.html'; // Redireciona para a página 2
}

// Função para exibir as informações na Página 2
function exibirInformacoes() {
  //Recupera no LocalStorage
  const frequencia = localStorage.getItem('frequencia');
  const data = localStorage.getItem('data'); 
  const ida = localStorage.getItem('ida')
  const volta = localStorage.getItem('volta')

  const horario = document.getElementById('horario-resultado');
  horario.textContent += ` ${ida} - ${volta}`; // Exibe a data na página 2

  const dia = document.getElementById('data-resultado');
  dia.textContent += ` ${data || 'Não informado'}`; // Exibe os dados ou mensagem padrão

  const frequenciaResultado = document.getElementById('frequencia-resultado');
  frequenciaResultado.textContent += ` ${frequencia || 'Não informado'}`;
}

// Adicionando eventos aos elementos quando o DOM for carregado
document.addEventListener('DOMContentLoaded', () => {
  const pagina = window.location.pathname;

  // Se estiver na página 1, adiciona o evento ao botão
  if (pagina.includes('maps.html')) {
      const enviarBtn = document.getElementById('ProcurarVan');
      enviarBtn.addEventListener('click', salvarInformacoes); // Chama a função salvarInformacoes
  }

  // Se estiver na página 2, exibe as informações armazenadas
  if (pagina.includes('resultados-maps.html')) {
      exibirInformacoes(); // Exibe as informações na Página 2
  }
});


//Função para realizar a pesquisa de acordo com as informações contidas nas seleções do maps
function resultados() {
    
  //aqui pega os elementos do formulário
  let section = document.getElementById("perfis-busca-maps");
  let campoOrigem = document.getElementById("origem").value;
  let campoDestino = document.getElementById("destino").value;
  let campoIda = document.getElementById("ida-select").value;
  let campoVolta = document.getElementById("volta-select").value;

  /*normalize("NFD"): Esse método separa os caracteres acentuados em sua forma base mais os sinais diacríticos.
  Por exemplo, o caractere "á" é decomposto em "a" + acento.
  replace(/[\u0300-\u036f]/g, ""): A expressão regular remove todos os diacríticos (sinais de acentuação) da string.*/

  campoOrigem = campoOrigem.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  campoDestino = campoDestino.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Inicializa uma string vazia para armazenar os resultados
  let resultados = "";
  let origem = "";
  let destino = "";
  let ida = "";
  let volta = "";
  //essas strings são criadas para realizar a comparação com os campos

// Itera sobre cada dado da lista de dados
for (let contrato of contratos) {
  origem = contrato.origem.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  destino = contrato.destino.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  ida = contrato.horarioIda;
  volta = contrato.horarioVolta

  // Verifica se a o destino, a origem e a ida ou volta coincidem com os valores restrados nos dados de cadastro de cada motorista
  if (campoOrigem && campoDestino && (origem.includes(campoOrigem) && destino.includes(campoDestino) && (ida.includes(campoIda) || volta.includes(campoVolta))) ) {
      // cria um novo elemento
      resultados += `<div class="card-perfil">
                    <div id="div-foto-info">
                        <div class="border-perfil">
                            <div class="foto-perfil">
                                <img>
                            </div>
                        </div>
                        <div>
                            <p class="dados-perfil"><u>Nome</u>:${contrato.nomeDoMotorista}</p>
                            <p class="dados-perfil"><u>Vagas Restantes</u>:${contrato.vaga}</p>
                            <p class="dados-perfil"><u>Modelo do Veículo</u>:${contrato.van}</p>
                            <p class="dados-perfil"><u>Valor</u>:${contrato.preco}</p>
                        </div>
                    </div>
                    <button class="btn-resultados">Solicitar</button>
  `;
  }
}

if (!resultados) {
  resultados += "<p>Desculpe, não achamos nenhum motorista disponível para realizar a sua trajetoria.</p>";
}

// Atribui os resultados gerados à seção HTML
section.innerHTML = resultados;
}