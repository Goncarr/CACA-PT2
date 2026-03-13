const ctx = document.getElementById("myChart");
let myChart;
let jsonData;
let currentChartType = "bar";

/**
 * Define o tamanho de texto para tablet, mobile e desktop
 * @returns Tamanho do texto
 */
function getChartFontSize() {
  if (window.innerWidth <= 600) return 9;
  if (window.innerWidth <= 1350) return 12;
  return 15.5;
}

Chart.defaults.font.size = getChartFontSize();
window.addEventListener('resize', () => {
  Chart.defaults.font.size = getChartFontSize();
  if (jsonData) Createchart(jsonData, currentChartType);
});

/**
 * Procura se um ficheiro json existe
 * @param {Ficheiro json} jsonUrl 
 */
function loadData(jsonUrl) {
  fetch(jsonUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Falha ao carregar os dados de: ${jsonUrl}`);
    })
    .then(function (data) {
      jsonData = data;
      Createchart(jsonData, currentChartType);
    })
    .catch(function (error) {
      console.error(error);
    });
}

/**
 * define o tipo de chart que vai ser utilizado
 * @param {tipo de chart} chartType 
 */
function setChartType(chartType) {
  currentChartType = chartType;
  if (jsonData) {
    Createchart(jsonData, currentChartType);
  }
}

/**
 * cria um chart
 * @param {informacao do ficheiro json} data 
 * @param {Tipo de chart} type 
 * @returns 
 */
function Createchart(data, type) {
  if (!ctx) {
    console.warn("Canvas element not found: #myChart");
    return;
  }

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: type,
    data: {
      labels: data.map((row) => row.month),
      datasets: [
        {
          label: "Nº de Investigacoes",
          data: data.map((row) => row.income),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        }       
      },
    },
  });
}

loadData('utils/datainvestigacao.json');