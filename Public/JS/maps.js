document.addEventListener("DOMContentLoaded", function () {
    let map;
    let directionsService;
    let directionsRenderer;
  
    // Inicializa o mapa
    function initMap() {
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -23.55052, lng: -46.633308 }, // Posição inicial (São Paulo, por exemplo)
        zoom: 14,
      });
  
      directionsService = new google.maps.DirectionsService();
      directionsRenderer = new google.maps.DirectionsRenderer();
  
      // Liga o renderizador ao mapa
      directionsRenderer.setMap(map);
    }
    
    // Calcula e exibe a rota
    function calculateRoute() {
      const origin = document.getElementById("origin").value;
      const destination = document.getElementById("destination").value;
        
      // Verifica se os campos não estão vazios
    if (origin && destination) {
        fetch(`/calculate-route?origin=${origin}&destination=${destination}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Aqui você pode tratar a resposta para exibir no mapa
            })
            .catch(error => console.error('Erro ao calcular rota:', error));
        }

      const request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING, // Modo de transporte: DRIVING, WALKING, BICYCLING ou TRANSIT
      };
  
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result); // Exibe a rota no mapa
        } else {
          alert("Não foi possível calcular a rota: " + status);
        }
      });
    }
  
    // Configura o evento de clique no botão
    document.getElementById("calculate-route").addEventListener("click", calculateRoute);
  
    // Inicializa o mapa ao carregar a página
    initMap();
  });


// MAPS -->GERAR HORÁRIOS
// Função para gerar horários dinâmicos
function generateTimeOptions(selectId, includeOptional = false) {
    const select = document.getElementById(selectId);
  
    // Adicionar a opção inicial "Opcional" para horários de volta, se necessário
    if (includeOptional) {
      const optionalOption = document.createElement('option');
      optionalOption.value = "";
      optionalOption.textContent = "Sem volta";
      select.appendChild(optionalOption);
    }
  
    // Gerar horários de meia em meia hora
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        select.appendChild(option);
      }
    }
  }
  
  // Gerar horários para os dois menus
  generateTimeOptions('ida-select'); // Horários de ida (obrigatório)
  generateTimeOptions('volta-select', true); // Horários de volta (opcional)


  // Calendario e manipulação de data
  document.addEventListener("DOMContentLoaded", function () {
    const diaSelect = document.getElementById("dia");
    const frequenciaSelect = document.getElementById("frequencia");
    const calendarioDiv = document.getElementById("calendario");
  
    // Configurações do Flatpickr para exibição inline
    const calendar = flatpickr(calendarioDiv, {
      inline: true, // Exibe o calendário diretamente
      mode: "multiple", // Permite selecionar múltiplas datas
      dateFormat: "d/m/Y",
      disable: [], // Inicialmente nenhuma data é desabilitada
      onChange: function (selectedDates) {
        console.log("Datas selecionadas:", selectedDates);
      },
    });
  
    // Atualizar o calendário dinamicamente
    function atualizarCalendario() {
      const hoje = new Date();
      const diaSemana = diaSelect.value; // "segunda", "terça", etc.
      const frequencia = frequenciaSelect.value; // "uma-vez", "toda-semana", etc.
        
      // Converter o dia da semana para número (0 = domingo, 1 = segunda, ...)
      const diasDaSemana = {
        segunda: 1,
        terca: 2,
        quarta: 3,
        quinta: 4,
        sexta: 5,
        sabado: 6,
        domingo: 0,
      };
      const diaEscolhido = diasDaSemana[diaSemana];
  
      // Gerar as datas baseadas na frequência
      let datasSelecionadas = [];
      let dataAtual = new Date(hoje);
  
      if (frequencia === "uma-vez") {
        // Seleciona apenas a próxima ocorrência do dia da semana escolhido
        while (dataAtual.getDay() !== diaEscolhido) {
          dataAtual.setDate(dataAtual.getDate() + 1);
        }
        datasSelecionadas.push(new Date(dataAtual));
      } else if (frequencia === "toda-semana") {
        // Seleciona as próximas 4 semanas com o mesmo dia da semana
        for (let i = 0; i < 4; i++) {
          while (dataAtual.getDay() !== diaEscolhido) {
            dataAtual.setDate(dataAtual.getDate() + 1);
          }
          datasSelecionadas.push(new Date(dataAtual));
          dataAtual.setDate(dataAtual.getDate() + 7); // Pula para a próxima semana
        }
      }
  
      // Atualiza o calendário para mostrar as datas selecionadas
      calendar.setDate(datasSelecionadas);
    }
  
    // Adiciona eventos para atualizar o calendário sempre que as seleções mudarem
    diaSelect.addEventListener("change", atualizarCalendario);
    frequenciaSelect.addEventListener("change", atualizarCalendario);
  });