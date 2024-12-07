let map;
// initMap is now async
async function initMap() {
    // Request libraries when needed, not in the script tag.
    const { Map } = await google.maps.importLibrary("maps");
    // Short namespaces can be used.
    map = new Map(document.getElementById("map"), {
        center: { lat: -23.533773, lng: -46.625290 },
        zoom: 10,
    });
}

initMap();


/*let map;
// initMap is now async
async function initMap() {
    // Request libraries when needed, not in the script tag.
    const { Map } = await google.maps.importLibrary("maps");
    // Short namespaces can be used.
    map = new Map(document.getElementById("map"), {
        mapTypeControl: false,
        center: { lat: -23.533773, lng: -46.625290 },
        zoom: 10,
    });
    new AutocompleteDirectionsHandler(map);
}

class AutocompleteDirectionsHandler {
  map;
  originPlaceId;
  destinationPlaceId;
  travelMode;
  directionsService;
  directionsRenderer;
  constructor(map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.WALKING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);

    const originInput = document.getElementById("origin");
    const destinationInput = document.getElementById("destination");
    // Specify just the place data fields that you need.
    const originAutocomplete = new google.maps.places.Autocomplete(
      originInput,
      { fields: ["place_id"] },
    );
    // Specify just the place data fields that you need.
    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput,
      { fields: ["place_id"] },
    );

    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput,
    );
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
  }
  // Autocomplete.

  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo("bounds", this.map);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }

      this.route();
    });
  }
  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }

    const me = this;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      },
    );
  }
}

initMap();*/


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