const cereales = {
  MAIZ: { color: '#F59E0B' }, SOJA: { color: '#FDE047' }, SORGO: { color: '#3B82F6' }, TRIGO: { color: '#10B981' }, MEZCLA: { color: '#EC4899' }
};

const tableroPrueba = [
  { id: '701', cereal: 'MAIZ', toneladas: 902, calidad: 'L56', estado: 'CON_CARGA' },
  { id: '702', cereal: 'MAIZ', toneladas: 500, calidad: 'PROTEINA ALTA', estado: 'CON_CARGA' },
  { id: '703', cereal: 'SOJA', toneladas: 1000, calidad: '610', estado: 'CON_CARGA' },
  { id: '704', cereal: 'SORGO', toneladas: 0, calidad: '', estado: 'VACIO' },
  { id: '601', cereal: 'TRIGO', toneladas: 350, calidad: 'G2', estado: 'CON_CARGA' }
];

function renderStock() {
  let html = ''; const totales = {};
  tableroPrueba.forEach(u => {
    if (u.estado === 'CON_CARGA') { totales[u.cereal] = (totales[u.cereal] || 0) + u.toneladas; }
  });
  for (const cereal in totales) { 
    html += `<div class="stock-item"><span>🌾 ${cereal}</span> <strong>${totales[cereal]} t</strong></div>`; 
  }
  document.getElementById('stock-data').innerHTML = html;
}

function renderTablero() {
  let html = '';
  tableroPrueba.forEach(u => {
    const color = u.estado === 'VACIO' ? '' : cereales[u.cereal].color;
    const claseVacio = u.estado === 'VACIO' ? 'vacio' : '';
    html += `
      <div class="card ${claseVacio}" style="background-color: ${color};" onclick="alert('Acá se abrirá el panel lateral para editar el Silo ${u.id}')">
        <span class="id">${u.id}</span>
        <span class="ton">${u.toneladas > 0 ? u.toneladas + ' t' : 'VACÍO'}</span>
        <span class="cal">${u.calidad}</span>
      </div>`;
  });
  document.getElementById('tablero-data').innerHTML = html;
}

function abrirSeccion(seccion) {
  document.getElementById('mobile-menu').style.display = 'none';
  document.getElementById('app-content').style.display = 'block';
  
  if (seccion === 'TABLERO') {
    document.getElementById('titulo').innerText = 'Tablero de Unidades';
    document.getElementById('panel-stock').style.display = 'none';
    document.getElementById('panel-tablero').style.display = 'block';
  } else {
    document.getElementById('titulo').innerText = 'Existencias en Planta (Stock)';
    document.getElementById('panel-stock').style.display = 'block';
    document.getElementById('panel-tablero').style.display = 'none';
  }
}

renderStock(); 
renderTablero();
