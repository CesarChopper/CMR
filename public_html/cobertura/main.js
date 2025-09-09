/**************** Sidebar hover *****************/
(function initSidebarHover() {
  const list = document.querySelectorAll(".navigation li.nav-item");
  function activeLink() {
    list.forEach((item) => item.classList.remove("hovered"));
    this.classList.add("hovered");
  }
  list.forEach((item) => item.addEventListener("mouseover", activeLink));
})();

/**************** Menu Toggle (robusto) *********/
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".toggle");
  const navigation = document.querySelector(".navigation");
  const main = document.querySelector(".main");
  if (toggle && navigation && main) {
    toggle.addEventListener("click", () => {
      navigation.classList.toggle("active");
      main.classList.toggle("active");
    });
    // Cerrar al tocar fuera del menú
    document.addEventListener("click", (e) => {
      const clickEnMenu = navigation.contains(e.target);
      const clickEnToggle = toggle.contains(e.target);
      if (!clickEnMenu && !clickEnToggle && navigation.classList.contains("active")) {
        navigation.classList.remove("active");
        main.classList.remove("active");
      }
    });
  }
});

/**************** Helpers ************************/
function normalizar(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Detecta email y teléfono aunque falten comas; formatea en 5 líneas:
function formatAgenciaNombre(nombre) {
  let text = String(nombre);

  // Email
  const emailRe = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
  const email = (text.match(emailRe) || [null])[0];

  // Teléfono: toma los últimos 10 dígitos que encuentre (MX)
  const digits = text.replace(/\D/g, "");
  const tel = digits.length >= 10 ? digits.slice(-10) : null;

  // Limpia email/tel del texto base
  if (email) text = text.replace(email, " ");
  if (tel)   text = text.replace(new RegExp(tel.replace(/([.*+?^=!:${}()|[\]\\])/g, "\\$1")), " ");
  // Limpia separadores residuales
  text = text.replace(/[,\s]+/g, " ").trim();

  // Si contiene "agencia" y "vip" (con o sin "prueba") al inicio, reordena
  const inicioAgencia = /^\s*(agencia)(?:\s+prueba)?\s+(vip)\b/i;
  if (inicioAgencia.test(text) || /^agencia\b/i.test(text)) {
    // Quita las palabras "agencia", "prueba", "vip" del nombre
    const nombreLimpio = text.replace(/\b(agencia|prueba|vip)\b/gi, "").trim();
    const lines = ["Agencia", "VIP", nombreLimpio];
    if (email) lines.push(email);
    if (tel)   lines.push(tel);
    return lines.join("\n");
  }

  // Fallback: si no cumple el patrón, sólo añade email/tel en líneas nuevas
  const lines = [text];
  if (email) lines.push(email);
  if (tel)   lines.push(tel);
  return lines.join("\n");
}

function popupContent(nombre) {
  return `<div class="popup-multiline">${formatAgenciaNombre(nombre)}</div>`;
}

/**************** Datos **************************/
// CDMX
const cdmxItems = [
  // OJO: Este ejemplo funciona aunque no haya coma antes del email:
  { nombre: "Agencia Prueba VIP Jorge Omar Aguilar Aviles j.aviles.ipn@gmail.com, 5554044134", coordenadas: [19.4326, -99.1332] },
  { nombre: "Álvaro Obregón", coordenadas: [19.3579, -99.2031] },
  { nombre: "Azcapotzalco", coordenadas: [19.4887, -99.185] },
  { nombre: "Benito Juárez", coordenadas: [19.3879, -99.162] },
  { nombre: "Coyoacán", coordenadas: [19.3466, -99.1619] },
  { nombre: "Cuajimalpa de Morelos", coordenadas: [19.3611, -99.2909] },
  { nombre: "Cuauhtémoc", coordenadas: [19.437, -99.1543] },
  { nombre: "Gustavo A. Madero", coordenadas: [19.5042, -99.1111] },
  { nombre: "Iztacalco", coordenadas: [19.3956, -99.0977] },
  { nombre: "Iztapalapa", coordenadas: [19.3574, -99.0671] },
  { nombre: "La Magdalena Contreras", coordenadas: [19.2929, -99.2303] },
  { nombre: "Miguel Hidalgo", coordenadas: [19.4334, -99.2007] },
  { nombre: "Milpa Alta", coordenadas: [19.191, -99.007] },
  { nombre: "Tláhuac", coordenadas: [19.2861, -99.0017] },
  { nombre: "Tlalpan", coordenadas: [19.2826, -99.1693] },
  { nombre: "Venustiano Carranza", coordenadas: [19.4298, -99.0967] },
  { nombre: "Xochimilco", coordenadas: [19.2575, -99.1013] },
];

// EDOMEX (muestra representativa; puedes ampliar)
const edomexItems = [
  { nombre: "Ecatepec de Morelos", coordenadas: [19.5991, -99.0492] },
  { nombre: "Nezahualcóyotl", coordenadas: [19.4006, -99.0148] },
  { nombre: "Naucalpan de Juárez", coordenadas: [19.4786, -99.2337] },
  { nombre: "Tlalnepantla de Baz", coordenadas: [19.5367, -99.1947] },
  { nombre: "Toluca", coordenadas: [19.2922, -99.6539] },
  { nombre: "Chimalhuacán", coordenadas: [19.4184, -98.9417] },
  { nombre: "Atizapán de Zaragoza", coordenadas: [19.5592, -99.2833] },
  { nombre: "Cuautitlán Izcalli", coordenadas: [19.6439, -99.216] },
  { nombre: "Tultitlán", coordenadas: [19.6333, -99.1333] },
  { nombre: "Nicolás Romero", coordenadas: [19.6366, -99.3068] },
  { nombre: "Ixtapaluca", coordenadas: [19.3156, -98.8828] },
  { nombre: "Tecámac", coordenadas: [19.7131, -98.9683] },
  { nombre: "Coacalco de Berriozábal", coordenadas: [19.6292, -99.1069] },
  { nombre: "Valle de Chalco Solidaridad", coordenadas: [19.3094, -98.9604] },
  { nombre: "Texcoco", coordenadas: [19.5119, -98.8829] },
  { nombre: "Metepec", coordenadas: [19.252, -99.6048] },
  { nombre: "Huixquilucan", coordenadas: [19.3599, -99.3502] },
  { nombre: "Chalco", coordenadas: [19.2617, -98.8978] },
  { nombre: "La Paz (Los Reyes Acaquilpan)", coordenadas: [19.3636, -98.9771] },
  { nombre: "Zinacantepec", coordenadas: [19.2836, -99.7351] },
  { nombre: "Zumpango", coordenadas: [19.7969, -99.0992] },
  { nombre: "Tultepec", coordenadas: [19.685, -99.1281] },
  { nombre: "Teoloyucan", coordenadas: [19.7588, -99.1758] },
  { nombre: "Melchor Ocampo", coordenadas: [19.7101, -99.1401] },
  { nombre: "Chicoloapan", coordenadas: [19.4167, -98.9] },
  { nombre: "Lerma", coordenadas: [19.2888, -99.5116] },
  { nombre: "Ocoyoacac", coordenadas: [19.2739, -99.4606] },
  { nombre: "San Mateo Atenco", coordenadas: [19.2771, -99.5395] },
  { nombre: "Atlacomulco", coordenadas: [19.8141, -99.8612] },
  { nombre: "Ixtlahuaca", coordenadas: [19.5689, -99.7669] },
  { nombre: "Valle de Bravo", coordenadas: [19.1925, -100.1306] },
];

// NY (ejemplo)
const nyItems = [
  { nombre: "New York (SIN FECHA)", coordenadas: [40.71, -74.0] },
];

/************ Datasets (meta + items) ***********/
const datasets = {
  cdmx: {
    key: "cdmx", label: "CDMX",
    type: "alcaldías",
    totalUnidades: 16,       // Alcaldías oficiales
    center: [19.4326, -99.1332], zoom: 10,
    items: cdmxItems
  },
  edomex: {
    key: "edomex", label: "Estado de México",
    type: "municipios",
    totalUnidades: 125,      // Municipios oficiales
    center: [19.3542, -99.6308], zoom: 8,
    items: edomexItems
  },
  ny: {
    key: "ny", label: "NY (ejemplo)",
    type: "barrios",
    totalUnidades: null,     // No aplica aquí
    center: [40.71, -74.0], zoom: 10,
    items: nyItems
  }
};

/***************** Mapa *************************/
let map, markersLayer = null;
let currentDatasetKey = "cdmx";
let currentMarkers = []; // [{item, marker}]

function initMap() {
  map = L.map("mapid").setView(datasets[currentDatasetKey].center, datasets[currentDatasetKey].zoom);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
  }).addTo(map);

  renderDataset(currentDatasetKey);
}

