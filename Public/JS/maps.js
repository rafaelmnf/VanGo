//Google Maps
let map, directionsService, directionsRenderer;

function initMap() {
  // Inicializa o mapa
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -23.533773, lng: -46.625290 }, //localização de sp
    zoom: 11,
    mapTypeControl: false, //tipo de mapa marcado somente para roadmap. Outras opções: satellite, hybrid, terrain
    mapTypeId: "roadmap",
    //estilo mais clean, parecido com o da uber
    styles: [
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#7c93a3"
              },
              {
                  "lightness": "-10"
              }
          ]
      },
      {
          "featureType": "administrative.country",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#a0a4a5"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#62838e"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#dde3e3"
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#3f4a51"
              },
              {
                  "weight": "0.30"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "poi.attraction",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi.business",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.government",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi.place_of_worship",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.school",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.sports_complex",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": "-100"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#bbcacf"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "lightness": "0"
              },
              {
                  "color": "#bbcacf"
              },
              {
                  "weight": "0.50"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#a9b4b8"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "invert_lightness": true
              },
              {
                  "saturation": "-7"
              },
              {
                  "lightness": "3"
              },
              {
                  "gamma": "1.80"
              },
              {
                  "weight": "0.01"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#a3c7df"
              }
          ]
      }
  ]
  });

  // Instancia o serviço de rotas e o renderizador
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  // Conecta o renderizador ao mapa
  directionsRenderer.setMap(map);

  // Configura Autocomplete para os inputs
  const originInput = document.getElementById("origin");
  const destinationInput = document.getElementById("destination");

  const autocompleteOrigin = new google.maps.places.Autocomplete(originInput);
  const autocompleteDestination = new google.maps.places.Autocomplete(destinationInput);

  // Adiciona evento ao botão
  document.getElementById("route-btn").addEventListener("click", calculateRoute);
}

function calculateRoute() {
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;

  if (!origin || !destination) {
    alert("Por favor, preencha os campos de origem e destino.");
    return;
  }

  // Configura a solicitação de rota
  const request = {
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING, // Modos: DRIVING, WALKING, BICYCLING, TRANSIT
  };

  // Calcula e exibe a rota
  directionsService.route(request, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);
    } else {
      alert("Não foi possível calcular a rota: " + status);
    }
  });
}

// Carrega o mapa quando o script for carregado
window.onload = initMap;

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

//   ----------------------------------------------------------login

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


