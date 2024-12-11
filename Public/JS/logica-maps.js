//Função para realizar a pesquisa de acordo com as informações contidas nas seleções do maps
function resultados() {

    let section = document.getElementById("perfis");
    let campoOrigem = document.getElementById("origem").value;
    let campoDestino = document.getElementById("destino").value;
  
    /*normalize("NFD"): Esse método separa os caracteres acentuados em sua forma base mais os sinais diacríticos.
    Por exemplo, o caractere "á" é decomposto em "a" + acento.
    replace(/[\u0300-\u036f]/g, ""): A expressão regular remove todos os diacríticos (sinais de acentuação) da string.*/
  
    campoOrigem = campoOrigem.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    campoDestino = campoDestino.toLowerCase().normalize("NFD").replace(/[\u0300-\u036]/g, "");
  
    // Inicializa uma string vazia para armazenar os resultados
    let resultados = "";
    let origem = "";
    let destino = "";
  
  // Itera sobre cada dado da lista de dados
  for (let dado of dados) {
    origem = dado.raca.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    destino = dado.tipo.join(" ").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
    // Verifica se a o destino e a origem coincidem com os valores restrados nos dados de cadastro de cada motorista
    if (origem.includes(campoOrigem) && destino.includes(campoDestino)) {
        // cria um novo elemento
        resultados += `<div class="card-perfil">
                      <div id="div-foto-info">
                          <div class="border-perfil">
                              <div class="foto-perfil">
                                  <img>
                              </div>
                          </div>
                          <div>
                              <p class="dados-perfil"><u>Nome</u>:${dado.nome}</p>
                              <p class="dados-perfil"><u>Vagas Restantes</u>:${dado.vaga}</p>
                              <p class="dados-perfil"><u>Modelo do Veículo</u>:${dado.modelo}</p>
                              <p class="dados-perfil"><u>Valor</u>:${dado.preco}</p>
                          </div>
                      </div>
                      <button class="btn-resultados">Solicitar</button>
                  </div>
    `;
    }
  }
  
  if (!resultados) {
    resultados += "<p>Desculpe, não achamos nenhum motorista disponível para realizar a sua trajetoria.</p>";
  }
  
  // Atribui os resultados gerados à seção HTML
  section.innerHTML = resultados;
  }