function clearMarkers() {
  if (markersLayer) {
    markersLayer.remove();
    markersLayer = null;
  }
  currentMarkers = [];
}

function renderDataset(key) {
  const ds = datasets[key];
  currentDatasetKey = key;

  clearMarkers();
  markersLayer = L.layerGroup().addTo(map);
  ds.items.forEach((item) => {
    const m = L.marker(item.coordenadas).addTo(markersLayer)
      .bindPopup(popupContent(item.nombre));
    currentMarkers.push({ item, marker: m });
  });

  map.setView(ds.center, ds.zoom);
  updateStats();
}

/*************** Búsqueda ************************/
function buscarConEnter(event) {
  if (event.key !== "Enter") return;
  const txt = event.target.value.trim();
  if (!txt) return;
  const q = normalizar(txt);

  const found = currentMarkers.find(({ item }) => normalizar(item.nombre).includes(q));
  if (found) {
    map.setView(found.item.coordenadas, Math.max(map.getZoom(), 12));
    found.marker.openPopup();
  } else {
    alert("No se encontró coincidencia");
  }
}

/*************** Stats (contador) ****************/
function updateStats() {
  const ds = datasets[currentDatasetKey];
  const oficiales = ds.totalUnidades != null ? ds.totalUnidades : "—";
  const mostrados = ds.items.length;
  const etiqueta = (ds.type === "alcaldías" || ds.type === "municipios") ? "Alcaldías/Municipios oficiales" : "Unidades oficiales";
  const stats = document.getElementById("stats");
  if (stats) {
    stats.textContent = `Entidad: ${ds.label} — ${etiqueta}: ${oficiales} — Marcadores mostrados: ${mostrados}`;
  }
}

