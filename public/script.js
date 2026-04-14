// Fecha en header
const now = new Date()
document.getElementById('fecha-header').textContent =
  now.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

// Chart.js defaults — dark theme
Chart.defaults.color = '#7d8fa3'
Chart.defaults.borderColor = '#2a3441'
Chart.defaults.font.family = "'DM Sans', sans-serif"
Chart.defaults.font.size = 12

const COLORS = {
  blue:   '#4da3ff',
  green:  '#3dd6ac',
  red:    '#ff6b6b',
  yellow: '#ffd166',
  purple: '#b388ff',
  orange: '#ff9f43',
  teal:   '#26c6da',
}

function showChart(loadId, canvasId) {
  document.getElementById(loadId).style.display = 'none'
  document.getElementById(canvasId).style.display = 'block'
}

async function cargarDatos() {
  try {
    const r = await fetch('/estadisticas')
    const d = await r.json()

    document.getElementById('num-tratamiento').textContent = d.en_tratamiento ?? 0
    document.getElementById('num-alta').textContent        = d.dados_alta ?? 0
    document.getElementById('num-baja').textContent        = d.abandonaron ?? 0

    showChart('load1', 'grafica')
    new Chart(document.getElementById('grafica'), {
      type: 'bar',
      data: {
        labels: ['En tratamiento', 'Dados de alta', 'Abandonaron'],
        datasets: [{
          label: 'Pacientes',
          data: [d.en_tratamiento, d.dados_alta, d.abandonaron],
          backgroundColor: [COLORS.blue, COLORS.green, COLORS.red],
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#2a3441' } },
          x: { grid: { display: false } }
        }
      }
    })
  } catch(e) {
    document.getElementById('load1').textContent = 'Error al cargar datos'
  }
}

async function cargarEdades() {
  try {
    const r = await fetch('/edades')
    const d = await r.json()

    showChart('load2', 'graficaEdades')
    new Chart(document.getElementById('graficaEdades'), {
      type: 'bar',
      data: {
        labels: ['11-12 anos', '13-14 anos', '15-16 anos'],
        datasets: [{
          label: 'Pacientes',
          data: [d.edad_11_12, d.edad_13_14, d.edad_15_16],
          backgroundColor: [COLORS.purple, COLORS.yellow, COLORS.teal],
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#2a3441' } },
          x: { grid: { display: false } }
        }
      }
    })
  } catch(e) {
    document.getElementById('load2').textContent = 'Error al cargar datos'
  }
}

async function cargarEscuelas() {
  try {
    const r = await fetch('/escuelas')
    const d = await r.json()

    showChart('load3', 'graficaEscuelas')
    const palette = [COLORS.orange, COLORS.blue, COLORS.purple, COLORS.green, COLORS.red, COLORS.yellow]
    new Chart(document.getElementById('graficaEscuelas'), {
      type: 'doughnut',
      data: {
        labels: d.map(function(x) { return x.escuela }),
        datasets: [{
          data: d.map(function(x) { return x.total }),
          backgroundColor: palette.slice(0, d.length),
          borderColor: '#161b22',
          borderWidth: 3,
          hoverOffset: 10,
        }]
      },
      options: {
        responsive: true,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 20, boxWidth: 12, boxHeight: 12, borderRadius: 6, useBorderRadius: true }
          },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return ' ' + ctx.label + ': ' + ctx.parsed + ' pacientes'
              }
            }
          }
        }
      }
    })
  } catch(e) {
    document.getElementById('load3').textContent = 'Error al cargar datos'
  }
}

async function cargarProcedencia() {
  try {
    const r = await fetch('/procedencia')
    const d = await r.json()

    showChart('load4', 'graficaProcedencia')
    new Chart(document.getElementById('graficaProcedencia'), {
      type: 'pie',
      data: {
        labels: d.map(function(x) { return x.procedencia }),
        datasets: [{
          data: d.map(function(x) { return x.total }),
          backgroundColor: [COLORS.red, COLORS.orange],
          borderColor: '#161b22',
          borderWidth: 3,
          hoverOffset: 12,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 20, boxWidth: 12, boxHeight: 12, borderRadius: 6, useBorderRadius: true }
          },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return ' ' + ctx.label + ': ' + ctx.parsed + ' pacientes'
              }
            }
          }
        }
      }
    })
  } catch(e) {
    document.getElementById('load4').textContent = 'Error al cargar datos'
  }
}
async function cargarMotivo() {
  try {
    console.log('info');
    const r = await fetch('/motivo')
    const d = await r.json()
    
    showChart('load5', 'graficaMotivo')
    new Chart(document.getElementById('graficaMotivo'), {
      type: 'pie',
      data: {
        labels: d.map(function(x) { return x.motivo }),
        datasets: [{
          data: d.map(function(x) { return x.total }),
          backgroundColor: [COLORS.blue, COLORS.green ],
          borderColor: '#161b22',
          borderWidth: 3,
          hoverOffset: 12,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 20, boxWidth: 12, boxHeight: 12, borderRadius: 6, useBorderRadius: true }
          },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return ' ' + ctx.label + ': ' + ctx.parsed + ' motivo'
              }
            }
          }
        }
      }
    })
  } catch(e) {
    document.getElementById('load5').textContent = 'Error al cargar datos'
  }
}

cargarDatos()
cargarEdades()
cargarEscuelas()
cargarProcedencia()
cargarMotivo()