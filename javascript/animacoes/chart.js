const ctx = document.getElementById("myChart");
let myChart;
let jsonData;
let currentChartType = "bar";
Chart.defaults.font.size=15.5;

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

function setChartType(chartType) {
  currentChartType = chartType;
  if (jsonData) {
    Createchart(jsonData, currentChartType);
  }
}

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
          label: "n de investigacoes/ por vez (em cada ano)",
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