/**************** Exportar ************************/
function toPlainJSON(ds) {
  return ds.items.map((i) => ({ nombre: i.nombre, coordenadas: i.coordenadas }));
}

function toGeoJSON(ds) {
  // GeoJSON usa [lon, lat]
  return {
    type: "FeatureCollection",
    features: ds.items.map((i) => ({
      type: "Feature",
      properties: { nombre: i.nombre },
      geometry: { type: "Point", coordinates: [i.coordenadas[1], i.coordenadas[0]] }
    }))
  };
}

function download(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

function slugify(s) {
  return normalizar(s).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function exportJSON() {
  const ds = datasets[currentDatasetKey];
  const json = JSON.stringify(toPlainJSON(ds), null, 2);
  download(`${slugify(ds.label)}.json`, json, "application/json");
}

function exportGeoJSON() {
  const ds = datasets[currentDatasetKey];
  const geo = JSON.stringify(toGeoJSON(ds), null, 2);
  download(`${slugify(ds.label)}.geojson`, geo, "application/geo+json");
}

/**************** Cobertura por estado (opcional GeoJSON externo) ********/
let estadosLayers = {};
function actualizarEstado(estado, tieneCobertura) {
  const layer = estadosLayers[estado];
  if (!layer) return;
  if (tieneCobertura === "verde") layer.setStyle({ fillColor: "green", fillOpacity: 0.5 });
  else if (tieneCobertura === "rojo") layer.setStyle({ fillColor: "red", fillOpacity: 0.5 });
  else if (tieneCobertura === "amarillo") layer.setStyle({ fillColor: "yellow", fillOpacity: 0.5 });
}
function initGeoJSONIfAny() {
  if (typeof estadosGeojson === "undefined") return;
  L.geoJSON(estadosGeojson, {
    onEachFeature: function (feature, layer) {
      estadosLayers[feature.properties.name] = layer;
    },
  }).addTo(map);
}

/**************** Logout **************************/
function initLogout() {
  const logoutButton = document.getElementById("logout-btn");
  if (logoutButton) {
    // logoutButton.addEventListener("click", (e) => { e.preventDefault(); window.location.href = "/logout.php"; });
  }
}

/**************** Eventos UI **********************/
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  initGeoJSONIfAny();
  initLogout();

  // Buscar con Enter
  const input = document.getElementById("searchInput");
  if (input) input.addEventListener("keydown", buscarConEnter);

  // Selector de dataset
  const select = document.getElementById("datasetSelect");
  if (select) {
    select.value = currentDatasetKey;
    select.addEventListener("change", (e) => {
      const key = e.target.value;
      if (datasets[key]) renderDataset(key);
    });
  }

  // Botones export
  const btnJson = document.getElementById("btnJson");
  const btnGeo = document.getElementById("btnGeoJson");
  if (btnJson) btnJson.addEventListener("click", exportJSON);
  if (btnGeo) btnGeo.addEventListener("click", exportGeoJSON);
});
