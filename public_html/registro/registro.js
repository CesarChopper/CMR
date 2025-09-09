/* ================== SUPABASE CONFIG ================== */
const SUPABASE_URL = "https://tckougrtrlzkbhckwwnh.supabase.co";   // <- pega tu URL (puede estar recortada si quieres)
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRja291Z3J0cmx6a2JoY2t3d25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NTI4NjIsImV4cCI6MjA3MzAyODg2Mn0.V2_86qCn3-dItNLW3tZAnbW9qWb-0SBwQpYEf70eRP4";                      // <- pega tu anon key (puede estar recortada)
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ================== UI: Tabs ================== */
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels  = document.querySelectorAll('.tab-panel');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => { p.classList.remove('active'); p.hidden = true; });
    btn.classList.add('active');
    const id = btn.dataset.tab;
    const panel = document.getElementById(id);
    panel.classList.add('active');
    panel.hidden = false;
  });
});

/* ================== ALTA (INSERT) ================== */
const formAlta = document.getElementById('form-alta');
const altaResp = document.getElementById('alta-respuesta');
const asesorFijo = 'Esmeralda';

formAlta.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validación básica
  const requiredIds = ['nombre','direccion','correo','telefono','precio','nivel','pago'];
  let ok = true;
  requiredIds.forEach(id => {
    const el = document.getElementById(id);
    const err = el.parentElement.querySelector('.err');
    if (!el.checkValidity()) { ok = false; err.textContent = 'Campo obligatorio o formato inválido'; }
    else { err.textContent = ''; }
  });
  if (!ok) return;

  const payload = {
    nombre:   document.getElementById('nombre').value.trim(),
    direccion:document.getElementById('direccion').value.trim(),
    correo:   document.getElementById('correo').value.trim().toLowerCase(),
    telefono: document.getElementById('telefono').value.trim(),
    precio:   Number(document.getElementById('precio').value),
    nivel:    document.getElementById('nivel').value,
    pago:     document.getElementById('pago').value,
    regalos:  document.getElementById('regalos').value.trim() || null,
    notas:    document.getElementById('notas').value.trim() || null,
    asesor:   asesorFijo
    // expediente lo asigna la secuencia en la BD (empieza en 2000)
  };

  altaResp.classList.add('hidden');

  try {
    const { data, error } = await sb
      .from('expedientes')
      .insert(payload)
      .select('*')
      .single();

    if (error) throw error;

    altaResp.classList.remove('hidden', 'error');
    altaResp.classList.add('success');
    altaResp.innerHTML = `
      <strong>Registro exitoso ✅</strong><br>
      Tu expediente: <b>${data.expediente}</b><br>
      Asesor: <b>${data.asesor}</b>
    `;

    formAlta.reset();
    document.getElementById('nombre').focus();
  } catch (err) {
    altaResp.classList.remove('hidden', 'success');
    altaResp.classList.add('error');
    altaResp.innerHTML = `Ocurrió un error al registrar.<br><small>${err.message}</small>`;
  }
});

/* ================== CONSULTA (SELECT) ================== */
const formConsulta = document.getElementById('form-consulta');
const resultado    = document.getElementById('consulta-resultado');

formConsulta.addEventListener('submit', async (e) => {
  e.preventDefault();
  const exp  = document.getElementById('expediente').value.trim();
  const mail = document.getElementById('correoQ').value.trim().toLowerCase();
  const tel  = document.getElementById('telefonoQ').value.trim();

  const filled = [exp, mail, tel].filter(Boolean).length;
  if (filled !== 1) {
    resultado.classList.remove('hidden'); resultado.classList.add('warn');
    resultado.innerHTML = 'Indica <b>solo un</b> criterio de búsqueda.';
    return;
  }

  try {
    let query = sb.from('expedientes').select('*').limit(1);
    if (exp)  query = query.eq('expediente', Number(exp));
    if (mail) query = query.eq('correo', mail); // guardamos correo en minúsculas
    if (tel)  query = query.eq('telefono', tel);

    const { data, error } = await query;
    if (error) throw error;

    const hit = (data && data[0]) || null;
    if (!hit) {
      resultado.classList.remove('hidden'); resultado.classList.add('error');
      resultado.innerHTML = 'No se encontró ningún expediente con ese dato.';
      return;
    }

    resultado.classList.remove('hidden', 'error', 'warn');
    resultado.classList.add('success');
    resultado.innerHTML = `
      <div class="resume">
        <h3>Expediente <b>#${hit.expediente}</b></h3>
        <ul>
          <li><span>Nombre:</span> ${hit.nombre}</li>
          <li><span>Dirección:</span> ${hit.direccion}</li>
          <li><span>Correo:</span> ${hit.correo}</li>
          <li><span>Teléfono:</span> ${hit.telefono}</li>
          <li><span>Precio de venta:</span> $${Number(hit.precio).toFixed(2)}</li>
          <li><span>Nivel de franquicia:</span> ${hit.nivel}</li>
          <li><span>Pago:</span> ${hit.pago}</li>
          <li><span>Regalos:</span> ${hit.regalos || '—'}</li>
          <li><span>Notas:</span> ${hit.notas || '—'}</li>
          <li><span>Asesor:</span> ${hit.asesor}</li>
        </ul>
      </div>
    `;
  } catch (err) {
    resultado.classList.remove('hidden'); resultado.classList.add('error');
    resultado.innerHTML = `Error en la consulta.<br><small>${err.message}</small>`;
  }
});
